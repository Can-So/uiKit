import * as React from 'react';
import { ComponentType, Component } from 'react';
// we explicitly do not want to use our wrapped loadable here, as the modal being loaded should
// be handled by the iframe sendApdex
import Loadable from 'react-loadable';
import Loading from '../Loading';
import CodeBlock from '../Code';

declare interface Window {
  unmountApp?: () => void;
}

type Props = {
  children?: (...param: Array<any>) => React.ReactChild;
  src: string | null;
  name: string;
  example: {
    contents: Function;
    exports: Function;
  };
  displayCode: boolean;
  render?: (
    component1: ComponentType<any>,
    component2: ComponentType<any>,
    param: boolean,
  ) => any;
};

export default class ExampleDisplay extends Component<Props> {
  iframeRef: HTMLIFrameElement;
  ExampleCode:
    | (React.ComponentClass<{}, any> & Loadable.LoadableComponent)
    | (React.StatelessComponent<{}> & Loadable.LoadableComponent);
  Example: () => JSX.Element;
  constructor(props) {
    super(props);
    this.buildExampleComponents(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      if (
        this.iframeRef &&
        typeof (this.iframeRef!.contentWindow! as Window).unmountApp ===
          'function'
      ) {
        (this.iframeRef!.contentWindow! as Window).unmountApp!();
      }
      this.buildExampleComponents(nextProps);
    }
  }
  componentWillUnmount() {
    if (
      this.iframeRef &&
      typeof (this.iframeRef!.contentWindow! as Window).unmountApp ===
        'function'
    ) {
      (this.iframeRef!.contentWindow! as Window).unmountApp!();
    }
  }
  buildExampleComponents = props => {
    this.ExampleCode = Loadable({
      loader: () => props.example.contents(),
      loading: () => <Loading {...props} />,
      render(loaded: any) {
        return (
          <CodeBlock grammar="jsx" content={loaded.default} name={props.name} />
        );
      },
    });
    this.Example = () => (
      <iframe
        ref={this.getIframeRef}
        title="example"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        src={props.src}
      />
    );
  };
  getIframeRef = ref => (this.iframeRef = ref);
  render() {
    if (!this.props.src) {
      console.error(
        'No source url provided for the examples iframe',
        this.props.src,
      );
      return;
    }
    return this.props.children!(
      this.ExampleCode,
      this.Example,
      this.props.displayCode,
    );
  }
}
