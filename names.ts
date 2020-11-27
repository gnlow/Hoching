enum Lang {
    ko = "Korean",
    en = "English",
}

enum BaseName {
    Dad,
    Mom,
    Sibling,
    Child,
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
    [P in BaseName]?: {
        name: Translation,
        nodes?: Names,
    }
}

export const names: Names = {
    [Dad]: {
        name: {
            [Lang.ko]: "아빠",
            [Lang.en]: "father",
        },
        nodes: {
            [Dad]: {
                name: {
                    [Lang.ko]: "할아버지",
                    [Lang.en]: "grandfather",
                },
                nodes: {
                    [Dad]: {
                        name: {
                            [Lang.ko]: "증조할아버지",
                            [Lang.en]: "great-grandfather",
                        }
                    },
                    [Mom]: {
                        name: {
                            [Lang.ko]: "증조할머니",
                            [Lang.en]: "great-grandmother",
                        }
                    },
                }
            },
            [Mom]: {
                name: {
                    [Lang.ko]: "할머니",
                    [Lang.en]: "grandmother",
                }
            },
            [Sibling]: {
                name: {
                    [Lang.ko]: {
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
                    [Lang.en]: "uncle",
                },
                nodes: {
                    [Child]: {
                        name: {
                            [Lang.ko]: {
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
                            [Lang.en]: "cousin",
                        }
                    }
                }
            },
        }
    },
}