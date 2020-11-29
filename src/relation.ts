import {
    NameOption,
    Translation,
    Names,
    names,
} from "./names.ts"

import {
    NameInfo,
    NameAlias,
    Tag,
} from "./nameAliases.ts"

type FormatInfo = {
    data: Translation & Names,
    tags: Tag[],
    age?: number,
    prev: Base,
}[]

interface Base {
    data?: Translation & Names,
    tags: Tag[],
    age?: number,
}

interface RelationOption {
    taggers?: ((item: FormatInfo[number], index: number, list: FormatInfo) => any)[]
    me?: Base
}

export default class Relation {
    readonly info: NameInfo[]
    taggers: ((item: FormatInfo[number], index: number, list: FormatInfo) => any)[]
    base: Base
    constructor(
        info: (NameAlias | NameInfo)[],
        option: RelationOption = {taggers: [], me: {tags: []}}
    ) {
        this.info = info.map(n => {
            if (typeof n == "function") {
                return n()
            } else {
                return n
            }
        })
        this.base = option.me || {tags: []}
        this.taggers = [
            /* 
                나->아빠->형제 ==
                나   ->  삼촌
                         ^^^ : item (현재 항목)
                    ^^^      : prev (직전 항목)
                ^^^          : l[i - 1] (묶은 이후의 직전 항목)
            */

            // `forM`, `forF` tagger
            ({tags}, i, l) => {
                if ((l[i - 1]?.tags || this.base.tags).includes(Tag.m)) {
                    tags.push(Tag.forM)
                } else if ((l[i - 1]?.tags || this.base.tags).includes(Tag.f)) {
                    tags.push(Tag.forF)
                }
            },
            // `older`, `younger` tagger
            ({tags, age}, i, l) => {
                const prevAge = l[i - 1]?.age || this.base.age
                if (age && prevAge) {
                    if (age > prevAge) {
                        tags.push(Tag.older)
                    } else if (age < prevAge) {
                        tags.push(Tag.younger)
                    }
                }
            },
            // `olderPrev`, `youngerPrev` tagger
            ({tags, age, prev}) => {
                const prevAge = prev.age || this.base.age
                if (age && prevAge) {
                    if (age > prevAge) {
                        tags.push(Tag.olderPrev)
                    } else if (age < prevAge) {
                        tags.push(Tag.youngerPrev)
                    }
                }
            },
            // Custom taggers
            ...(option.taggers || [])
        ]
    }
    format() {
        let result: FormatInfo = []
        let pointer: Names = names
        let prev: Base = {tags: []}
        let last: Base = {tags: []}
        for (let {baseName: name, tags, age} of this.info) {
            const next = pointer[name]
            if (next) {
                pointer = next
                prev = last
                last = {tags, age}
            } else {
                result.push({data: pointer, ...last, prev})
                pointer = names[name]
                prev = last
                last = {tags, age}
            }
        }
        result.push({data: pointer, ...last, prev})
        return result.map(({data, tags, age, prev}, i, l) => {
            const nameData = data.Korean as NameOption
            this.taggers.forEach(tagger => tagger({data, tags, age, prev}, i, l))
            const find = (nameData: NameOption, tags: Tag[]): string => {
                if (typeof nameData == "string") {
                    return nameData
                } else {
                    for (let tag of tags) {
                        if (nameData[tag]) {
                            return find(nameData[tag] as NameOption, tags)
                        }
                    }
                }
                return nameData.default as string
            }
            return find(nameData, tags) || (nameData as any /* NameOption, Not string */).default
        }).join("의 ")
    }
}