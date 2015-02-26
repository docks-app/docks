BASE_CLASS = "select"

CLASSES =
  BASE: BASE_CLASS
  INPUT: "#{BASE_CLASS}__input"

STATES =
  BASE: FOCUSED: "#{CLASSES.BASE}--is-focused"

focus_or_blur_select = (event) ->
  method = if event.type == 'focusin' then 'addClass' else 'removeClass'
  $(event.target).closest(".#{CLASSES.BASE}")[method](STATES.BASE.FOCUSED)

$ ->
  $(document).on "focus blur", ".#{CLASSES.INPUT}", focus_or_blur_select

Select =
  CLASSES: CLASSES
  STATES:  STATES

window.Docks.Select = Select
