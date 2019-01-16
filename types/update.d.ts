export declare const omitted: (...args: any[]) => {
    __omitted: boolean;
};
declare const wrapped: import("lodash").CurriedFunction2<any, any, any>;
declare type WithAdditionalArgs = typeof wrapped & ((updates: any, object: any, ...args: any[]) => any);
declare const _default: WithAdditionalArgs;
export default _default;
