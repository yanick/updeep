export type PathPart = number | string

export type Path = PathPart | PathPart[]

export type MergedUpdate<U,O> =
    O extends object ?  ( UpdateReturnType<U> extends object ? object : UpdateReturnType<U> ):
    UpdateReturnType<U>;

export type UpdateReturnMap<T> = { [ K in keyof T]: UpdateReturnType<T[K]> };

export type UpdateReturnType<U> =
        U extends (object: any) => any ? ReturnType<U>
        : U extends object ? UpdateReturnMap<U>
        : U;
