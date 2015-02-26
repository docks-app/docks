BASE_CLASS = "avatar"

CLASSES =
  BASE: BASE_CLASS
  IMAGE: "#{BASE_CLASS}__image"

STATES =
  IMAGE: VISIBLE: "#{CLASSES.IMAGE}--is-visible"

ATTRS =
  PROFILE_NAME: "data-profile-name"
  SERVICE: "data-service"

MIN_TIME_TO_LOAD = 200

#*
# The constructor around an avatar DOM node. This constructor will check for the
# service from which the avatar image should be fetched and do its best to grab
# that image.
#
# @param {DOMElement} node - The top level of the avatar component.
# @returns {undefined}

Avatar = (node) ->
  profile_name = node.getAttribute(ATTRS.PROFILE_NAME)
  image = node.querySelector(".#{CLASSES.IMAGE}")
  service = node.getAttribute(ATTRS.SERVICE)

  start = Date.now()

  switch service
    when "github"
      $.getJSON "https://api.github.com/users/#{profile_name}", (data) ->
        image.style.backgroundImage = "url(#{data.avatar_url})"
        show_image(image, Date.now() - start)

    when "twitter", "email"
      image.style.backgroundImage = "url(http://avatars.io/#{service}/#{profile_name})"
      show_image(image, Date.now() - start)

  return

show_image = (image, time_since_load) ->
  setTimeout ->
    image.classList.add(STATES.IMAGE.VISIBLE)
  , Math.max(0, MIN_TIME_TO_LOAD - time_since_load)

Avatar.CLASSES = CLASSES
Avatar.ATTRS   = ATTRS

window.Docks.Avatar = Avatar
Lemon.make(Avatar)
