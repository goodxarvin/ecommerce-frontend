import { it, expect, describe } from "vitest";
import getStandardPrice from "./money";

/*
these are unit tests which means they are only test one section of the code.
like only a variable or a function.
*/

describe("getStandardPrice function", () => {
  it("formats cents to dollar like: 1999 to $19.99", () => {
    expect(getStandardPrice(1999)).toBe("$19.99");
  });

  it("diplays two decimals", () => {
    expect(getStandardPrice(1090)).toBe("$10.90");
    expect(getStandardPrice(100)).toBe("$1.00");
  });

  it("works for 0 cents", () => {
    expect(getStandardPrice(0)).toBe("$0.00");
  });

  it("works for negative numbers", () => {
    expect(getStandardPrice(-999)).toBe("-$9.99");
  });
});
