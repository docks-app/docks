# CLASS_GRID_CHANGER = 'grid-changer'
# CLASS_GRID_CHANGER_CONTAINER = 'grid-changers'

# EVENT_TYPE_ADD_GRID_CELL = 'agc'
# EVENT_TYPE_CELL_SELECTION_CHANGE = 'csc'
# EVENT_TYPE_CELL_SELECTION_REQUEST = 'csr'

# class GridChangers
#   constructor: (@$gridChangers) ->
#     @classChangers = $(".#{Docks.CLASS_CHANGER_CONTAINER}").data(Docks.DATA_CLASS_CHANGERS)
#     @classChangers.disable('next-grid__cell')

#     $(document).on "click.#{CLASS_GRID_CHANGER}", ".#{CLASS_GRID_CHANGER}", @_handleGridChange

#   _handleGridChange: (event) =>
#     $this = $(event.target)
#     size = if $this.hasClass('grid-changer--add-large-button')
#       'large'
#     else
#       undefined

#     @message
#       type: EVENT_TYPE_ADD_GRID_CELL
#       size: size

#   _processMarkup: (html) ->
#     html.replace(/\<div class="next\-grid__cell__content[^\n]*/g, "<!-- content -->")
#         .replace(/\snext\-grid__cell\-\-is\-selected/g, '')

#   registerDemoActions: ->
#     findAppliedClasses = ->
#       $selectedCells = @body.find('.next-grid__cell--is-selected')

#       appliedClasses = {}
#       $selectedCells.each () ->
#         $this = $(this)
#         classes = $this.attr('class').replace(/^next\-grid__cell\s?/, '').replace('next-grid__cell--is-selected', '').trim().split(' ')
#         classes.forEach (klass, index) ->
#           if klass.length
#             currentCount = appliedClasses[klass]
#             appliedClasses[klass] = if currentCount? then currentCount + 1 else 1

#       @message
#         type: EVENT_TYPE_CELL_SELECTION_CHANGE
#         appliedClasses: appliedClasses
#         count: $selectedCells.length

#     @iframes.registerAction EVENT_TYPE_ADD_GRID_CELL, (data) ->
#       @body.find('.next-grid').append("  <div class='next-grid__cell'>\n    <div class='next-grid__cell__content#{if data.size? then " next-grid__cell__content--#{data.size}" else ''}'><span class='next-grid__cell__content__close'>x</span></div>\n  </div>\n")
#       @_sendMarkup()

#     @iframes.registerAction EVENT_TYPE_CELL_SELECTION_REQUEST, ->
#       findAppliedClasses.call(@)

#     @iframes.registerHandler 'click', '.next-grid__cell__content', (event) ->
#       $(event.target).toggleClass('next-grid__cell__content--is-selected').parent().toggleClass('next-grid__cell--is-selected')
#       findAppliedClasses.call(@)

#     @iframes.registerHandler 'click', '.next-grid__cell__content__close', (event) ->
#       $(event.target).closest('.next-grid__cell').remove()
#       @_sendMarkup()
#       findAppliedClasses.call(@)
#       event.stopImmediatePropagation()

#   receive: (data) ->
#     @_highlightClassChangers(data) if data.type == EVENT_TYPE_CELL_SELECTION_CHANGE
#     if data.type == Docks.EVENT_TYPE_MARKUP_CHANGE
#       @message({type: EVENT_TYPE_CELL_SELECTION_REQUEST})
#       data.html = @_processMarkup data.html

#   _highlightClassChangers: (data) ->
#     if data.count == 0
#       @classChangers.disable('next-grid__cell')
#     else
#       @classChangers.enable()

#     @classChangers.deselectAll('next-grid__cell')
#     for klass, count of data.appliedClasses
#       @classChangers.select(klass, count != data.count)



# window.Docks.registerPlugin GridChangers, ".#{CLASS_GRID_CHANGER_CONTAINER}"

# window.Docks.GridChangers = GridChangers
# window.Docks.CLASS_GRID_CHANGER = CLASS_GRID_CHANGER
# window.Docks.CLASS_GRID_CHANGER_CONTAINER = CLASS_GRID_CHANGER_CONTAINER
# window.Docks.EVENT_TYPE_CELL_SELECTION_CHANGE = EVENT_TYPE_CELL_SELECTION_CHANGE
# window.Docks.EVENT_TYPE_CELL_SELECTION_REQUEST = EVENT_TYPE_CELL_SELECTION_REQUEST

# window.Docks.EVENT_TYPE_ADD_GRID_CELL = EVENT_TYPE_ADD_GRID_CELL
