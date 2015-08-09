import sinon from "sinon";
import { expect } from "chai";
import Fixture from "./spec_fixture";

global.expect = expect;
global.sinon = sinon;
global.Fixture = Fixture;

mocha.setup("bdd");

beforeEach(() => {
  Fixture.prepare();
  global.sandbox = sinon.sandbox.create();
});

afterEach(() => {
  Fixture.clean();
  global.sandbox.restore();
});
