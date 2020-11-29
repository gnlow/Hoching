import Relation, {
    아빠,
    형제자매,
    자녀,
    나,
    남,
    여,
    KO,
    EN,
} from "../mod.ts"

const relation = new Relation(
    [
        아빠(55),
        형제자매(59, 남),
        자녀(29, 여),
        자녀(2, 여)
    ],
    {
        me: 나(24, 남)
    }
)

console.log(relation.format(KO)) // 사촌누나의 딸
console.log(relation.format(EN)) // cousin's daughter