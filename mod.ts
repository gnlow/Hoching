import {
    Translation,
    Names,
    names,
    BaseName,
    Dad,
    Mom,
    Sibling,
    Child,
} from "./names.ts"

class Relation {
    readonly info: BaseName[]
    constructor(info: BaseName[]) {
        this.info = info
    }
    format() {
        let result: (Translation & Names)[] = []
        let pointer: Names = names
        for (let name of this.info) {
            const next = pointer[name]
            if (next) {
                pointer = next
            } else {
                result.push(pointer)
                pointer = names[name]
            }
        }
        result.push(pointer)
        return result.map(x => x.Korean).join("의 ")
    }
}

const rel = new Relation([Dad, Mom, Dad, Dad, Dad])
console.log(rel.format()) // 할머니의 증조할아버지