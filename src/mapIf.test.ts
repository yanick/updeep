import mapIf from './mapIf'
import mapIfElse from './mapIfElse'

describe('u.mapIf', () => {
  it('basic case', () => {
      expect(
        mapIf( x => x === 2, 7, [1,2,3])
      ).toEqual([1,7,3]);
  })
})

describe('u.mapIfElse', () => {
  it('basic case', () => {
      expect(
        mapIfElse( x => x === 2, 7, x => x, [1,2,3])
      ).toEqual([1,7,3]);

      expect(
        mapIfElse( x => x === 5, 7, x => [...x,4], [1,2,3])
      ).toEqual([1,2,3,4]);
  })
})
