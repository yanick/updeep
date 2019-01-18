import _ = require('lodash');
import { ReturningFunction } from './types';
export default function wrap<F extends ReturningFunction, N extends number>(func: F, l?: N): _.CurriedFunction1<any, any>;
