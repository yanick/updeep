import {MergedUpdate} from './types';
import update from './update'
import curry from './util/curry'

function withDefault(defaultValue, updates, object) {
  if (typeof object === 'undefined') {
    return update(updates, defaultValue)
  }

  return update(updates, object)
}

export interface CurriedWithDefault {
    <D,U,O  extends any>(defaultValue: D,updates: U, object: O): MergedUpdate<U,O extends null|undefined ? D : O>;
    <D,U>(defaultValue: D, updates: U ): <O>( obj: O) => MergedUpdate<U,O extends null|undefined ? D : O>;
}

export default curry(withDefault) as CurriedWithDefault;
