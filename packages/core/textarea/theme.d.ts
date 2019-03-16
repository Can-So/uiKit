/// <reference types="react" />
export declare type ThemeAppearance = 'standard' | 'subtle' | 'none';
export declare type ThemeProps = {
    appearance: ThemeAppearance;
    mode: 'dark' | 'light';
};
export declare type ThemeTokens = {
    borderColor: string;
    borderColorFocus: string;
    backgroundColor: string;
    backgroundColorFocus: string;
    backgroundColorHover: string;
    disabledRules: {
        backgroundColor: string;
        backgroundColorFocus: string;
        backgroundColorHover: string;
        borderColor: string;
        borderColorFocus: string;
        textColor: string;
    };
    invalidRules: {
        borderColor: string;
        borderColorFocus: string;
        backgroundColor: string;
        backgroundColorFocus: string;
        backgroundColorHover: string;
    };
    textColor: string;
    placeholderTextColor: string;
};
export declare const themeTokens: {
    borderColor: {
        standard: {
            light: string;
            dark: string;
        };
        subtle: {
            light: string;
            dark: string;
        };
        none: {
            light: string;
            dark: string;
        };
    };
    borderColorFocus: {
        standard: {
            light: string;
            dark: string;
        };
        subtle: {
            light: string;
            dark: string;
        };
        none: {
            light: string;
            dark: string;
        };
    };
    backgroundColor: {
        standard: {
            light: string;
            dark: string;
        };
        subtle: {
            light: string;
            dark: string;
        };
        none: {
            light: string;
            dark: string;
        };
    };
    backgroundColorFocus: {
        standard: {
            light: string;
            dark: string;
        };
        subtle: {
            light: string;
            dark: string;
        };
        none: {
            light: string;
            dark: string;
        };
    };
    backgroundColorHover: {
        standard: {
            light: string;
            dark: string;
        };
        subtle: {
            light: string;
            dark: string;
        };
        none: {
            light: string;
            dark: string;
        };
    };
    disabledRules: {
        light: {
            backgroundColor: string;
            backgroundColorFocus: string;
            backgroundColorHover: string;
            borderColor: string;
            borderColorFocus: string;
            textColor: string;
        };
        dark: {
            backgroundColor: string;
            backgroundColorFocus: string;
            backgroundColorHover: string;
            borderColor: string;
            borderColorFocus: string;
            textColor: string;
        };
    };
    invalidRules: {
        light: {
            borderColor: string;
            borderColorFocus: string;
            backgroundColor: string;
            backgroundColorFocus: string;
            backgroundColorHover: string;
        };
        dark: {
            borderColor: string;
            borderColorFocus: string;
            backgroundColor: string;
            backgroundColorFocus: string;
            backgroundColorHover: string;
        };
    };
    textColor: {
        light: string;
        dark: string;
    };
    placeholderTextColor: {
        light: string;
        dark: string;
    };
};
export declare const Theme: {
    Consumer: import("react").ReactType<ThemeTokens>;
    Provider: import("react").ReactType<{
        value: (tokens: ThemeTokens, props: ThemeProps) => ThemeTokens;
    }>;
};
