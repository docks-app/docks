# COORDINATES

window.Docks.EventHelpers =
  coordinates: (event) ->
    touches = event.touches

    x: touches?[0].x || event.pageX
    y: touches?[0].y || event.pageY
