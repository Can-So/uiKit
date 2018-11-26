import * as React from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Shared<A, B> = {
  [P in Extract<keyof A, keyof B>]?: A[P] extends B[P] ? B[P] : never
} &
  { [P in Extract<keyof B, keyof A>]?: B[P] extends A[P] ? A[P] : never };
/**
 * Extract the type of "P" for a given React component
 */
export type PropsOf<C> = C extends new (props: infer P) => React.Component
  ? P
  : C extends (props: infer P) => React.ReactElement<any> | null
  ? P
  : C extends React.Component<infer P>
  ? P
  : never;

export const withDefaultProps = <P, DP extends Partial<P>>(
  defaultProps: DP,
  Component: React.ComponentClass<P>,
) => {
  type NonDefaultProps = Omit<P, keyof Shared<P, DP>>;
  type DefaultedProps = Omit<P, keyof NonDefaultProps>;
  type Props = Partial<DefaultedProps> & NonDefaultProps;
  Component.defaultProps = defaultProps;
  return Component as React.ComponentClass<Props>;
};

export type ResultantProps<InjectedProps, P extends InjectedProps> = Omit<
  P,
  keyof InjectedProps
>;

/**
 * This type is used for HOC's that do not inject any props rather just render
 * the component in a special way.  The resultant component can take in additional
 * props.
 *
 * Example usage:
 *
 * const withDeprecationWarnings: PropsPasser<AppearanceProps> = (
 *  Component,
 * ) => {
 *   return class WithDeprecationWarnings extends React.Component<PropsOf<typeof Component> & AppearanceProps> {
 *     static displayName = `WithDeprecationWarnings(${getComponentName(
 *       Component,
 *     )})`;
 *
 *     componentWillMount() {
 *       warnIfDeprecatedAppearance(this.props.appearance);
 *     }
 *
 *     componentWillReceiveProps(newProps: AppearanceProps) {
 *       if (newProps.appearance !== this.props.appearance) {
 *         warnIfDeprecatedAppearance(newProps.appearance);
 *       }
 *     }
 *
 *     render() {
 *       return React.createElement(Component, this.props as any);
 *     }
 *   };
 * };
 */
export type PropsPasser<Extra extends object = {}> = <
  C extends React.ComponentClass
>(
  Component: C,
) => React.ComponentClass<PropsOf<C> & Extra>;

/**
 * This type is used for HOC's that inject props into the provided component in
 * such a way that the resultant component does not accept those props any more
 */
export type PropsInjector<InjectedProps extends object> = <
  C extends React.ComponentClass<any>
>(
  Component: C,
) => React.ComponentClass<
  Omit<PropsOf<C>, keyof Shared<InjectedProps, PropsOf<C>>>
>;
