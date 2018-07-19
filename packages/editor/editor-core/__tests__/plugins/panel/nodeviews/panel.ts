import { p, panel, defaultSchema } from '@atlaskit/editor-test-helpers';
import { panelNodeView } from '../../../../src/plugins/panel/nodeviews/panel';

describe('Panel - NodeView', () => {
  const portalProviderAPI = { render() {}, remove() {} } as any;

  it('should render a contentDOM of `div` inside `div[data-panel-type]`', () => {
    const node = panel()(p('this is the decision'))(defaultSchema);

    const nodeView = panelNodeView(portalProviderAPI)(
      node,
      null as any,
      () => -1,
    );

    const contentDOM = nodeView!.contentDOM as HTMLElement;

    expect(contentDOM.tagName).toBe('DIV');
    expect(contentDOM.parentElement!.tagName).toBe('DIV');
    expect(contentDOM.parentElement!.getAttribute('data-panel-type')).toBe(
      'info',
    );
  });
});
