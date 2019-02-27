// TypeScript Version: 3.2.2
import u from "updeep";

const inc = (i: number) => i + 1;

u.map(inc, [1, 2, 3]); // $ExpectType number[]
u.map(inc, ["potato"] ); // $ExpectError
u.map({ a: 1 }, { a: 2 }); // $ExpectType Mapped<{ a: number; }, { a: number; }>
