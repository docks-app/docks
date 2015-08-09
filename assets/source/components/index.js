import Avatar from "./avatar";
import CodeBlock from "./code_block";
import Demo from "./demo";
import Exploded from "./exploded";
import Field from "./field";
import Iframe from "./iframe";
import InternalLink from "./internal_link";
import Resizable from "./resizable";
import ScrollContainer from "./scroll_container";
import Select from "./select";
import Table from "./table";
import Tablist from "./tablist";
import Toggles from "./toggle";
import Xray from "./xray";

import App from "~foundation/app";

[
  Avatar,
  CodeBlock,
  Exploded,
  Field,
  Iframe,
  InternalLink,
  Resizable,
  ScrollContainer,
  Demo,
  Select,
  Table,
  Tablist,
  Toggles,
  Xray
].forEach(App.register);
