import update from './update'
import curry from './util/curry'
import { UpdateReturnType, MergedUpdate } from './types';

function withDefault<D,U,O>(defaultValue: D,updates: U, object: O): MergedUpdate<U,O extends null|undefined ? D : O>;
function withDefault(defaultValue: any, updates: any, object: any):any {
  if (typeof object === 'undefined') {
    return update(updates, defaultValue)
  }

  return update(updates, object)
}

interface CurriedWithDefault {
    <D,U,O  extends any>(defaultValue: D,updates: U, object: O): MergedUpdate<U,O extends null|undefined ? D : O>;
    <D,U>(defaultValue: D, updates: U ): <O>( obj: O) => MergedUpdate<U,O extends null|undefined ? D : O>;
}

export default curry(withDefault) as CurriedWithDefault;
