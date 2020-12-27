import splitPath from './splitPath'

describe('splitPath', () => {
  it('treats a number as a single step path', () => {
    const path = 1
    const result = splitPath(path)
    expect(result).toEqual(['1'])
  })

  it('handles arrays', () => {
    const path = ['foo', 'bar', 'x']
    const result = splitPath(path)
    expect(result).toEqual(path)
  })

  it('handles strings separated by dots', () => {
    const path = 'bar.0.y'
    const result = splitPath(path)
    expect(result).toEqual(['bar', '0', 'y'])
  })
})
