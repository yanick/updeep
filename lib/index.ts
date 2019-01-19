import {constant} from './constant'
import freeze from './freeze'
import is from './is'
import _if from './if'
import ifElse from './ifElse'
import map from './map'
import omit from './omit'
import omitBy from './omitBy'
import reject from './reject'
import update, { omitted } from './update'
import updateIn from './updateIn'
import withDefault from './withDefault'
import curry, { _ as placeholder } from './util/curry'

const u :{
    omit: typeof omit,
    omitBy: typeof omitBy,
    constant: typeof constant,
    freeze: typeof freeze,
    is: typeof is,
    update: typeof update,
    updateIn: typeof updateIn,
    reject: typeof reject,
    map: typeof map,
    withDefault: typeof withDefault,
    ifElse: typeof ifElse,
    if: typeof _if,
     omitted: typeof omitted,
     _: typeof placeholder,
} & typeof update  = update as any

u._ = placeholder
u.constant = constant
u.if = _if
u.ifElse = ifElse
u.is = is
u.freeze = freeze
u.map = map
u.omit = omit
u.omitBy = omitBy
u.reject = reject
u.update = update
u.updateIn = updateIn
u.omitted = omitted
u.withDefault = withDefault

export default u
