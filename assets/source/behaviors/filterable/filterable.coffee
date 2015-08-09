#*
# @page Filterable
# @group Behavior
#
# This behavior provides a set of attributes that allow you to establish an
# `input`, which acts as the [`Filter`](@link), and any number of connected
# [`Filterable`](@link) components. The filter, for its part, specifies
# what notes it filters (through the `data-filters` attribute), on what
# attribute of the items contained in the filterable it should compare against
# (through the `data-filter-attribute` attribute). `checkbox` inputs may also
# provide some additional attributes to specify the meaning of checked/
# unchecked.
#
# The `filterable` specifies which of its items should be filtered using its
# `data-filter-items` attribute. Filterable containers can have any number of
# nested groups, each of which will be independently hidden when all of its
# contained items are filtered out.
#
# This behavior is most commonly used in conjunction with the [`List`](@link list::list)
# component, but is generic enough to work with any container that has children.

CLASSES =
  HIDDEN: "filter--is-hidden"
  HIGHLIGHT: "filter--highlight"

ATTRS =
  FILTERS: "data-filters"
  ATTRIBUTE: "data-filter-attribute"
  ITEMS: "data-filter-items"
  STATUS: "data-filtered-status"
  CHECKED_VALUE: "data-checked-value"
  UNCHECKED_VALUE: "data-unchecked-value"

STATUS =
  HIDDEN: "hidden"
  VISIBLE: "visible"

#*
# Wraps the matching characters in `text` with a span that adds the highlighting
# class.
#
# @private
# @param {String} text - The text to match within.
# @param {String} match_text - The sequence of strings that show be highlighted
# (characters do not to be contiguous in `text`).
#
# @returns String - The string with highlights applied.
#
# @example
# highlight_characters("foo bar", "o")
# # => "f<span class='filter--highlight'>o</span>o bar"
#
# @example
# highlight_characters("foo bar", "obr")
# # => "f<span class='filter--highlight'>o</span>o <span class='filter--highlight'>b</span>a<span class='filter--highlight'>r</span>"

highlight_characters = (text, match_text) ->
  return text unless match_text.length

  [start_tag, end_tag] = ["<span class='#{CLASSES.HIGHLIGHT}'>", "</span>"]
  [match_text_index, match_text_char] = [0, match_text[0]]
  last_index = 0
  new_text = ""
  old_text = text.trim()

  for char, index in old_text
    if char.toLowerCase() == match_text_char.toLowerCase()
      new_text += "#{old_text[last_index...index]}#{start_tag}#{char}#{end_tag}"
      last_index = index + 1
      match_text_index += 1
      match_text_char = match_text[match_text_index]

      break unless match_text_char?

  new_text += old_text[last_index..-1]
  new_text


#*
# An individual item that can, conditional on all of the filters that have been
# applied against it, be either hidden (at least one filter does not match) or
# visible (all filters currently match).
#
# [`Filter`s](@link Filter) can be applied with the
# [`filter_against`](@link FilterableItem#filter_against) method. The last
# matching state of all applied filters are recorded, so multiple filters can
# be applied to an item and the item will respect all of them.
#
# @factory
#
# @param {HTMLElement} node - The node that will be visually hidden/ visible
# based on the matching status of all applied filters.

FilterableItem = (node) ->
  filters = {}

  Object.create {},
    #*
    # The DOM element that this `FilterableItem` represents.
    #
    # @type HTMLElement
    # @property
    node: value: node

    #*
    # Indicates whether or not the DOM element does not match any filters it has
    # been compared against (in which case, the item should be hidden).
    #
    # @type Boolean
    # @property
    is_hidden: get: -> !@is_visible

    #*
    # Indicates whether or not the DOM element matches all filters it has
    # been compared against (in which case, the item should be visible).
    #
    # @type Boolean
    # @property
    is_visible: get: ->
      for id, filter_matches of filters
        return false unless filter_matches

      true

    #*
    # Checks this item against the passed filter. After the matching status of
    # the passed filter is updated, it checks all matching states and updates
    # the `data-filter-status` attribute appropriately.
    #
    # @method
    #
    # @param {Filter} filter - The filter to apply to this item.
    # @returns Boolean - The matching state of the passed filter.
    filter_against: value: (filter) ->
      matches = filter.test(this)
      filters[filter.id] = matches
      node.setAttribute(ATTRS.STATUS, if @is_visible then STATUS.VISIBLE else STATUS.HIDDEN)
      matches

    #*
    # Removes the effects of the passed filter and updates the filtered status
    # of the item accordingly.
    #
    # @method
    #
    # @param {Filter} filter - The filter to remove.
    remove_filter: value: (filter) -> filters.delete(filter.id)

#*
# A wrapper around a set of filterable items. The root of this object can have
# a `data-filter-items` attribute, which specifies which of its descendants
# should be filtered against attached [`Filter`s](@link Filter). If no such
# attribute is provided, the container's direct children will be used as the
# items.
#
# When a custom selector is provided via `data-filter-items`, this object will
# go through all of its subcomponents, collecting (on each level of the DOM)
# items that need to be filtered (those matching the selector) and "nested"
# `Filterable`s. The nested components will independently be hideable, and
# `Filterable`s higher up the chain will check whether their contained
# groups are fully hidden before fully hiding themselves.
#
# @factory
#
# @param {HTMLElement} root - The node wrapping all filterable items.
# @param {Object} options - The options for initializing this component.
#
# @param {String} options.selector - The selector for filterable items. This is
# used for nested groups inside a root `Filterable` so that they can properly
# specify their contained filterable items.
#
# @param {Boolean} options.nested - Indicates whether the `Filterable` is
# nested inside a root `Filterable`. This must be specified in order to prevent
# cacheing the `Filterable` on its node.


