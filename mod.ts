import {
    NameOption,
    Translation,
    Names,
    names,
    Sibling,
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
    constructor(info: NameInfo[][]) {
        this.info = info.flat()
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
                result.push({data: pointer, tags})
                pointer = names[name]
                lastTags = tags
            }
        }
        result.push({data: pointer, tags: lastTags})
        return result.map(({data, tags}) => {
            const nameData = data.Korean as NameOption
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

const rel = new Relation([아빠(),[[Sibling, Tag.m, Tag.married, Tag.younger]]])
console.log(rel.format()) // 작은아빠