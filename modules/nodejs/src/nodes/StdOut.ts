import {InPorts, Node} from "river-core";

type Inputs = {
  /**
   * Value to be sent to stdout.
   */
  d_val: string | Buffer;
};

/**
 * Forwards input to standard output (stdout).
 * Environments: Node.js.
 * @example
 * river = require("river-core");
 * stdOut = river.createStdOut();
 * stdOut.i.d_val("foo"); // writes to stdout: "foo"
 */
export type StdOut = Node<Inputs, {}>;

let instance: StdOut;

/**
 * Creates a StdOut node.
 * Returns a singleton, ie. subsequent calls to `createStdOut` will return the
 * same object.
 */
export function createStdOut(): StdOut {
  if (instance) {
    return instance;
  }

  const i: InPorts<Inputs> = {
    d_val: (value) => {
      process.stdout.write(value);
    }
  };

  instance = {i, o: {}};

  return instance;
}