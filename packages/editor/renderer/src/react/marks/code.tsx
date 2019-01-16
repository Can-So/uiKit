import * as React from 'react';

export default function Code(props: {
  children: React.ReactChild | React.ReactChild[];
}) {
  return <span className="code">{props.children}</span>;
}
