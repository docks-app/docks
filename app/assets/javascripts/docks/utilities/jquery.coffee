# transitionEnd
# ----------------------------------------------------------------------
# Calls a function when the transition on that jQuery object ends (called only once)

$.fn.transitionEnd = (handler) ->
  this.one 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', handler


# animationEnd
# ----------------------------------------------------------------------
# Calls a function when the animation on that jQuery object ends (called only once)

$.fn.animationEnd = (handler) ->
  this.one 'webkitAnimationEnd oanimationend msAnimationEnd animationend', handler
