import { Predicate, Updates, Source } from './types';
export declare function updateIfElse<S extends Source>(predicate: Predicate<S>, trueUpdates: Updates, falseUpdates: Updates, object: S): any;
declare const _default: (...args: any[]) => any;
export default _default;
