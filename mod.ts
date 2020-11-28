import {
    NameOption,
    Translation,
    Names,
    names,
    Sibling,
    Child,
} from "./names.ts"

import {
    NameInfo,
    Tag,
    아빠,
    엄마,
} from "./nameAliases.ts"

type FormatInfo = {
    data: Translation & Names,
    tags: Tag[],
}[]

class Relation {
    readonly info: NameInfo[]
    taggers: ((item: FormatInfo[number], index: number, list: FormatInfo) => any)[]
    constructor(
        info: NameInfo[][],
        taggers
            : ((item: FormatInfo[number], index: number, list: FormatInfo) => any)[]
            = []
    ) {
        this.info = info.flat()
        this.taggers = [
            // `forM`, `forF` tagger
            ({tags}, i, l) => {
                if (l[i - 1]) {
                    tags.push(
                        l[i - 1].tags.includes(Tag.m) 
                            ? Tag.forM
                            : Tag.forF
                    )
                }
            },
            // Custom taggers
            ...taggers
        ]
    }
    format() {
        let result: FormatInfo = []
        let pointer: Names = names
        let lastTags: Tag[] = []
        for (let [name, ...tags] of this.info) {
            const next = pointer[name]
            if (next) {
                pointer = next
                lastTags = tags
            } else {
                result.push({data: pointer, tags: lastTags})
                pointer = names[name]
                lastTags = tags
            }
        }
        result.push({data: pointer, tags: lastTags})
        return result.map(({data, tags}, i, l) => {
            const nameData = data.Korean as NameOption
            this.taggers.forEach(tagger => tagger({data, tags}, i, l))
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

const rel = new Relation(
    [아빠(), 아빠(), 엄마(), 아빠(), [[Sibling, Tag.m, Tag.married, Tag.younger]], [[Child, Tag.f, Tag.older]]]
)
console.log(rel.format()) // 증조할머니의 사촌언니