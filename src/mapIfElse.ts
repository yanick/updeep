import map from './map'
import _if from './if'
import wrap from './wrap'
import update from './update'

function mapIfElse(predicate, updateIf, updateElse, target) {
  if (typeof updateIf !== 'function') updateIf = update(updateIf)
  if (typeof updateElse !== 'function') updateElse = update(updateElse)

  let found = false
  const updated = map(
    _if(predicate, (target) => {
      found = true
      return updateIf(target)
    }),
    target
  )

  return found ? updated : updateElse(target)
}

export default wrap(mapIfElse)
