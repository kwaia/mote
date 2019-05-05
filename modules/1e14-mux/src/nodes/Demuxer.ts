import {createNode, Node} from "1e14";
import {Muxed} from "../types";

export type In<T> = {
  /** Multiplexed input value. */
  d_mux: Muxed<T>;
};

export type Out<T> = T;

/**
 * De-multiplexes input value.
 * Forwards de-multiplexed input values to corresponding output ports.
 * @link https://github.com/1e14/1e14/wiki/Demuxer
 */
export type Demuxer<T> = Node<In<T>, Out<T>>;

/**
 * Creates a Demuxer node.
 * @param fields List of output fields.
 */
export function createDemuxer<T>(fields: Array<keyof T>): Demuxer<T> {
  return createNode<In<T>, Out<T>>(fields, (outputs) => {
    return {
      d_mux: ({field, value}, tag) => {
        outputs[field](value, tag);
      }
    };
  });
}
