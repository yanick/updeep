import map from "./map";
import _if from "./if";
import wrap from "./wrap";
import mapWhenElse from "./mapWhenElse";
import { MergedUpdate, Predicate } from "./types";

function mapWhen(predicate, update, target) {
  return mapWhenElse(predicate, update, (x) => x, target);
}

export interface MapWhen {
  <T, UW>(
    predicate: Predicate<T> | string | number | boolean | object,
    updateWhen: UW,
    target: T[]
  ): (MergedUpdate<UW, T> | T)[];
}

export default wrap(mapWhen) as MapWhen;
