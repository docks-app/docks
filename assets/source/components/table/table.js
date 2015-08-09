import Builder from "~utilities/builder";
import Keycodes from "~utilities/keycodes";

const classes = {
  root: "table",
  header: "table__header",
  body: "table__body",
  row: "table__row",
  cell: "table__cell",
  scroller: "table__scroller",
  container: "table__container",
  actions: "table__actions"
};

const states = {
  scroller: { scrolled: "table__scroller--is-scrolled" },
  container: { overflowing: "table__container--is-overflowing" }
};

const attrs = {
  action: "table-action"
};

const actions = {
  shift_right: "shift-right",
  shift_left: "shift-left"
};

var Table, cache_preferred_widths, check_for_overflow, shift_table_right,
    shift_table_left, last_visible_cell, handle_keypress, handle_scroll,
    initialize_table_actions, update_actions;

//*
// Calculates and applies the intrinsic widths of the columns of a `table`,
// keeping in mind the effective maximum column size implied by the `min-width`
// set on the table.
//
// The intrinsic widths of each column are applied only once, to the header
// cells of the column. These are applied by using them as the `min-width`s for
// each header cell, so that the table will appropriately overflow once the
// space available to the table is less than the sum of its intrinsic widths.
//
// A side effect of this function is that `self` is augmented with the minimum
// total intrinsic width of its columns (`min_width`).
//
// @param {Object} self - The internal details of a `Table`.
// @private

cache_preferred_widths = (self) => {
  var table = self.root,
      clone = table.parentNode.parentNode.cloneNode(true),
      width_calculation_container, clone_table, cloned_header_cells;

  // For the purposes of the width calculations, let the table be at the smaller
  // of its intrinsic size and the `min-width` set in CSS.
  clone.style.maxWidth = window.getComputedStyle(table).minWidth;
  table.style.minWidth = "0px";
  clone.style.display = "inline-block";

  // Creates a container that won't restrict the size of the table.
  width_calculation_container = $("<div style='width: 10000px; visibility: hidden; height: 0;' />")[0];
  width_calculation_container.appendChild(clone);
  document.body.appendChild(width_calculation_container);

  clone_table = clone.querySelector(`.${classes.root}`);
  self.min_width = clone_table.offsetWidth; // sum of constrained intrinsic widths

  // Apply the constrained intrinsic widths to each of the header cells in the
  // actual table.
  cloned_header_cells = Array.from(clone.querySelectorAll(`.${classes.header} .${classes.cell}`));
  self.header_cells.forEach((cell, index) => {
    cell.style.minWidth = `${cloned_header_cells[index].offsetWidth}px`;
  });

  // Cleanup.
  document.body.removeChild(width_calculation_container);
};

//*
// Determines whether or not there is overflow and performs all necessary size
// and other DOM updates. This includes fixing the size of the first cell in a
// row and adding a compensating amount of left padding to the second cell in
// each row when the table should overflow, and reversing this when it no longer
// needs to do so.
//
// @param {Object} self - The internal details of a `Table`.
// @private

check_for_overflow = (self) => {
  var { scroller, root, container, overflowing, min_width } = self,
      scroller_width = scroller.offsetWidth,
      first_cell_width, cell, available_space, index;

  if(!scroller_width) { return; }

  // Newly overflowing, get the header's width and apply that same width
  // to each first cell (since they'll be absolutely positioned), and add an
  // equivalent amount of left padding to the second cell.
  if(!overflowing && scroller_width < min_width) {
    for(cell of Array.from(root.querySelectorAll(`.${classes.cell}:first-child`))) {
      first_cell_width = first_cell_width || cell.offsetWidth;

      cell.style.width = `${first_cell_width}px`;
      self.scroller.style.paddingLeft = `${first_cell_width - 1}px`;
    }

    container.classList.add(states.container.overflowing);
    self.overflowing = true;
  }

  // No longer overflowing — reverse what we did before!
  if(overflowing && scroller_width >= min_width) {
    for(cell of Array.from(root.querySelectorAll(`.${classes.cell}:first-child`))) {
      first_cell_width = first_cell_width || cell.offsetWidth;

      cell.style.width = null;
      self.scroller.style.paddingLeft = null;
    }

    for(cell of self.header_cells) { cell.style.maxWidth = null; }

    container.classList.remove(states.container.overflowing);
    self.overflowing = false;
  }

  // Even if already overflowing, update the max-widths of columns such that the
  // persistant cell + any other cell <= the total width.
  if(scroller_width < min_width) {
    available_space = scroller_width - self.header_cells[0].offsetWidth;

    for(index = 1; index++; index < self.header_cells.length) {
      self.header_cells[index].style.maxWidth = `${available_space}px`;
    }
  }
};

last_visible_cell = (self) => {
  var last_cell = self.header_cells[1],
      parent_width = self.scroller.scrollLeft + self.scroller.offsetWidth - parseInt(self.scroller.style.paddingLeft, 10),
      width_so_far = last_cell.offsetWidth,
      cell, index;

  for(index = 2; index++; index < self.header_cells[index]) {
    cell = self.header_cells[index];
    if((width_so_far + cell.offsetWidth) > parent_width) { break; }
    last_cell = cell;
    width_so_far += cell.offsetWidth;
  }

  return [last_cell, parent_width - width_so_far];
};

//*
// Shifts the `Table` represented by `self` to the right by one column. If the
// table currently has a column that is partially visible on the right, the
// table will be scrolled such that that entire column is visible. If a column
// is entirely visible and pressed right against the right edge of the scroll
// area, the next (fully hidden) column will be shown.
//
// This has no effect if the table is already fully scrolled.
//
// @param {Object} self - The internal details of a `Table`.

