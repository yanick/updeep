import update from './update'
import curry from './util/curry';
import { Predicate, Updates, Source, MergedUpdate } from './types';

type TruePredicate<S=any> = true | ( (a: S) => true )
type FalsePredicate<S=any> = false | ( (a: S) => false )

export function updateIfElse<S,TU,FU>(predicate: TruePredicate<S>, trueUpdates: TU, falseUpdates: FU, object: S): MergedUpdate<TU,S>;
export function updateIfElse<S,TU,FU>(predicate: FalsePredicate<S>, trueUpdates: TU, falseUpdates: FU, object: S): MergedUpdate<FU,S>;
export function updateIfElse<S,TU,FU>(predicate: Predicate<S>, trueUpdates: TU, falseUpdates: FU, object: S): MergedUpdate<TU,S> | MergedUpdate<FU,S> {
  const test = typeof predicate === 'function' ? predicate(object) : predicate

  const updates = test ? trueUpdates : falseUpdates

  return update(updates, object)
}

interface CurriedIfElse {
    <S,TU,FU>(predicate: TruePredicate<S>, trueUpdates: TU, falseUpdates: FU, object: S): MergedUpdate<TU,S>;
    <S,TU,FU>(predicate: FalsePredicate<S>, trueUpdates: TU, falseUpdates: FU, object: S): MergedUpdate<FU,S>;
    <S,TU,FU>(predicate: Predicate<S>, trueUpdates: TU, falseUpdates: FU, object: S): MergedUpdate<TU,S> | MergedUpdate<FU,S>;

    <S,TU,FU>(predicate: TruePredicate<S>, trueUpdates: TU, falseUpdates: FU): ( object: S) => MergedUpdate<TU,S>;
    <S,TU,FU>(predicate: FalsePredicate<S>, trueUpdates: TU, falseUpdates: FU):( object: S) => MergedUpdate<FU,S>;
    <S,TU,FU>(predicate: Predicate<S>, trueUpdates: TU, falseUpdates: FU): (object: S) => MergedUpdate<TU,S> | MergedUpdate<FU,S>;
}

export default curry(updateIfElse) as CurriedIfElse;
