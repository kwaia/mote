import {createNode, Node} from "1e14";

export type In<V> = {
  /**
   * Value to be sampled.
   */
  d_val: V;

  /**
   * Sampling signal.
   */
  ev_smp: any;
};

export type Out<V> = {
  /**
   * Sampled input value.
   */
  d_val: V;
};

/**
 * Forwards last input value on receiving a sampling signal.
 * @example
 * import {connect} from "1e14";
 * import {createSampler} from "1e14-async";
 * const sampler = createSampler();
 * connect(sampler.o.d_val, console.log);
 * sampler.i.d_val(5);
 * sampler.i.d_val(3);
 * sampler.i.ev_smp(); // logs: 3
 */
export type Sampler<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Sampler node.
 */
export function createSampler<V>() {
  return createNode<In<V>, Out<V>>(["d_val"], (outputs) => {
    const o_d_val = outputs.d_val;
    let input: V;
    return {
      d_val: (value) => {
        input = value;
      },

      ev_smp: (value, tag) => {
        o_d_val(input, tag);
      }
    };
  });
}