shift_table_right = (self) => {
  var last_cell, next_cell_overlap;

  if(!self.overflowing) { return; }
  [last_cell, next_cell_overlap] = last_visible_cell(self);

  if(last_cell === self.header_cells[self.header_cells.length - 1]) { return; }
  self.scroller.scrollLeft += (last_cell.nextElementSibling.offsetWidth - next_cell_overlap);
  self.scroller.classList.add(states.scroller.scrolled);
  update_actions(self);
};

//*
// Shifts the `Table` represented by `self` to the left by one column. If the
// table currently has a column that is partially visible on the right, the
// table will be scrolled such that that entire column is hidden. If a column
// is entirely visible and pressed right against the right edge of the scroll
// area, that column will be scrolled out of view.
//
// This has no effect if the table is at a scroll position of 0.
//
// @param {Object} self - The internal details of a `Table`.

shift_table_left = (self) => {
  var last_cell, next_cell_overlap, scroll_delta;

  if(!self.overflowing) { return; }
  [last_cell, next_cell_overlap] = last_visible_cell(self);
  scroll_delta = (next_cell_overlap ? -next_cell_overlap : -last_cell.offsetWidth);

  self.scroller.scrollLeft += scroll_delta;
  if(!self.scroller.scrollLeft) { self.scroller.classList.remove(states.scroller.scrolled); }
  update_actions(self);
};

//*
// Handles a keypress while focused on the table. Only left/ right/ up/ down
// keypresses are handled here: left and down will shift the table left, while
// right and up will shift the table right.
//
// @param {Object} event - The original `keypress` event.
// @param {Object} self - The internal details of a `Table`.
// @private

handle_keypress = (event, self) => {
  switch(event.which) {
    case Keycodes.RIGHT:
      event.preventDefault();
      shift_table_right(self);
      break;
    case Keycodes.LEFT:
      event.preventDefault();
      shift_table_left(self);
      break;
  }
};

//*
// Handles scrolling on the table by updating the classes on the scroller/
// action buttons to reflect the current scroll position.
//
// @param {Object} event - The original `scroll` event.
// @param {Object} self - The internal details of a `Table`.
// @private

handle_scroll = (event, self) => {
  var scroller;

  if(!self.overflowing) { return; }

  scroller = self.scroller;
  if(scroller.scrollLeft > 0) {
    scroller.classList.add(states.scroller.scrolled);
  } else {
    scroller.classList.remove(states.scroller.scrolled);
  }

  update_actions(self);
  event.stopPropagation();
};

//*
// Hooks up the event handlers for table actions, stores the actions on
// `self.shifters` for easier access later, and performes the initial updates
// to make the state of the actions match the table itself.
//
// @param {Object} self - The internal details of a `Table`.
// @private

initialize_table_actions = (self) => {
  var action;

  self.shifters = {};
  for(action of Array.from(self.container.querySelectorAll(`.${classes.actions} [${attrs.action}]`))) {
    self.shifters[action.getAttribute(attrs.action).replace("shift-", "")] = action;
  }

  update_actions(self);

  $(self.container).on("click", `.${classes.actions}`, (event) => {
    switch(event.target.getAttribute(attrs.action)) {
      case actions.shift_right:
        shift_table_right(self);
        break;
      case actions.shift_left:
        shift_table_left(self);
        break;
    }
  });
};

//*
// Updates the table actions by disabling actions that can't be performed given
// the state of the table (for example, a left shifter when the table is fully
// scrolled to the left).
//
// @param {Object} self - The internal details of a `Table`.
// @private

update_actions = (() => {
  var disable, enable;

  disable = (shifter) => {
    shifter.disabled = true;
    shifter.classList.add(`${shifter.className.split(" ")[0]}--is-disabled`);
  };

  enable = (shifter) => {
    shifter.disabled = false;
    shifter.classList.remove(`${shifter.className.split(" ")[0]}--is-disabled`);
  };

  return (self) => {
    var shifters = self.shifters,
        scroll = self.scroller.scrollLeft;

    if(!scroll) {
      disable(shifters.left);
    } else {
      enable(shifters.left);
    }

    if((scroll + self.scroller.offsetWidth + 1) >= self.scroller.scrollWidth) {
      disable(shifters.right);
    } else {
      enable(shifters.right);
    }
  };
})();

//*
// A factory for producing `Table` objects.
//
// @param {HTMLElement} root - The root (`.table`) node of the table. Note that
//                            this is not the container or scroller, but the
//                            actual `table` element itself.
//
// @factory

Table = (root) => {
  var $root, self;

  $root = $(root);
  self = {
    root,
    scroller: $root.closest(`.${classes.scroller}`)[0],
    container: $root.closest(`.${classes.container}`)[0],
    overflowing: false,
    header_cells: Array.from(root.querySelectorAll(`.${classes.header} .${classes.cell}`))
  };

  root.setAttribute("tabindex", "-1");
  cache_preferred_widths(self);
  check_for_overflow(self);
  initialize_table_actions(self);

  $(window).on("resize", () => {
    check_for_overflow(self);
    update_actions(self);
  });

  root.addEventListener("keydown", (event) => { handle_keypress(event, self); });
  self.scroller.addEventListener("scroll", (event) => { handle_scroll(event, self); });
};

Table.init = () => {
  Builder.build(Table, { name: classes.root });
};
