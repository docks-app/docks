BASE_CLASS = "exploded"

CLASSES =
  BASE: BASE_CLASS
  STRUCTURE: "#{BASE_CLASS}__structure"
  SOURCE: "#{BASE_CLASS}__source"
  PANE: "#{BASE_CLASS}__pane"
  DETAILS: "#{BASE_CLASS}__details"

STATES =
  BASE:
    DRAGGED: "#{CLASSES.BASE}--is-being-dragged"
  PANE:
    HOVERED: "#{CLASSES.PANE}--is-hovered"
    SELECTED: "#{CLASSES.PANE}--is-selected"

VARIANTS =
  PANE: NO_SELECT: "#{CLASSES.PANE}--no-select"

ATTRS =
  ID: "data-explosion-id"
  NODE: "data-explosion-node"

LAYER_GAP = 30



counts =
  explosions: 0
  panes: 0

Matrix = window.WebKitCSSMatrix || window.MSCSSMatrix || CSSMatrix
identity_matrix = new Matrix

event_coordinates = window.Docks.EventHelpers.coordinates



append_clone = (klass, parent, dims) ->
  parent_width = parent.offsetWidth
  parent_height = parent.offsetHeight
  $("<div class='#{klass}' style='height: #{dims.height}px; width: #{dims.width}px; top: #{dims.top}px; left: #{dims.left}px; transform-origin: #{(parent_width / 2) - dims.left}px #{(parent_height / 2) - dims.top}px 50px;' />").appendTo(parent)[0]

class_for = (node) ->
  klass = CLASSES.PANE
  klass += " #{VARIANTS.PANE.NO_SELECT}" if node.className?.length == 0
  klass

clone_node = (node, destination, level, original_offset) ->
  level ?= 0
  counts.panes += 1

  original_offset ?= node.parentNode.getBoundingClientRect()
  node_offsets = node.getBoundingClientRect()
  mirrored = append_clone(class_for(node), destination, height: node_offsets.height, width: node_offsets.width, top: node_offsets.top - original_offset.top, left: node_offsets.left - original_offset.left)

  id = "#{counts.explosions}-#{counts.panes}"
  node.setAttribute(ATTRS.ID, id)
  mirrored.setAttribute(ATTRS.NODE, id)

  panes = [{node: mirrored, level: level}]

  level += 1
  for child in node.children
    panes = panes.concat(clone_node(child, destination, level, original_offset))
  level -= 1

  panes

clone = (source, destination) ->
  source.style.display = ""
  destination.style.height = "#{source.offsetHeight}px"
  destination.innerHTML = ""


  counts.explosions += 1
  counts.panes = 0
  panes = []

  for child in source.children
    panes = panes.concat(clone_node(child, destination))

  source.style.display = "none"

  panes

node_for_pane = (pane) ->
  return unless node_id = pane.getAttribute(ATTRS.NODE)
  document.querySelector("[#{ATTRS.ID}='#{node_id}']")




rotate_panes = (panes, rotation_matrix) ->
  requestAnimationFrame ->
    for pane in panes
      pane.node.style.transform = rotation_matrix.translate(0, 0, pane.level * LAYER_GAP).toString()




# EVENTS

mouseenter = (event) ->
  event.fromElement?.classList.remove(STATES.PANE.HOVERED)
  target_classes = event.toElement.classList
  target_classes.add(STATES.PANE.HOVERED) unless target_classes.contains(VARIANTS.PANE.NO_SELECT)

mouseleave = (event) ->
  to_classes = event.toElement.classList
  to_classes.add(STATES.PANE.HOVERED) if to_classes.contains(CLASSES.PANE) && !to_classes.contains(VARIANTS.PANE.NO_SELECT)
  event.fromElement?.classList.remove(STATES.PANE.HOVERED)

click = (event) ->
  event.stopPropagation()
  pane = event.target
  Exploded.for(pane)?.select_pane(pane)

start_dragging = (context) ->
  $node = $(context.node)
  $body = $(document.body)
  context.node.classList.add(STATES.BASE.DRAGGED)

  last = context.coordinates

  prevent_pointer_events_timeout = setTimeout ->
    $body.children().css(pointerEvents: "none")
  , 400

  drag = (event) ->
    event.preventDefault()
    touches = event.touches
    coordinates = event_coordinates(event)

    context.rotate_by((coordinates.x - last.x) / 2, (coordinates.y - last.y) / 2)
    last = coordinates
    return

  drag_end_cleanup = (event) ->
    context.node.classList.remove(STATES.BASE.DRAGGED)
    clearTimeout(prevent_pointer_events_timeout)
    $body.off("mousemove touchmove", drag)
    $body.off("mouseup touchend", drag_end_cleanup)
    $body.children().css(pointerEvents: "")

  $body.on("mousemove touchmove", drag)
  $body.on("mouseup touchend", drag_end_cleanup)

$(document).on("mouseenter", ".#{CLASSES.PANE}", mouseenter)
$(document).on("mouseleave", ".#{CLASSES.PANE}", mouseleave)
$(document).on("mouseup", ".#{CLASSES.PANE}", click)




construct_details_structure = (exploded) ->
  details_class = ".#{CLASSES.DETAILS}"
  details_base_node = exploded.querySelector(details_class)

  base: details_base_node
  tagname: details_base_node.querySelector("#{details_class}__tagname")
  klass: details_base_node.querySelector("#{details_class}__class")
  description: details_base_node.querySelector("#{details_class}__description")

fill_out_details = (details, node) ->
  component = Docks.Pattern.for(node.className, search_subcomponents: true)

  details.tagname.textContent = node.tagName.toLowerCase()
  details.klass.textContent = node.className.split(" ")[0]
  details.description.innerHTML = component?.description || ""

  for code_block in details.description.querySelectorAll(".#{Docks.CodeBlock.CLASSES.BASE}")
    $(code_block).data(Docks.CodeBlock.CLASSES.BASE, Docks.CodeBlock(code_block))






Exploded = (node) ->
  $node = $(node)
  structure = $node.children(".#{CLASSES.STRUCTURE}")[0]
  source = $node.children(".#{CLASSES.SOURCE}")[0]
  panes = $panes = undefined
  rotation = undefined
  details = construct_details_structure(node)


  set_markup = (markup) ->
    source.innerHTML = markup
    source.offsetHeight
    initialize_panes()

  initialize_panes = ->
    panes = clone(source, structure)
    $panes = $(panes.map((pane) -> pane.node))

    rotation =
      x: 0
      y: 0
      z: 0

    setTimeout ->
      rotate_by(20, 5)
    , 400

  select_pane = (pane) ->
    $panes.removeClass(STATES.PANE.SELECTED)

    target_classes = pane.classList
    return if target_classes.contains(VARIANTS.PANE.NO_SELECT)
    target_classes.add(STATES.PANE.SELECTED)

    fill_out_details(details, node_for_pane(pane))

  rotate_by = (x, y) ->
    rotation.x += x
    rotation.y += y
    rotation.x = rotation.x % 360
    rotation.y = rotation.y % 360

    rotate_panes(panes, identity_matrix.rotate(-rotation.y, rotation.x, 0))


  mousedown = (event) ->
    context =
      node: node
      coordinates: event_coordinates(event)
      rotate_by: rotate_by

    start_dragging(context)

  $(structure).on("mousedown touchstart", mousedown)

  exploded =
    select_pane: select_pane
    set_markup: set_markup

  exploded





Exploded.CLASSES = CLASSES

window.Docks.Exploded = Exploded
Lemon.make(Exploded, with_cache: true)
