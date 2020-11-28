import {
    Translation,
    Names,
    names,
} from "./names.ts"

import {
    NameInfo,
    NameAlias,
    아빠,
    엄마,
} from "./nameAliases.ts"

class Relation {
    readonly info: NameInfo[]
    constructor(info: NameInfo[][]) {
        this.info = info.flat()
    }
    format() {
        let result: (Translation & Names)[] = []
        let pointer: Names = names
        for (let nameInfo of this.info) {
            const next = pointer[nameInfo[0]]
            if (next) {
                pointer = next
            } else {
                result.push(pointer)
                pointer = names[nameInfo[0]]
            }
        }
        result.push(pointer)
        console.log(result)
        return result.map(x => x.Korean).join("의 ")
    }
}

const rel = new Relation([아빠()])
console.log(rel.format())