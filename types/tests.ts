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
u((i: number) => "foo" + i, "bar");

// update is object
u({ this: 2 }, true); // $ExpectType UpdateReturnMap<{ this: number; }>
u({ this: 2 })(true); // $ExpectType UpdateReturnMap<{ this: number; }>

u({ this: 2 }, { this: 3 }); // $ExpectType object
u({ this: 2 })({ that: 3 }); // $ExpectType object

u({ this: 2 })(true); // UpdateReturnMap<{ this: number; }>
u({ this: 2 })({ that: 3 }); // $ExpectType object


u.ifElse(false as boolean, { a: 1 }, { a: 2 }, { a: 3 }); // $ExpectType object
u.ifElse(false as boolean, "foo", 3, { a: 3 }); // $ExpectType string | number
u.ifElse(false, "foo", 3, { a: 3 }); // $ExpectType number
u.ifElse(true, "foo", 3, { a: 3 }); // $ExpectType string

u.omit('bar', { }); // $ExpectType object
u.omit(['bar'], { }); // $ExpectType object

u.omitBy([ 'banana' ], { } ); // $ExpectError

// *** constant ***

// $ExpectType { banana: number; }
u.constant({ banana: 1 })('foo');

/// *** freeze ***

// $ExpectType { potato: number; }
u.freeze({ potato: 1 });
