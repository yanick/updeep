export type Updates = any

export type Source = any

export type PathPart = number | string

export type Path = PathPart | PathPart[]

export type Predicate<S extends Source = Source> = boolean | ( (arg: S) => boolean )
