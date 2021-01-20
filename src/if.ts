import ifElse from "./ifElse";
import curry from "./util/curry";
import {
  FalsePredicate,
  MergedUpdate,
  Predicate,
  TruePredicate,
} from "./types";

export interface CurriedIf {
  <TU, O>(
    predicate: TruePredicate<O> | true,
    trueUpdates: TU,
    object: O
  ): MergedUpdate<TU, O>;
  <TU, O>(predicate: FalsePredicate<O> | false, trueUpdates: TU, object: O): O;
  <TU, O>(
    predicate: Predicate<O> | string | object | boolean | number,
    trueUpdates: TU,
    object: O
  ): MergedUpdate<TU, O> | O;

  <TU, O>(predicate: TruePredicate<O> | true, trueUpdates: TU): (
    object: O
  ) => MergedUpdate<TU, O>;
  <TU, O>(predicate: FalsePredicate<O> | false, trueUpdates: TU): (
    object: O
  ) => O;
  <TU, O>(
    predicate: Predicate<O> | string | object | boolean | number,
    trueUpdates: TU
  ): (object: O) => MergedUpdate<TU, O> | O;

  <TU, O>(predicate: TruePredicate<O> | true): (
    trueUpdates: TU
  ) => (object: O) => MergedUpdate<TU, O>;
  <TU, O>(predicate: FalsePredicate<O> | false): (
    trueUpdates: TU
  ) => (object: O) => O;

  <TU, O>(predicate: Predicate<O> | string | object | boolean | number): (
    trueUpdates: TU
  ) => (object: O) => MergedUpdate<TU, O> | O;
}

export default curry((predicate, trueUpdates, object) =>
  ifElse(predicate, trueUpdates, (x: unknown) => x, object)
) as CurriedIf;
