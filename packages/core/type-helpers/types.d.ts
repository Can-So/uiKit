export type PropsOf<C> = C extends new (props: infer P) => React.Component
  ? P
  : C extends (props: infer P) => React.ReactElement<any> | null
  ? P
  : never;

export type ConnectedComponentClass<C, P> = React.ComponentClass<
  JSX.LibraryManagedAttributes<C, P>
> & {
  WrappedComponent: C;
};

export type Matching<InjectedProps, DecorationTargetProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P]
};

export type Shared<
  InjectedProps,
  DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>
> = {
  [P in Extract<
    keyof InjectedProps,
    keyof DecorationTargetProps
  >]?: InjectedProps[P] extends DecorationTargetProps[P]
    ? DecorationTargetProps[P]
    : never
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface PropsInjector<InjectedProps> {
  <C extends React.ComponentType<Matching<InjectedProps, PropsOf<C>>>>(
    component: C,
  ): ConnectedComponentClass<
    C,
    Omit<PropsOf<C>, keyof Shared<InjectedProps, PropsOf<C>>>
  >;
}
