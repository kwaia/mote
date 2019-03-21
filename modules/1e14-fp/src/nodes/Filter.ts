import {createNode, Node} from "1e14";
import {FilterCallback} from "../types";

export type In<V> = {
  /**
   * Value to be filtered.
   */
  d_val: V;
};

export type Out<V> = {
  /**
   * Bounced input value.
   */
  b_d_val: V;

  /**
   * Forwarded value.
   */
  d_val: V;

  /**
   * Error message.
   */
  ev_err: string;
};

/**
 * Filters input values according to a filter callback.
 * Bounces input, and emits error on callback exception.
 * @example
 * import {connect} from "1e14";
 * import {createFilter} from "1e14-fp";
 * const filter = createFilter(next => next > 5);
 * connect(filter.o.d_val, console.log);
 * filter.i.d_val(3);
 * filter.i.d_val(5);
 * filter.i.d_val(8); // logs: 8
 */
export type Filter<V> = Node<In<V>, Out<V>>;

/**
 * Creates a Filter node.
 * @param cb Filter callback.
 */
export function createFilter<V>(cb: FilterCallback<V>): Filter<V> {
  return createNode<In<V>, Out<V>>
  (["b_d_val", "d_val", "ev_err"], (outputs) => {
    return {
      d_val: (value, tag) => {
        try {
          if (cb(value, tag)) {
            outputs.d_val(value, tag);
          }
        } catch (err) {
          outputs.b_d_val(value, tag);
          outputs.ev_err(String(err), tag);
        }
      }
    };
  });
}
