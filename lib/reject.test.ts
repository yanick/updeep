import u from '../lib'

describe('u.reject', () => {
  it('can reject by index', () => {
    const result = u.reject((_: unknown, index: number) => index === 1, [3, 4, 5])

    expect(result).to.eql([3, 5])
  })

  it('can reject with callback shorthand', () => {
    const result = u.reject('bad', [{ bad: true }, { bad: false }])

    expect(result).to.eql([{ bad: false }])
  })

  it("returns the same instance if reject doesn't make changes", () => {
    const object = { foo: [1, 2, 3] }
    const result = u(
      {
        foo: u.reject((x:string) => x === 'Justin Bieber'),
      },
      object
    )

    expect(result).to.equal(object)
  })

  it('returns a different instance if reject makes changes', () => {
    const object = { foo: [1, 2, 3, 4] }
    const result = u(
      {
        foo: u.reject((x:number) => x === 4),
      },
      object
    )

    expect(result).to.not.equal(object)
  })

  it('freezes the result', () => {
    expect(Object.isFrozen(u.reject('a', []))).to.be.true
  })
})
