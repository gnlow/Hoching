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
    NameAlias,
    Tag,
    아빠,
    엄마,
    형제자매,
    자녀,
    남,
    여,
    연상,
    연하,
    기혼,
} from "./nameAliases.ts"

type FormatInfo = {
    data: Translation & Names,
    tags: Tag[],
}[]

interface RelationOption {
    taggers?: ((item: FormatInfo[number], index: number, list: FormatInfo) => any)[]
    me?: Tag[]
}

class Relation {
    readonly info: NameInfo[]
    taggers: ((item: FormatInfo[number], index: number, list: FormatInfo) => any)[]
    baseTags: Tag[]
    constructor(
        info: (NameAlias | NameInfo)[],
        option: RelationOption = {taggers: [], me: []}
    ) {
        this.info = info.map(n => {
            if (typeof n == "function") {
                return n()
            } else {
                return n
            }
        })
        this.baseTags = option.me || []
        this.taggers = [
            // `forM`, `forF` tagger
            ({tags}, i, l) => {
                if ((l[i - 1]?.tags || this.baseTags).includes(Tag.m)) {
                    tags.push(Tag.forM)
                } else if ((l[i - 1]?.tags || this.baseTags).includes(Tag.f)) {
                    tags.push(Tag.forF)
                }
            },
            // Custom taggers
            ...(option.taggers || [])
        ]
    }
    format() {
        let result: FormatInfo = []
        let pointer: Names = names
        let lastTags: Tag[] = []
        for (let {baseName: name, tags} of this.info) {
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
    [
        아빠,
        형제자매 (여, 연상),
        자녀 (남, 연상)
    ],
    {me: [여]}
)
console.log(rel.format()) // 사촌오빠