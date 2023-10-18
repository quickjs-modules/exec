import exec from "./_exec.js"; // import exec.js bundled where `std` is mocked by `std-mock.js`
import testsuite from "../modules/testsuite.js"
import { isEqual } from "../modules/assert.js";

const suite = testsuite("exec");

suite.test("command", () => {
  mock({readAsString: "", close: 0});
  const [output, err] = exec("command");
  isEqual(output, "");
  isEqual(err, null);
});

suite.test("trimmed output", () => {
  mock({readAsString: "  output  ", close: 0});
  const [output, err] = exec("command");
  isEqual(output, "output");
  isEqual(err, null);
});

suite.test("error", () => {
  mock({readAsString: "error", close: 1, strerror: "error one"})
  const [output, err] = exec("command");
  isEqual(output, "error");
  isEqual(err.message, "error one");
});

suite.run();

function mock(_mock) {
  globalThis = {}
  globalThis.popen = {
    readAsString: _mock.readAsString,
    close: _mock.close,
  };
  globalThis.strerror = _mock.strerror;
}
