//        ___                     ___                 ___          ___
//       /  /\        ___        /  /\        ___    /  /\        /  /\
//      /  /::\      /__/\      /  /::\      /  /\  /  /::\      /  /::\
//     /  /:/\:\     \  \:\    /  /:/\:\    /  /:/ /  /:/\:\    /  /:/\:\
//    /  /:/~/::\     \  \:\  /  /:/~/::\  /  /:/ /  /:/~/::\  /  /:/~/:/
//   /__/:/ /:/\:\___  \__\:\/__/:/ /:/\:\/  /::\/__/:/ /:/\:\/__/:/ /:/___
//   \  \:\/:/__\/__/\ |  |:|\  \:\/:/__\/__/:/\:\  \:\/:/__\/\  \:\/:::::/
//    \  \::/    \  \:\|  |:| \  \::/    \__\/  \:\  \::/      \  \::/~~~~
//     \  \:\     \  \:\__|:|  \  \:\         \  \:\  \:\       \  \:\
//      \  \:\     \__\::::/    \  \:\         \__\/\  \:\       \  \:\
//       \__\/         ~~~~      \__\/               \__\/        \__\/

import Builder from "~utilities/builder";
import "whatwg-fetch";

//*
// The name of classes relevant to `Avatar`.
// @object

const classes = {
  //*
  // @property
  root: "avatar",

  //*
  // @property
  image: "avatar__image",

  //*
  // @property
  initials: "avatar__initials"
};

//*
// The name of states relevant to `Avatar`.
// @object

const states = {
  //*
  // @property
  image: {
    visible: `${classes.image}--is-visible`
  }
};

//*
// The name of attributes relevant to `Avatar`.
// @object

const attrs = {
  //*
  // @property
  profile_name: "data-profile-name",

  //*
  // @property
  service: "data-service"
};

//*
// The minimum time, in milliseconds, before the background images for avatars
// should be faded into view. This is done to prevent any sudden visual changes
// immediately after page load.
//
// @value 200
// @type Number
// @private

const MIN_TIME_TO_LOAD = 200;

var Avatar, show_image;

//*
// Fades the image into view smoothly. To prevent sudden appearance of images
// immediately after page load, this function stores the time when it was
// initialized and waits at least `MIN_TIME_TO_LOAD` after that before applying
// the required classes.
//
// @private
// @param {DOMElement} image - The image to reveal.

show_image = (() => {
  var start = Date.now();

  return (image) => {
    setTimeout(() => {
      image.classList.add(states.image.visible);
    }, Math.max(0, MIN_TIME_TO_LOAD - (Date.now() - start)));
  };
})();

//*
// The constructor around an avatar DOM node. This constructor will check for
// the service from which the avatar image should be fetched and do its best to
// grab that image.
//
// Because there is no way to interact with an `Avatar`, there is no public
// interface for this component.
//
// @factory
//
// @param {DOMElement} node - The root of an Avatar component.

Avatar = (node) => {
  var profile_name = node.getAttribute(attrs.profile_name),
      image = node.querySelector(`.${classes.image}`),
      service = node.getAttribute(attrs.service);

  switch(service) {
    case "github":
      fetch(`https://api.github.com/users/${profile_name}`)
        .then((response) => { return response.json(); })
        .then((response) => {
          image.style.backgroundImage = `url(${response.avatar_url})`;
          show_image(image);
        });
      break;

    case "twitter":
    case "email":
      image.style.backgroundImage = `url(http://avatars.io/${service}/${profile_name})`;
      show_image(image);
      break;
  }
};

//*
// Initializes the `Avatar` component.
//
// @method
// @static
//
// @requires builder::Builder
//
// @arg {HTMLElement} [context = document] - The context in which to search
// for DOM nodes that should be used as the root of an [`Avatar`](@link)
// component.

Avatar.init = Builder.initialize_once(Avatar, { name: classes.root });

export { classes, states, attrs };
export default Avatar;
