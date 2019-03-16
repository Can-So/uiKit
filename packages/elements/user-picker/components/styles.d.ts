export declare const BORDER_PADDING = 6;
export declare const PLACEHOLDER_PADDING = 8;
export declare const getStyles: (width: string | number) => {
    menu: (css: any, state: any) => any;
    control: (css: any, state: any) => any;
    clearIndicator: ({ paddingTop, paddingBottom, paddingLeft, paddingRight, ...css }: any) => any;
    indicatorsContainer: (css: any) => any;
    valueContainer: ({ paddingTop, paddingBottom, position, ...css }: any, state: any) => any;
    multiValue: (css: any) => any;
    multiValueRemove: (css: any) => any;
    placeholder: (css: any, state: any) => any;
    option: (css: any) => any;
    input: ({ margin, ...css }: any) => any;
};
export declare const getPopupStyles: (width: string | number, flip?: boolean | undefined) => {
    container: (css: any) => any;
    menu: (css: any, state: any) => any;
    control: (css: any, state: any) => any;
    clearIndicator: ({ paddingTop, paddingBottom, paddingLeft, paddingRight, ...css }: any) => any;
    indicatorsContainer: (css: any) => any;
    valueContainer: ({ paddingTop, paddingBottom, position, ...css }: any, state: any) => any;
    multiValue: (css: any) => any;
    multiValueRemove: (css: any) => any;
    placeholder: (css: any, state: any) => any;
    option: (css: any) => any;
    input: ({ margin, ...css }: any) => any;
};
