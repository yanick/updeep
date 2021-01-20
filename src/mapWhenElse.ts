import map from "./map";
import _if from "./if";
import wrap from "./wrap";
import update from "./update";
import { MergedUpdate, Predicate } from "./types";

function mapWhenElse(predicate, updateWhen, updateElse, target) {
  if (typeof updateWhen !== "function") updateWhen = update(updateWhen);
  if (typeof updateElse !== "function") updateElse = update(updateElse);

  let found = false;
  const updated = map(
    _if(predicate, (target) => {
      found = true;
      return updateWhen(target);
    }),
    target
  );

  return found ? updated : updateElse(target);
}

export interface MapWhenElse {
  <T, UW, UE>(
    predicate: Predicate<T> | string | number | boolean | object,
    updateWhen: UW,
    updateElse: UE,
    target: T[]
  ): MergedUpdate<UW, T>[] | MergedUpdate<UE, T>;

  <T, UW, UE>(
    predicate: Predicate<T> | string | number | boolean | object,
    updateWhen: UW,
    updateElse: UE
  ): (target: T) => MergedUpdate<UW, T>[] | MergedUpdate<UE, T>;

  <T, UW, UE>(
    predicate: Predicate<T> | string | number | boolean | object,
    updateWhen: UW
  ): (
    updateElse: UE
  ) => (target: T) => MergedUpdate<UW, T>[] | MergedUpdate<UE, T>;

  <T, UW, UE>(predicate: Predicate<T> | string | number | boolean | object): (
    updateWhen: UW
  ) => (
    updateElse: UE
  ) => (target: T) => MergedUpdate<UW, T>[] | MergedUpdate<UE, T>;
}

export default wrap(mapWhenElse) as MapWhenElse;
