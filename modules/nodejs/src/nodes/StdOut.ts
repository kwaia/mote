import {InPorts, Node} from "1e14";

export type In = {
  /**
   * Value to be sent to stdout.
   */
  d_val: string | Buffer;
};

/**
 * Forwards input to standard output (stdout).
 * Environments: Node.js.
 * @example
 * import {connect, createStdOut} from "river-nodejs";
 * const stdOut = createStdOut();
 * stdOut.i.d_val("foo"); // writes to stdout: "foo"
 */
export type StdOut = Node<In, {}>;

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

  const i: InPorts<In> = {
    d_val: (value) => {
      process.stdout.write(value);
    }
  };

  instance = {i, o: {}};

  return instance;
}
