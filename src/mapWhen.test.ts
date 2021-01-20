import mapWhen from "./mapWhen";
import mapWhenElse from "./mapWhenElse";

describe("u.mapWhen", () => {
  it("basic case", () => {
    expect(mapWhen((x) => x === 2, 7, [1, 2, 3])).toEqual([1, 7, 3]);
  });
});

describe("u.mapWhenElse", () => {
  it("basic case", () => {
    expect(
      mapWhenElse(
        (x) => x === 2,
        7,
        (x) => x,
        [1, 2, 3]
      )
    ).toEqual([1, 7, 3]);

    expect(
      mapWhenElse(
        (x) => x === 5,
        7,
        (x) => [...x, 4],
        [1, 2, 3]
      )
    ).toEqual([1, 2, 3, 4]);
  });

  it("If matched but didn't change", () => {
    expect(
      mapWhenElse(
        (x) => x === 2,
        2,
        (x) => [...x, 9],
        [1, 2, 3]
      )
    ).toEqual([1, 2, 3]);
  });
});
