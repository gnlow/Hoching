import {
    BaseName,
    Dad,
    Mom,
    Sibling,
    Child,
} from "./names.ts"

export enum Tag {
    m = "m",
    f = "f",
    
    older = "older",
    younger = "younger",

    married = "married",
}

export type NameInfo = [BaseName, ...Tag[]]
export type NameAlias = () => NameInfo[]

export const 아빠: NameAlias = () => [[Dad, Tag.m]]
export const 엄마: NameAlias = () => [[Mom, Tag.f]]