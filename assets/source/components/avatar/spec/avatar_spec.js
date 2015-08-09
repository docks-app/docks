import "spec_helper";
import Avatar, { classes, states, attrs } from "~components/avatar";

var urlFromOptions, makeFixture, loadAndInit;

urlFromOptions = (options = {}) => {
  var url;

  switch(options.name) {
    case "github":
      url = `https://github.com/${options.name}`;
      break;
    case "twitter":
      url = `https://twitter.com/${options.name}`;
      break;
    case "email":
      url = `mailto:${options.name}`;
      break;
  }

  return url;
};

makeFixture = (options = {}) => {
  var data = `${attrs.service}=${options.service} ${attrs.profile_name}=${options.name}`;

  return `
    <div class="${classes.root}" href="${urlFromOptions(options)}" ${data}>
      <span class="${classes.initials}">CS</span>
      <div class="${classes.image}"></div>
    </div>
  `;
};

loadAndInit = (...args) => {
  Fixture.load(makeFixture(...args));
  Avatar.init(Fixture.node);
  return Fixture.node.querySelector(`.${classes.root}`);
};

describe("Avatar", () => {
  describe(".init", () => {
    beforeEach(function() {
      sandbox.useFakeServer();
      sandbox.useFakeTimers(Date.now());
    });

    it("has an init method", function() {
      expect(Avatar.init).to.be.a.function;
    });

    it("loads email avatars", function() {
      var avatar_node = loadAndInit({ service: "email", name: "chrismsauve@gmail.com" }),
          image = avatar_node.querySelector(`.${classes.image}`);

      sandbox.clock.tick(1000);
      expect(image.classList.contains(states.image.visible)).to.be.true;
      expect(image.style.backgroundImage).to.equal("url(http://avatars.io/email/chrismsauve@gmail.com)");
    });

    it("loads twitter avatars", function() {
      var avatar_node = loadAndInit({ service: "twitter", name: "_lemonmade" }),
          image = avatar_node.querySelector(`.${classes.image}`);

      sandbox.clock.tick(1000);
      expect(image.classList.contains(states.image.visible)).to.be.true;
      expect(image.style.backgroundImage).to.equal("url(http://avatars.io/twitter/_lemonmade)");
    });

    // it("loads github avatars", function() {
    //   var avatar_node = loadAndInit({ service: "github", name: "lemonmade" }),
    //       image = avatar_node.querySelector(`.${classes.image}`);
    //
    //   sandbox.server.requests[0].respond(200, { "Content-Type": "application/json" }, "{'avatar_url': 'foo.png'}");
    //   sandbox.clock.tick(1000);
    //
    //   expect(image.classList.contains(states.image.visible)).to.be.true;
    //   expect(image.style.backgroundImage).to.equal("foo.png");
    // });
  });
});
