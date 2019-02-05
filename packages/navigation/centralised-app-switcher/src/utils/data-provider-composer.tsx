import * as React from 'react';

interface Children {
  (props: any): React.ReactElement<any> | null;
}

interface Props {
  children: Children;
  components: React.ReactElement<any>[];
}

const next = (
  render: Children,
  remaining: (React.ReactElement<any> | React.ReactType)[],
  results: any[] = [],
) => {
  if (!remaining[0]) {
    return render(results);
  }

  function nextRender(value: any) {
    return next(render, remaining.slice(1), results.concat([value]));
  }

  const CurrentProviderType = remaining[0];
  return typeof CurrentProviderType === 'function' ? (
    <CurrentProviderType results={results} render={nextRender} />
  ) : (
    React.cloneElement(remaining[0] as React.ReactElement<any>, {
      children: nextRender,
    })
  );
};

export default (props: Props) => {
  return next(props.children, props.components);
};
