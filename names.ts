enum Lang {
    ko = "Korean",
    en = "English",
}

export const KO = Lang.ko
export const EN = Lang.en

export enum BaseName {
    Dad = "dad",
    Mom = "mom",
    Sibling = "sibling",
    Child = "child",
}

export const Dad = BaseName.Dad
export const Mom = BaseName.Mom
export const Sibling = BaseName.Sibling
export const Child = BaseName.Child

export type NameOption = string | {
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

export type Translation = {
    [P in Lang]?: NameOption
}


export type Names = {
    [P in BaseName]?: Translation & Names
}

export const names: Required<Names> = {
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
                f: "고모",
            },
            [EN]: {
                default: "uncle/aunt",
                m: "uncle",
                f: "aunt",
            },

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
    [Mom]: {
        [KO]: "엄마",
        [EN]: "mother",

        [Dad]: {
            [KO]: "외할아버지",
            [EN]: "grandfather",

            [Dad]: {
                [KO]: "외증조할아버지",
                [EN]: "great-grandfather",
            },
            [Mom]: {
                [KO]: "외증조할머니",
                [EN]: "great-grandmother",
            },
        },
        [Mom]: {
            [KO]: "외할머니",
            [EN]: "grandmother",
        },
        [Sibling]: {
            [KO]: {
                default: "외삼촌/이모",
                m: "외삼촌",
                f: "이모",
            },
            [EN]: {
                default: "uncle/aunt",
                m: "uncle",
                f: "aunt",
            },

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
    [Sibling]:{
        [KO]: {
            m: {
                default: "형제",
                older: {
                    default: "형/오빠",
                    forM: "형",
                    forF: "오빠",
                },
                younger: "남동생",
            },
            f: {
                default: "자매",
                older: {
                    default: "누나/언니",
                    forM: "누나",
                    forF: "언니",
                },
                younger: "여동생",
            },
        },
        [EN]: {
            default: "sibling",
            m: "brother",
            f: "sister",
        },

        [Child]: {
            [KO]: "조카",
            [EN]: {
                default: "nephew/niece",
                m: "nephew",
                f: "niece",
            },
        }
    },
    [Child]:{
        [KO]: {
            default: "자녀",
            m: "아들",
            f: "딸",
        },
        [EN]: {
            default: "child",
            m: "son",
            f: "daughter",
        },
        
        [Child]: {
            [KO]: {
                default: "손주",
                m: "손자",
                f: "손녀",
            },
            [EN]: {
                default: "grandchild",
                m: "grandson",
                f: "granddaughter",
            },

            [Child]: {
                [KO]: {
                    default: "증손주",
                    m: "증손자",
                    f: "증손녀",
                },
                [EN]: {
                    default: "great-grandchild",
                    m: "great-grandson",
                    f: "great-granddaughter"
                },
            }
        }
    }
}