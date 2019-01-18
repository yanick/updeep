// TypeScript Version: 3.2.2

import u from "updeep";

u.omitted('whatever'); // $ExpectType { __omitted: boolean; }

const obj = { this: 3 };

u(true, obj); // $ExpectType true
u(null, obj); // $ExpectType null
u(undefined, obj); // $ExpectType undefined
u("a specific string", obj); // $ExpectType "a specific string"

u(true)(obj); // $ExpectType true
u(null)(obj); // $ExpectType null
u(undefined)(obj); // $ExpectType undefined
u("a specific string")(obj); // $ExpectType "a specific string"

const aString = "a" + "b";

u(aString, obj); // $ExpectType string

u((i: number) => "foo" + i, 1); // $ExpecType string
u((i: number) => "foo" + i, "bar"); // $ExpectError

// update is object
u({ this: 2 }, true); // $ExpectType { this: number; }
u({ this: 2 })(true); // $ExpectType { this: number; }

u({ this: 2 }, { this: 3 }); // $ExpectType object
u({ this: 2 })({ that: 3 }); // $ExpectType object

u({ this: 2 })(true); // $ExpectType { this: number; }
u({ this: 2 })({ that: 3 }); // $ExpectType object


u.ifElse(false as boolean, { a: 1 }, { a: 2 }, { a: 3 }); // $ExpectType object
u.ifElse(false as boolean, "foo", 3, { a: 3 }); // $ExpectType string | number
u.ifElse(false, "foo", 3, { a: 3 }); // $ExpectType number
u.ifElse(true, "foo", 3, { a: 3 }); // $ExpectType string

// *** map ***
const inc = (i:number) => i+1;

u.map(inc, [1,2,3]); // $ExpectType number[]
u.map(inc, ["potato"]); // $ExpectType number[]
u.map({a:1},{a:2});  // $ExpectType Mapped<{ a: number; }, { a: number; }>

