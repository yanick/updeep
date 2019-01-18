import _omitBy = require("lodash/omitBy");
import curry from "./util/curry";

export function omitBy<C extends object, P extends (...args: any[]) => boolean>(
  predicate: P,
  collection: C
): object {
  return _omitBy(collection, predicate);
}

interface CurriedOmitBy {
  <C extends object, P extends (...args: any[]) => boolean>(
    predicate: P,
    collection: C
  ): object;
  <C extends object, P extends (...args: any[]) => boolean>(predicate: P): (
    collection: C
  ) => object;
}

export default curry(omitBy) as CurriedOmitBy;
