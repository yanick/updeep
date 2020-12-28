import ifElse from './ifElse'
import curry from './util/curry'
import {FalsePredicate, MergedUpdate, Predicate, TruePredicate} from './types'

export interface CurriedIf {
<TU,O>(predicate: TruePredicate<O>, trueUpdates: TU, object: O):MergedUpdate<TU,O>;
<TU,O>(predicate: FalsePredicate<O>, trueUpdates: TU, object: O):O;
<TU,O>(predicate: Predicate<O>, trueUpdates: TU, object: O):MergedUpdate<TU,O>|O;

<TU,O>(predicate: TruePredicate<O>, trueUpdates: TU): (object: O) => MergedUpdate<TU,O>;
<TU,O>(predicate: FalsePredicate<O>, trueUpdates: TU): (object: O) => O;
<TU,O>(predicate: Predicate<O>, trueUpdates: TU): (object: O) => MergedUpdate<TU,O>|O;

}

export default curry((predicate, trueUpdates, object) =>
  ifElse(predicate, trueUpdates, (x) => x, object)
) as CurriedIf
