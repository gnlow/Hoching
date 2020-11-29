import Relation, {
    아빠,
    엄마,
    형제자매,
    자녀,
    나,

    남,
    여,

    기혼,
} from "../mod.ts"

const relation = new Relation(
    [
        아빠(38),
        형제자매(40, 남, 기혼),
        자녀(7, 여)
    ],
    {
        me: 나(5, 남)
    }
)

console.log(relation.format())