import map from './map'
import _if from './if'
import wrap from './wrap'
import mapIfElse from './mapIfElse';

function mapIf(predicate, update, target) {
    return mapIfElse( predicate, update, x => x, target );
}

export default wrap(mapIf);
