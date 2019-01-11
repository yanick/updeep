import constant from './constant'

describe('u.constant', () => {
  it('returns what it is given... constantly', () => {
    const func = constant(4)

    expect(func()).toEqual(4)
    expect(func('hi')).toEqual(4)
    expect(func('hi', 8)).toEqual(4)
    expect(func(4)).toEqual(4)
  })

  it('freezes the result', () => {
    expect(Object.isFrozen(constant({})())).toBeTruthy()
  })
})
