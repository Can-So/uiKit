import * as React from 'react';

import { renderToString } from 'react-dom/server';
import { hydrate } from 'react-dom';

export default (Example: any) => {
  return class HydrateExample extends React.Component<{}, {}> {
    private serverHTML: string;

    constructor(props: {}) {
      super(props);
      this.serverHTML = renderToString(<Example />);
    }

    componentDidMount() {
      const hydratedEl = this.refs['hydrated'];
      hydrate([<Example />], hydratedEl as Element);
    }

    render() {
      return (
        <div>
          <h2>Server side rendered HTML</h2>
          <code>{this.serverHTML}</code>
          <div dangerouslySetInnerHTML={{ __html: this.serverHTML }} />
          <h2>Hydrated from HTML</h2>
          <div
            ref="hydrated"
            dangerouslySetInnerHTML={{ __html: this.serverHTML }}
          />
        </div>
      );
    }
  };
};
