import { Arguments, ARGUMENTS_TYPE } from "../exec.js";
import testsuite from "../modules/testsuite.js";
import { isEqual } from "../modules/assert.js";

const { test, run } = testsuite("Arguments");

test("type", () => {
  const args = new Arguments();
  isEqual(args.type, ARGUMENTS_TYPE);
});

test("add", () => {
  const args = new Arguments();
  args.add("foo", "bar");
  isEqual(args, [["foo", "bar"]]);
});

test("default options", () => {
  const args = new Arguments();
  args.add("first");
  args.add("foo", "hello");
  args.add("bar", "world");
  args.add("baz", 42);
  args.add("last");
  isEqual(`${args}`, "--first --foo hello --bar world --baz 42 --last");
});

test("custom prefix", () => {
  const args = new Arguments({ prefix: "-" });
  args.add("foo");
  args.add("bar");
  args.add("baz");
  isEqual(`${args}`, "-foo -bar -baz");
});

test("custom delimiter", () => {
  const args = new Arguments({ delimiter: "=" });
  args.add("foo", "hello");
  args.add("bar", "world");
  args.add("baz", 42);
  isEqual(`${args}`, "--foo=hello --bar=world --baz=42");
});

run();
