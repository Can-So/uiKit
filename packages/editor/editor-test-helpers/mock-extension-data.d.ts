export declare const inlineExtensionData: ({
    type: "inlineExtension" | "extension" | "bodiedExtension";
    attrs: {
        extensionType: string;
        extensionKey: string;
        parameters: {
            macroParams: {
                color: {
                    value: string;
                };
                title: {
                    value: string;
                };
                subtle: {
                    value: boolean;
                };
            };
            macroMetadata: {
                macroId: {
                    value: number;
                };
                schemaVersion: {
                    value: string;
                };
                placeholder: {
                    data: {
                        width: number;
                        height: number;
                        url: string;
                    };
                    type: string;
                }[];
            };
        };
    };
} | {
    type: "inlineExtension" | "extension" | "bodiedExtension";
    attrs: {
        extensionType: string;
        extensionKey: string;
        parameters: {
            macroParams: {
                color: {
                    value: string;
                };
                title: {
                    value: string;
                };
                subtle: {
                    value: boolean;
                };
            };
            macroMetadata: {
                macroId: {
                    value: number;
                };
                schemaVersion: {
                    value: string;
                };
                placeholder: {
                    data: {
                        url: string;
                    };
                    type: string;
                }[];
            };
        };
    };
} | {
    type: "inlineExtension" | "extension" | "bodiedExtension";
    attrs: {
        extensionType: string;
        extensionKey: string;
        parameters: {
            macroParams: {
                color: {
                    value: string;
                };
                title: {
                    value: string;
                };
                subtle: {
                    value: boolean;
                };
            };
            macroMetadata: {
                macroId: {
                    value: number;
                };
                placeholder: {
                    data: {
                        url: string;
                    };
                    type: string;
                }[];
                schemaVersion?: undefined;
            };
        };
    };
})[];
export declare const extensionData: {
    type: "inlineExtension" | "extension" | "bodiedExtension";
    attrs: {
        extensionType: string;
        extensionKey: string;
        parameters: {
            macroParams: {
                color: {
                    value: string;
                };
            };
            macroMetadata: {
                macroId: {
                    value: number;
                };
                schemaVersion: {
                    value: string;
                };
                placeholder: {
                    data: {
                        url: string;
                    };
                    type: string;
                }[];
            };
        };
    };
}[];
export declare const bodiedExtensionData: {
    type: "inlineExtension" | "extension" | "bodiedExtension";
    attrs: {
        extensionType: string;
        extensionKey: string;
        layout: string;
        parameters: {
            macroMetadata: {
                macroId: {
                    value: number;
                };
                schemaVersion: {
                    value: string;
                };
                placeholder: {
                    data: {
                        url: string;
                    };
                    type: string;
                }[];
            };
        };
    };
    content: ({
        type: string;
        content: {
            type: string;
            text: string;
        }[];
        attrs: {
            level: number;
        };
    } | {
        type: string;
        content: ({
            type: string;
            text: string;
            marks: {
                type: string;
            }[];
            attrs?: undefined;
        } | {
            type: string;
            text: string;
            marks?: undefined;
            attrs?: undefined;
        } | {
            type: "inlineExtension" | "extension" | "bodiedExtension";
            attrs: {
                extensionType: string;
                extensionKey: string;
                parameters: {
                    macroParams: {
                        color: {
                            value: string;
                        };
                        title: {
                            value: string;
                        };
                        subtle: {
                            value: boolean;
                        };
                    };
                    macroMetadata: {
                        macroId: {
                            value: number;
                        };
                        schemaVersion: {
                            value: string;
                        };
                        placeholder: {
                            data: {
                                url: string;
                            };
                            type: string;
                        }[];
                    };
                };
            };
            text?: undefined;
            marks?: undefined;
        })[];
        attrs?: undefined;
    })[];
}[];
