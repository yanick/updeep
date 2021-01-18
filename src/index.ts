import constant from './constant'
import freeze from './freeze'
import is from './is'
import _if from './if'
import ifElse from './ifElse'
import map from './map'
import omit from './omit'
import omitBy from './omitBy'
import reject from './reject'
import update, {omitted} from './update'
import updateIn from './updateIn'
import withDefault from './withDefault'
import {_} from './util/curry'

const methods = {
  constant,
  is,
  map,
  omit,
  omitBy,
  ifElse,
  if: _if,
  update,
  updateIn,
  withDefault,
  reject,
  omitted,
  _,
}

export type Updeep = typeof update & typeof methods

const u: Updeep = update as Updeep

Object.assign(u, methods)

export default u
