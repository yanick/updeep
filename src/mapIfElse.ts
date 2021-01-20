import map from './map'
import _if from './if'
import wrap from './wrap'
import update from './update';

function mapIfElse(predicate, updateIf, updateElse, target) {
    if( typeof updateIf !== 'function' ) updateIf = update(updateIf);
    if( typeof updateElse !== 'function' ) updateElse = update(updateElse);

    const updated = map( _if( predicate, updateIf ), target );

    if( updated !== target ) return updated;

    return updateElse(target);
}

export default wrap(mapIfElse);
