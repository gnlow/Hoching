import Relation, {
    아빠,
    엄마,
    형제자매,
    자녀,

    남,
    여,

    기혼,
} from "../mod.ts"

const relation = new Relation(
    [
        아빠,
        형제자매(40, 남, 기혼)
    ]
)

console.log(relation.format())