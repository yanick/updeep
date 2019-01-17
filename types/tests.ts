// TypeScript Version: 3.2.2

import u from "updeep";

// $ExpectType { banana: number; }
u.constant({ banana: 1 })('foo');

// $ExpectType { potato: number; }
u.freeze({ potato: 1 });

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


