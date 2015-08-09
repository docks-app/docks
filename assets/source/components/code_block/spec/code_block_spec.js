import "spec_helper";
import CodeBlock from "~components/code_block";

describe("CodeBlock", () => {
  describe(".init", () => {
    it("has an init method", () => {
      expect(CodeBlock.init).to.be.a.function;
    });
  });
});
