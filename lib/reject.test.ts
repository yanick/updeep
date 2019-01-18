import u from '../lib'

let r1 = u.reject(true, [1,2,3]); // $ExpectType number[]
let r2 = u.reject(true, {a:1}); // $ExpectType number[]
let r3 = u.reject(true, {a:1,b:"potato"}); // $ExpectType (string | number)[]

describe('u.reject', () => {
  it('can reject by index', () => {
    const result = u.reject((_: unknown, index: number) => index === 1, [3, 4, 5])

    expect(result).toEqual([3, 5])
  })

  it('can reject with callback shorthand', () => {
    const result = u.reject('bad', [{ bad: true }, { bad: false }])

    expect(result).toEqual([{ bad: false }])
  })

  it("returns the same instance if reject doesn't make changes", () => {
    const object = { foo: [1, 2, 3] }
    const result = u(
      {
        foo: u.reject((x:string) => x === 'Justin Bieber'),
      },
      object
    )

    expect(result).toEqual(object)
  })

  it('returns a different instance if reject makes changes', () => {
    const object = { foo: [1, 2, 3, 4] }
    const result = u(
      {
        foo: u.reject((x:number) => x === 4),
      },
      object
    )

    expect(result).not.toEqual(object)
  })

  it('freezes the result', () => {
    expect(Object.isFrozen(u.reject('a', []))).toBeTruthy()
  })

  it('works on objects too', () => {
      expect(
          u.reject('goner',{ a: {one:1}, b: { goner: true }, c: {two:2} })
      ).toEqual([
          {one:1},
          {two:2},
      ]);
  })
})
