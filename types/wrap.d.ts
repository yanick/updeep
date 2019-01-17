import _ = require('lodash');
declare type ReturningFunction = (...args: any[]) => any;
export default function wrap<F extends ReturningFunction, N extends number>(func: F, l?: N): _.CurriedFunction1<any, any>;
export {};
