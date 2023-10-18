export function popen() {
  return {
    readAsString() {
      return globalThis.popen.readAsString;
    },
    flush() {},
    close() {
      return globalThis.popen.close;
    },
  }
}
export function strerror() {
  return globalThis.strerror;
}
