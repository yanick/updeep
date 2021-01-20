import {FalsePredicate, MergedUpdate, Predicate, TruePredicate} from './types'
import update from './update'
import wrap from './wrap'
import match from 'lodash/isMatch'
import isPlainObject from 'lodash/isPlainObject'

function updateIfElse(predicate, trueUpdates, falseUpdates, object) {
  const test =
    typeof predicate === 'function'
      ? predicate(object)
      : isPlainObject(predicate)
      ? match(object, predicate)
      : predicate

  const updates = test ? trueUpdates : falseUpdates

  return update(updates, object)
}

export interface CurriedIfElse {
  <S, TU, FU>(
    predicate: TruePredicate<S>,
    trueUpdates: TU,
    falseUpdates: FU,
    object: S
  ): MergedUpdate<TU, S>
  <S, TU, FU>(
    predicate: FalsePredicate<S>,
    trueUpdates: TU,
    falseUpdates: FU,
    object: S
  ): MergedUpdate<FU, S>
  <S, TU, FU>(
    predicate: Predicate<S>,
    trueUpdates: TU,
    falseUpdates: FU,
    object: S
  ): MergedUpdate<TU, S> | MergedUpdate<FU, S>

  <S, TU, FU>(predicate: TruePredicate<S>, trueUpdates: TU, falseUpdates: FU): (
    object: S
  ) => MergedUpdate<TU, S>
  <S, TU, FU>(
    predicate: FalsePredicate<S>,
    trueUpdates: TU,
    falseUpdates: FU
  ): (object: S) => MergedUpdate<FU, S>
  <S, TU, FU>(predicate: Predicate<S>, trueUpdates: TU, falseUpdates: FU): (
    object: S
  ) => MergedUpdate<TU, S> | MergedUpdate<FU, S>
}

export default wrap(updateIfElse) as CurriedIfElse
