interface CurriedReject {
    <C extends object>(predicate: any, collection: C): C extends any[] ? C : object;
    <C extends object>(predicate: any): (collection: C) => C extends any[] ? C : object;
}
declare const _default: CurriedReject;
export default _default;
