/* eslint no-shadow:0, no-param-reassign:0 prefer-rest-params:0 */
export const _ = "@@updeep/placeholder";

type Placeholder = "@@updeep/placeholder";

function isPlaceholder( x: any ): x is Placeholder {
    return x === _;
}

function countArguments(args: Array<unknown>, max: number = 4) {
  let n = args.length;
  if (n > max) n = max;

  while (args[n - 1] === _) {
    n -= 1;
  }

  return n;
}

interface SprawlingCurry<R,A extends any[]> {
    (...args: A): R;
    (): SprawlingCurry<R,A>
}

export function curry1<R,A>(fn: (a: A) => R): SprawlingCurry<R,[A]>;
export function curry1<R,A>(fn: (a: A, ...args: any) => R): SprawlingCurry<R,[A,...any[]]>;
export function curry1(fn: any): any {
  return function curried(a:any , ...args: any[]) {
    const [b, c] = args
    const n = countArguments(arguments as any)

    if (n >= 1) return fn(a, b, c)
    return curried
  }
}

export function curry2(fn:any ):any {
  return function curried(a:any, b:any, ...args: any[]) {
    const [c, d] = args
    const n = countArguments(arguments as any, 2)

    if (b === _ || c === _ || d === _) {
      throw new Error(
        'Can only use placeholder on first argument of this function.'
      )
    }

    if (n >= 2) {
      if (a === _) return curry1((a:any, c:any, d:any) => fn(a, b, c, d))
      return fn(a, b, c, d)
    }

    if (n === 1) return curry1((b:any, c:any, d:any) => fn(a, b, c, d))
    return curried
  }
}

export function curry3(fn:any): any {
  return function curried(a:any, b:any, c:any, ...args:any[]) {
    const [d, e] = args
    const n = countArguments(arguments as any, 3)

    if (c === _ || d === _ || e === _) {
      throw new Error(
        'Can only use placeholder on first or second argument of this function.'
      )
    }

    if (n >= 3) {
      if (a === _) {
        if (b === _) return curry2((a:any, b:any, d:any, e:any) => fn(a, b, c, d, e))
        return curry1((a:any, d:any, e:any) => fn(a, b, c, d, e))
      }
      if (b === _) return curry1((b:any, d:any, e:any) => fn(a, b, c, d, e))
      return fn(a, b, c, d, e)
    }

    if (n === 2) {
      if (a === _) return curry2((a:any, c:any, d:any, e:any) => fn(a, b, c, d, e))
      return curry1((c:any, d:any, e:any) => fn(a, b, c, d, e))
    }

    if (n === 1) return curry2((b:any, c:any, d:any, e:any) => fn(a, b, c, d, e))

    return curried
  }
}

export function curry4(fn:any): any {
  return function curried(a:any, b:any, c:any, d:any, ...args:any[]) {
    const [e, f] = args
    const n = countArguments(arguments as any, 4)

    if (d === _ || e === _ || f === _) {
      throw new Error(
        'Can only use placeholder on first, second or third argument of this function.'
      )
    }

    if (n >= 4) {
      if (a === _) {
        if (b === _) {
          if (c === _) return curry3((a:any, b:any, c:any, e:any, f:any) => fn(a, b, c, d, e, f))
          return curry2((a:any, b:any, e:any, f:any) => fn(a, b, c, d, e, f))
        }
        if (c === _) return curry2((a:any, c:any, e:any, f:any) => fn(a, b, c, d, e, f))
        return curry1((a:any, e:any, f:any) => fn(a, b, c, d, e, f))
      }
      if (b === _) {
        if (c === _) return curry2((b:any, c:any, e:any, f:any) => fn(a, b, c, d, e, f))
        return curry1((b:any, e:any, f:any) => fn(a, b, c, d, e, f))
      }
      if (c === _) return curry1((c:any, e:any, f:any) => fn(a, b, c, d, e, f))
      return fn(a, b, c, d, e, f)
    }

    if (n === 3) {
      if (a === _) {
        if (b === _) return curry3((a:any, b:any, d:any, e:any, f:any) => fn(a, b, c, d, e, f))
        return curry2((a:any, d:any, e:any, f:any) => fn(a, b, c, d, e, f))
      }
      if (b === _) return curry2((b:any, d:any, e:any, f:any) => fn(a, b, c, d, e, f))
      return curry1((d:any, e:any, f:any) => fn(a, b, c, d, e, f))
    }

    if (n === 2) {
      if (a === _) return curry3((a:any, c:any, d:any, e:any, f:any) => fn(a, b, c, d, e, f))
      return curry2((c:any, d:any, e:any, f:any) => fn(a, b, c, d, e, f))
    }

    if (n === 1) return curry3((b:any, c:any, d:any, e:any, f:any) => fn(a, b, c, d, e, f))
    return curried
  }
}

export default function curry(fn: (...args:any[] ) => any, length?: 1|2|3|4 ) {
    if(!length) {
        length = fn.length as 1|2|3|4;
    }

    switch(length) {
        case 1 : return curry1(fn);
        case 2 : return curry2(fn);
        case 3 : return curry3(fn);
        case 4 : return curry4(fn);
        default: return fn;
    }
}
