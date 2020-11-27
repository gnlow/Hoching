enum Lang {
    ko = "Korean",
    en = "English",
}

export const KO = Lang.ko
export const EN = Lang.en

enum BaseName {
    Dad = "dad",
    Mom = "mom",
    Sibling = "sibling",
    Child = "child",
}

export const Dad = BaseName.Dad
export const Mom = BaseName.Mom
export const Sibling = BaseName.Sibling
export const Child = BaseName.Child

type NameOption = string | {
    default?: NameOption,

    // Special names - not yet implemented
    m?: NameOption,
    f?: NameOption,

    older?: NameOption,
    younger?: NameOption,

    forM?: NameOption,
    forF?: NameOption,

    married?: NameOption,
}

type Translation = {
    [P in Lang]?: NameOption
}


type Names = {
    [P in BaseName]?: Translation & Names
}

export const names: Names = {
    [Dad]: {
        [KO]: "아빠",
        [EN]: "father",

        [Dad]: {
            [KO]: "할아버지",
            [EN]: "grandfather",

            [Dad]: {
                [KO]: "증조할아버지",
                [EN]: "great-grandfather",
            },
            [Mom]: {
                [KO]: "증조할머니",
                [EN]: "great-grandmother",
            },
        },
        [Mom]: {
            [KO]: "할머니",
            [EN]: "grandmother",
        },
        [Sibling]: {
            [KO]: {
                default: "삼촌/고모",
                m: {
                    default: "삼촌",
                    married: {
                        older: "큰아빠",
                        younger: "작은아빠",
                    },
                },
                f: {
                    default: "고모",
                },
            },
            [EN]: "uncle",

            [Child]: {
                [KO]: {
                    default: "사촌",
                    older: {
                        m: {
                            forM: "사촌형",
                            forF: "사촌오빠",
                        },
                        f: {
                            forM: "사촌누나",
                            forF: "사촌언니",
                        },
                    },
                    younger: "사촌동생",
                },
                [EN]: "cousin",
            }
        },
    },
}