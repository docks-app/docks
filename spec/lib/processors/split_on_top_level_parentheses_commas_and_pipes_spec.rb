require 'spec_helper'

describe Docks::Processors::SplitOnTopLevelParenthesesCommasAndPipes do
  subject { Docks::Processors::SplitOnTopLevelParenthesesCommasAndPipes }

  describe "#process" do

    it "returns the original result as an array if it contained no parentheses" do
      content = "foo bar"
      expect(subject.process(content)).to eq [content]
    end

    it "does not split on unmatched opening parentheses" do
      content = "This better not match... :( OR ELSE"
      expect(subject.process(content)).to eq [content]
    end

    it "does not split on unmatched closing parentheses" do
      content = "We got past the first one :) now to make it past here..."
      expect(subject.process(content)).to eq [content]
    end

    it "does not split on reversed sets of parentheses" do
      content = "I start happy :) then end sad... :("
      expect(subject.process(content)).to eq [content]
    end

    it "does not split when there is only one set of parentheses" do
      content = "foo (bar)"
      expect(subject.process(content)).to eq [content]
    end

    it "does not split when there is a nested set of parentheses" do
      content = "foo (bar (baz))"
      expect(subject.process(content)).to eq [content]
    end

    it "creates a result for each set of top-level parentheses" do
      content = "here's (one), and here's (two), AND HERE'S (THREE)"
      expect(subject.process(content).length).to be 3
    end

    it "does not create additional results for nested parentheses" do
      content = "here's (one), and here's (t(w)o), AND HERE'S (TH(R)EE)"
      expect(subject.process(content).length).to be 3
    end

    it "strips spaces, pipes, and commas between the closing paren and the next character" do
      content = "here's (one), and here's (t(w)o)   AND HERE'S (TH(R)EE) |  oh and (four)"
      expect(subject.process(content)).to eq ["here's (one)", "and here's (t(w)o)", "AND HERE'S (TH(R)EE)", "oh and (four)"]
    end

    it "strips multiple commas/ pipes" do
      content = "here's (one) ,, and here's (t(w)o)   AND HERE'S (TH(R)EE) ||||  oh and (four)"
      expect(subject.process(content)).to eq ["here's (one)", "and here's (t(w)o)", "AND HERE'S (TH(R)EE)", "oh and (four)"]
    end

    it "splits even when the parentheses are directly beside each other" do
      content = "(one)(two)(three)"
      expect(subject.process(content)).to eq ["(one)", "(two)", "(three)"]
    end

    it "splits out the last segment even when it has no parentheses" do
      content = "foo (bar), baz"
      expect(subject.process(content)).to eq ["foo (bar)", "baz"]
    end

    it "does not split on a comma inside of parentheses" do
      content = "foo (bar, baz)"
      expect(subject.process(content)).to eq [content]
    end

    it "does not split on a pipe inside of parentheses" do
      content = "foo (bar || baz)"
      expect(subject.process(content)).to eq [content]
    end

    it "creates a result for each set of top-level commas" do
      content = "one, two ,,three ,  four"
      expect(subject.process(content)).to eq %w(one two three four)
    end

    it "creates a result for each set of top-level pipes" do
      content = "one| two |three |  four"
      expect(subject.process(content)).to eq %w(one two three four)
    end

    it "creates a result for each set of top-level mixed commas and pipes" do
      content = "one, two |three ,  four,"
      expect(subject.process(content)).to eq %w(one two three four)
    end

    it "does not create additional results for nested commas and pipes" do
      content = "one (one,), and here's (t|wo) || AND HERE'S (TH(R|)EE)"
      expect(subject.process(content).length).to be 3
    end

  end
end
