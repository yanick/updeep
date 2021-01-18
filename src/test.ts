import u from '.'

describe('u.constant', () => {
  test('returns what it is given... constantly', () => {
    const func: any = u.constant(4)
    expect(func()).toEqual(4)
  })
})
