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

    forM = "forM",
    forF = "forF",

    married = "married",
}

export type NameInfo = [BaseName, ...Tag[]]
export type NameAlias = (...param: any[]) => NameInfo[]

export const nameAliases: Record<string, NameAlias> = {
    아빠: () => [[Dad, Tag.m]],
    엄마: () => [[Mom, Tag.f]],
    형제자매: (...tags: Tag[]) => [[Sibling, ...tags]],
    자녀: (...tags: Tag[]) => [[Child, ...tags]],
}

export const 남 = Tag.m
export const 여 = Tag.f
export const 연상 = Tag.older
export const 연하 = Tag.younger
export const 기혼 = Tag.married

export const 아빠 = nameAliases.아빠
export const 엄마 = nameAliases.엄마
export const 형제자매 = nameAliases.형제자매
export const 자녀 = nameAliases.자녀