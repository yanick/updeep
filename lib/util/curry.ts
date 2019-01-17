/* eslint no-shadow:0, no-param-reassign:0 prefer-rest-params:0 */
export const _ = "@@updeep/placeholder";

function countArguments(args: unknown[], max: number = 4) {
  let n = args.length;
  if (n > max) n = max;

  while (args[n - 1] === _) {
    n -= 1;
  }

  return n;
}

type AnyFunction = (...args: unknown[]) => unknown;

type InnerCurry1<R,A> = ( fn: ( a: A ) => R ) => ( a: A ) => R;

export function curry1<R, A extends any = any, B extends any = any, C extends any = any>(fn: (...args: [A, B?, C? ]) => R) {
  return function curried(...args: [ A?, B?, C? ]) {
    const n = countArguments(arguments as any);

    if (n >= 1) return (fn as any)(...args) as R;

    return curried;
  };
}

type Placeholder = "@@updeep/placeholder";

function isPlaceholder( x: any ): x is Placeholder {
    return x === _;
}

export function curry2<R, A extends any = any, B extends any = any, C extends any = any, D extends any = any>(
  fn: (...args: [A,B,C?,D?]) => R
) {
  return function curried(...args:[(A|Placeholder)?,B?,C?,D?]) {
    const n = countArguments(args, 2);

    const [ a,b,c,d ] = args;

    if ((b as any) === _ || (c as any) === _ || (d as any) === _) {
      throw new Error(
        "Can only use placeholder on first argument of this function."
      );
    }

    if (n >= 2) {
      if ( isPlaceholder(a) )
        return curry1((a: A, c?: C, d?: D) => fn(a as A, b as B, c as C, d as D));

      return fn(a as A, b as B, c as C, d as D);
    }

    if (n === 1) return curry1((b: B, c?: C, d?: D) => fn(a as A, b as B, c as C, d as D));

    return curried;
  };
}

export function curry3<A, B, C, D, R, E = any>(
  fn: (a: A, b: B, c: C, d: D, e?: E) => R
) {
  return function curried(a: A, b: B, c: C, ...args: [D, E?]) {
    const [d, e] = args;
    const n = countArguments(arguments as any, 3);

    if ((c as any) === _ || (d as any) === _ || (e as any) === _) {
      throw new Error(
        "Can only use placeholder on first or second argument of this function."
      );
    }

    if (n >= 3) {
      if ((a as any) === _) {
        if ((b as any) === _)
          return curry2((a: A, b: B, d: D, e?: E) => fn(a, b, c, d, e));
        return curry1((a: A, d: D, e?: E) => fn(a, b, c, d, e));
      }
      if ((b as any) === _)
        return curry1((b: B, d: D, e?: E) => fn(a, b, c, d, e));
      return fn(a, b, c, d, e);
    }

    if (n === 2) {
      if ((a as any) === _)
        return curry2((a: A, c: C, d: D, e?: E) => fn(a, b, c, d, e));
      return curry1((c: C, d: D, e?: E) => fn(a, b, c, d, e));
    }

    if (n === 1) return curry2((b: B, c: C, d: D, e?: E) => fn(a, b, c, d, e));

    return curried;
  };
}

export function curry4<R,A,B,C,D,E,F=any>(fn: ( a:A,b:B,c:C,d:D,e:E,f?:F) => R ) {
  return function curried(a:A, b:B, c:C, d:D, ...args: [E,F?]) {
    const [e, f] = args;
    const n = countArguments(arguments as any, 4);

    if (( d as any ) === _ || ( e as any ) === _ || ( f as any ) === _) {
      throw new Error(
        "Can only use placeholder on first, second or third argument of this function."
      );
    }

    if (n >= 4) {
      if (( a as any ) === _) {
        if (( b as any ) === _) {
          if (( c as any ) === _) return curry3((a:A, b:B, c:C, e:E, f?:F) => fn(a, b, c, d, e, f));
          return curry2((a:A, b:B, e:E, f?:F) => fn(a, b, c, d, e, f));
        }
        if (( c as any ) === _) return curry2((a:A, c:C, e:E, f?:F) => fn(a, b, c, d, e, f));
        return curry1((a:A, e:E, f?:F) => fn(a, b, c, d, e, f));
      }
      if (( b as any ) === _) {
        if (( c as any ) === _) return curry2((b:B, c:C, e:E, f?:F) => fn(a, b, c, d, e, f));
        return curry1((b:B, e:E, f?:F) => fn(a, b, c, d, e, f));
      }
      if (( c as any ) === _) return curry1((c:C, e:E, f?:F) => fn(a, b, c, d, e, f));
      return fn(a, b, c, d, e, f);
    }

    if (n === 3) {
      if (( a as any ) === _) {
        if (( b as any ) === _) return curry3((a:A, b:B, d:D, e:E, f?:F) => fn(a, b, c, d, e, f));
        return curry2((a:A, d:D, e:E, f?:F) => fn(a, b, c, d, e, f));
      }
      if (( b as any ) === _) return curry2((b:B, d:D, e:E, f?:F) => fn(a, b, c, d, e, f));
      return curry1((d:D, e:E, f?:F) => fn(a, b, c, d, e, f));
    }

    if (n === 2) {
      if (( a as any ) === _) return curry3((a:A, c:C, d:D, e:E, f?:F) => fn(a, b, c, d, e, f));
      return curry2((c:C, d:D, e:E, f?:F) => fn(a, b, c, d, e, f));
    }

    if (( n as any ) === 1) return curry3((b:B, c:C, d:D, e:E, f?:F) => fn(a, b, c, d, e, f));
    return curried;
  };
}

export default function curry(fn: (...args:any[] ) => any, length: 1|2|3|4|undefined ) {
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
