import { popen, strerror } from "std";

export default function exec(command) {
  const result = popen(command, "r");
  const output = result.readAsString().trim();
  result.flush();
  const err = result.close();
  if (err > 0) {
    return [output, Error(strerror(err))];
  }
  return [output, null];
}

export const ARGUMENTS_TYPE = Symbol("ARGUMENTS_TYPE");

const ARGUMENTS_DEFAULT_OPTIONS = { prefix: "--", delimiter: " " };

export class Arguments extends Array {
  constructor(options = {}) {
    super();
    this.prefix = options.prefix || ARGUMENTS_DEFAULT_OPTIONS.prefix;
    this.delimiter = options.delimiter || ARGUMENTS_DEFAULT_OPTIONS.delimiter;
  }
  get type() {
    return ARGUMENTS_TYPE;
  }
  add(key, value) {
    this.push([key, value]);
  }
  toString() {
    let result = "";
    for (const [key, value] of this.values()) {
      result += `${this.prefix}${key}${this.delimiter}${
        value ? value + " " : ""
      }`;
    }
    return result.trim();
  }
}
