import App from "~foundation/app";

import Demo from "./demo";
import Iframe from "./iframe";

[Demo, Iframe].forEach(App.register);

App.init();
