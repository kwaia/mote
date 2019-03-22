import {connect} from "1e14";
import {createFilter, Filter} from "./Filter";

describe("createFilter()", () => {
  describe("on input (d_val)", () => {
    let node: Filter<number>;

    beforeEach(() => {
      node = createFilter((value) => value > 5);
    });

    describe("when value satisfies callback", () => {
      it("should forward d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.d_val(6, "1");
        expect(spy).toHaveBeenCalledWith(6, "1");
      });
    });

    describe("when value doesn't satisfies callback", () => {
      it("should not forward d_val", () => {
        const spy = jasmine.createSpy();
        connect(node.o.d_val, spy);
        node.i.d_val(5, "1");
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
