export declare function omitBy<C extends object, P extends (...args: any[]) => boolean>(predicate: P, collection: C): import("lodash").Dictionary<any>;
interface CurriedOmitBy {
    <C extends object, P extends (...args: any[]) => boolean>(predicate: P, collection: C): object;
    <C extends object, P extends (...args: any[]) => boolean>(predicate: P): (collection: C) => object;
}
declare const _default: CurriedOmitBy;
export default _default;
