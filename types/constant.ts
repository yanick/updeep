// TypeScript Version: 3.2.2
import u from "updeep";

// $ExpectType { banana: number; }
u.constant({ banana: 1 })('foo');

