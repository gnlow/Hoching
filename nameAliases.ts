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

export interface NameInfo {
    baseName: BaseName
    tags: Tag[],
    age?: number,
}
export type NameAlias = (age?: number, ...param: any[]) => NameInfo

export const nameAliases: Record<string, NameAlias> = {
    아빠: (age?: number) => ({
        baseName: Dad,
        tags: [Tag.m],
        age,
    }),
    엄마: (age?: number) => ({
        baseName: Mom,
        tags: [Tag.f],
        age,
    }),
    형제자매: (age?: number, ...tags: Tag[]) => ({
        baseName: Sibling,
        tags,
        age,
    }),
    자녀: (age?: number, ...tags: Tag[]) => ({
        baseName: Child,
        tags,
        age,
    }),
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