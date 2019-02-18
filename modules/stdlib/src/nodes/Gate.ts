import {createOutPorts, createOutputs, InPorts, Node} from "river-core";

export type Inputs<V> = {
  /**
   * Value to be forwarded.
   */
  d_val: V;

  /**
   * Whether gate is open.
   */
  st_open: boolean;
};

export type Outputs<V> = {
  /**
   * Forwarded value.
   */
  d_val: V;
};

/**
 * Forwards input value when gate is open.
 * Operates with either independent or joined inputs.
 * @example
 * river = require("river-core");
 * gate = river.createGate(false);
 * river.connect(gate.o.d_val, console.log);
 * gate.i.d_val("a");
 * gate.i.st_open(true);
 * gate.i.d_val("b"); // logs: "b"
 */
export type Gate<V> = Node<Inputs<V> & { all: Inputs<V> }, Outputs<V>>;

/**
 * Creates a Gate node.
 * @param open Initial 'open' state.
 */
export function createGate<V>(open?: boolean): Gate<V> {
  const o = createOutPorts(["d_val"]);
  const outputs = createOutputs(o);

  const i: InPorts<Inputs<V> & { all: Inputs<V> }> = {
    all: ({d_val, st_open}, tag) => {
      if (st_open) {
        outputs.d_val(d_val, tag);
      }
    },

    d_val: (value, tag) => {
      if (open) {
        outputs.d_val(value, tag);
      }
    },

    st_open: (value) => {
      open = value;
    }
  };

  return {i, o};
}