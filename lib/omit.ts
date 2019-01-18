import _omit from 'lodash/omit'
import curry from './util/curry'
import freeze from './freeze'

function omit(predicate: string[]|string, collection: object): object {
  return freeze(_omit(collection, predicate))
}

interface CurriedOmit {
    (predicate: string[]|string, collection: object): object;
    (predicate: string[]|string ): (collection: object) => object;
}

export default curry(omit) as CurriedOmit;
