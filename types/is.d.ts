import { Source, Path } from './types';
declare type Predicate = any;
export declare function is(path: Path, predicate: Predicate, object: Source): boolean;
declare const _default: import("lodash").CurriedFunction3<Path, any, any, boolean>;
export default _default;
