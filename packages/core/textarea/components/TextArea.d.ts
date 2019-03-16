import * as React from 'react';
export declare type Props = {
    /**
     * controls the appearance of the field.
     * subtle shows styling on hover.
     * none prevents all field styling.
     */
    appearance: 'standard' | 'subtle' | 'none';
    /** Set whether the fields should expand to fill available horizontal space. */
    isCompact?: boolean;
    /** Sets the field as uneditable, with a changed hover state. */
    isDisabled?: boolean;
    /** If true, prevents the value of the input from being edited. */
    isReadOnly?: boolean;
    /** Set required for form that the field is part of. */
    isRequired?: boolean;
    /** Sets styling to indicate that the input is invalid. */
    isInvalid?: boolean;
    /** The minimum number of rows of text to display */
    minimumRows: number;
    /** The maxheight of the textarea */
    maxHeight: string;
    /** The value of the text-area. */
    value?: string | number;
    /** The default value of the text-area */
    defaultValue?: string | number;
    /** Handler to be called when the input is blurred */
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    /** Handler to be called when the input changes. */
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    /** Handler to be called when the input is focused */
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    /** Sets content text value to monospace */
    isMonospaced?: boolean;
    /**
     * Enables the resizing of the textarea:
     * auto: both directions.
     * horizontal: only along the x axis.
     * vertical: only along the y axis.
     * smart (default): vertically grows and shrinks the textarea automatically to wrap your input text.
     * none: explicitly disallow resizing on the textarea.
     */
    resize: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none';
    /**
     * Passed down to the <textarea /> element.
     */
    spellCheck?: boolean;
    /**
     * The theme function TextArea consumes to derive theming constants for use in styling its components
     */
    theme?: any;
    /**
     * Ref used to access the textarea dom element. NOTE we expose this via
     * forwardRef, so you can also use the ref prop of this component to the
     * same effect.
     */
    forwardedRef?: (e: HTMLTextAreaElement | null) => void;
};
declare const TextArea: React.ComponentClass<Partial<Pick<Props, "isCompact" | "appearance" | "isDisabled" | "isReadOnly" | "isRequired" | "isInvalid" | "minimumRows" | "maxHeight" | "isMonospaced" | "resize" | "theme" | "forwardedRef">> & Pick<Props, "value" | "defaultValue" | "onBlur" | "onChange" | "onFocus" | "spellCheck">, any>;
export { TextArea as TextAreaWithoutAnalytics };
declare const _default: React.ComponentClass<Pick<Pick<Partial<Pick<Props, "isCompact" | "appearance" | "isDisabled" | "isReadOnly" | "isRequired" | "isInvalid" | "minimumRows" | "maxHeight" | "isMonospaced" | "resize" | "theme" | "forwardedRef">> & Pick<Props, "value" | "defaultValue" | "onBlur" | "onChange" | "onFocus" | "spellCheck">, "isCompact" | "appearance" | "isDisabled" | "isReadOnly" | "isRequired" | "isInvalid" | "minimumRows" | "maxHeight" | "value" | "defaultValue" | "onBlur" | "onChange" | "onFocus" | "isMonospaced" | "resize" | "spellCheck" | "theme" | "forwardedRef">, "isCompact" | "appearance" | "isDisabled" | "isReadOnly" | "isRequired" | "isInvalid" | "minimumRows" | "maxHeight" | "value" | "defaultValue" | "onBlur" | "onChange" | "onFocus" | "isMonospaced" | "resize" | "spellCheck" | "theme" | "forwardedRef">, any>;
export default _default;
