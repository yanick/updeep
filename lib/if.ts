import ifElse from './ifElse'
import curry from './util/curry'
import { Source, Predicate, Updates, MergedUpdate, TruePredicate, FalsePredicate } from './types';

export function uIf<TU,O>(predicate: FalsePredicate<O>, trueUpdates: TU, object: O):O;
export function uIf<TU,O>(predicate: TruePredicate<O>, trueUpdates: TU, object: O):MergedUpdate<TU,O>;
export function uIf<TU,O>(predicate: Predicate<O>, trueUpdates: TU, object: O):MergedUpdate<TU,O>|O{
    return ifElse(predicate, trueUpdates, (x: any) => x, object)
}

interface CurriedIf {
<TU,O>(predicate: TruePredicate<O>, trueUpdates: TU, object: O):MergedUpdate<TU,O>;
<TU,O>(predicate: FalsePredicate<O>, trueUpdates: TU, object: O):O;
<TU,O>(predicate: Predicate<O>, trueUpdates: TU, object: O):MergedUpdate<TU,O>|O;

<TU,O>(predicate: TruePredicate<O>, trueUpdates: TU): (object: O) => MergedUpdate<TU,O>;
<TU,O>(predicate: FalsePredicate<O>, trueUpdates: TU): (object: O) => O;
<TU,O>(predicate: Predicate<O>, trueUpdates: TU): (object: O) => MergedUpdate<TU,O>|O;

}

export default curry(uIf) as CurriedIf;
