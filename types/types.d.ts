export declare type Updates = any;
export declare type Source = any;
export declare type PathPart = number | string;
export declare type Path = PathPart | PathPart[];
export declare type Predicate<S extends Source = Source> = boolean | ((arg: S) => boolean);