Filterable = do ->
  get_items_and_groups = (root, selector) ->
    children = Array::slice.call(root.children)

    if selector
      items = []
      groups = []

      for child in children
        if $(child).is(selector)
          items.push(FilterableItem(child))
        else
          group = Filterable(child, selector: selector, nested: true)
          groups.push(group) if group.is_valid
    else
      items = (FilterableItem(child) for child in children)
      groups = []

    [items, groups]

  (root, options = {}) ->
    selector = options.selector || root.getAttribute(ATTRS.ITEMS)
    [items, groups] = get_items_and_groups(root, selector)

    api = Object.create {},
      #*
      # The node that represents this component in the DOM.
      #
      # @property
      # @type HTMLElement
      root: get: -> root

      #*
      # Specifies whether or not this `Filterable`, or any nested `Filterable`s,
      # have filterable items. It is used to prevent storing references to nodes
      # that are neither filterable items, nor nested containers of filterable
      # items (for example, headings in lists).
      #
      # @property
      # @type Boolean
      is_valid: get: -> items.length > 0 || groups.length > 0

      #*
      # Specifies whether or not there are any filterable items, either in this
      # `Filterable` or in any nested `Filterable`s, which are still visible
      # based on the active filters.
      #
      # @property
      # @type Boolean
      has_visible_items: get: ->
        items.some((item) -> item.is_visible) ||
          groups.some((group) -> group.has_visible_items)

      #*
      # Applies a filter against all contained items and nested `Filterables`.
      # Once the filter has been applied, this method also sets the current
      # filtered state in the `data-filter-status` on the
      # [`root`](@link Filterable#root) node.
      #
      # @method
      #
      # @param {Filter} filter - The filter against which all contained items
      # should be compared.
      filter_against: value: (filter) ->
        group.filter_against(filter) for group in groups
        item.filter_against(filter) for item in items
        root.setAttribute(ATTRS.STATUS, if @has_visible_items then STATUS.VISIBLE else STATUS.HIDDEN)
        return

    $(root).data("filterable", api) unless options.nested
    api

#*
# Returns the cached [`Filterable`](@link) for the passed node, or nothing if
# the cached node is not the *root* of a `Filterable`.
#
# @method
# @static
#
# @param {HTMLElement} node - The node for which a `Filterable` should be
#                             retrieved.
#
# @returns Filterable

Filterable.for = (node) -> $(node).data("filterable")

#*
# @factory
#
# @param {HTMLElement} node - The `input` that filters some set of
# [`Filterable`s](@link Filterable). This node **must** have:
#
# - A `data-filters` attribute, specifying selectors that are the root of
#   a set of filterable items.
#
# - A `data-filter-attribute` attribute, specyfing the attribute of filterable
#   items inside the [`Filterable`](@link) that should be compared against this
#   filter. This can either be an attribute on all filterable items (i.e.,
#   the private member toggle in the base theme compates against `data-private`)
#   or the special word `"content"`, which will compare against a filterable
#   item's `textContent` property.

Filter = do ->
  filter_id = 1

  matcher_for = (node) ->
    if node.type == "checkbox"
      if node.checked
        value = node.getAttribute(ATTRS.CHECKED_VALUE)
        if value then new RegExp(value) else /true/
      else
        value = node.getAttribute(ATTRS.UNCHECKED_VALUE)
        if value then new RegExp(value) else /false/

    else
      value = node.value.split("")
      if value.length == 0 then { test: -> true } else new RegExp(value.join(".*?"), "i")

  filterables_for = (node) ->
    filter_selectors = node.getAttribute(ATTRS.FILTERS).split(/\s*,\s*/)

    filterables = Array::reduce.call filter_selectors, (objects, selector) ->
      filterable = Filterable.for(document.querySelector(selector))
      # What if not filterable'd?
      objects.push(filterable) if filterable && filterable.is_valid
      objects
    , []

  (node) ->
    matcher = null
    # Set a default?
    filters_on = node.getAttribute(ATTRS.ATTRIBUTE)
    filters_on_contents = filters_on == "contents"
    filterables = filterables_for(node)

    api =
      #*
      # The unique identifier for the filter. This is used for each
      # [`FilterableItem`'s](@link FilterableItem) to create an internal list
      # of all attached filters and whether or not they currently match.
      #
      # @property
      # @type String
      id: node.id || "filter-#{filter_id++}"

      #*
      # Tests a node against this `Filter`. If the method returns `true`, then
      # the item passes the filter and should be shown (assuming no other
      # filters are not passed by the item). If it returns `false`, the item
      # should be hidden.
      #
      # @method
      # @param {FilterableItem} item - The filterable item to test against this
      # filter.
      #
      # @returns Boolean
      test: (item) ->
        matcher ||= matcher_for(node)
        compare = if filters_on_contents then item.node.textContent else item.node.getAttribute(filters_on)
        matches = matcher.test(compare)
        highlight_match(item.node) if filters_on_contents && matches
        matches

    highlight_match = (item) ->
      item.innerHTML = highlight_characters(item.textContent, node.value)

    update = ->
      matcher = null
      filterable.filter_against(api) for filterable in filterables
      return

    $(node).on("change input", update)
    update()
    api

Lemon.make(Filterable, selector: "[#{ATTRS.ITEMS}]")
Lemon.make(Filter, selector: "[#{ATTRS.FILTERS}]")
