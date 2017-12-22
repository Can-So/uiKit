// @flow
/* eslint-disable react/no-array-index-key */

import React, { type Node } from 'react';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';
import styled from 'styled-components';

const Wrapper = styled.code`
  display: inline-block;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: ${gridSize}px;
  margin-top: ${gridSize}px;
`;

const Block = styled.span`
  display: block;
`;

const TypeMinWidth = styled.span`
  display: inline-block;
  min-width: 60px;
`;

const Type = styled.span`
  background-color: ${themed({ light: colors.P50, dark: colors.P500 })};
  border-radius: ${borderRadius}px;
  color: ${themed({ light: colors.P500, dark: colors.P50 })};
  display: inline-block;
  margin: 2px 0;
  padding: 0 0.2em;
`;

// $FlowFixMe
const TypeMeta = styled(Type)`
  background-color: ${themed({ light: colors.N20, dark: colors.DN50 })};
  color: ${colors.subtleText};
`;

// $FlowFixMe
const StringType = styled(Type)`
  background-color: ${themed({ light: colors.G50, dark: colors.G500 })};
  color: ${themed({ light: colors.G500, dark: colors.G100 })};
`;

// $FlowFixMe
const InstanceType = styled(Type)`
  background-color: ${themed({ light: colors.Y50, dark: colors.G500 })};
  color: ${themed({ light: colors.Y500, dark: colors.G100 })};
`;

const Required = styled.span`
  color: ${themed({ light: colors.R500, dark: colors.R300 })};
`;

const Outline = styled.span`
  color: ${colors.subtleText};
  line-height: 1;
`;

const Invalid = styled.span`
  color: ${themed({ light: colors.N80, dark: colors.DN80 })};
  margin: ${math.divide(gridSize, 2)}px;
`;

const SIMPLE_TYPES = [
  'array',
  'boolean',
  'function',
  'number',
  'string',
  'symbol',
  'node',
  'element',
  'custom',
  'any',
  'void',
  'mixed',
];

/* eslint-disable no-use-before-define */
/* eslint-disable prefer-rest-params */
function printComplexType(type) {
  if (typeof type === 'object' && !SIMPLE_TYPES.includes(type.kind)) {
    return print(...arguments);
  }
  return null;
}
/* eslint-enable no-use-before-define */
/* eslint-enable prefer-rest-params */

function Indent(props: { children: Node }) {
  return <div style={{ paddingLeft: '1.3em' }}>{props.children}</div>;
}

function resolveFromGeneric(type) {
  if (type.typeParams && type.value.name === 'Array') {
    // If a generic type is an Array, we don't want to just return the value,
    // But also the entire type object, so we can parse the typeParams later on.
    return type;
  }
  if (type.value.kind === 'generic') {
    return resolveFromGeneric(type.value);
  }
  return type.value;
}

function print(startType, depth = 1) {
  let type = startType;
  if (type.kind === 'nullable') type = type.arguments;

  if (type.kind === 'generic') {
    if (type.value && type.value.name === 'Array') {
      // As Flow does not know what the keyword Array<T> means, we're doing a check here for generic types with a nominal value of 'Array'
      // If a type meets this criteria, we print out its contents as per below.
      return (
        <span>
          <TypeMeta>
            Array of <Outline>{'['}</Outline>
          </TypeMeta>
          <Indent>{print(type.typeParams[0].type)}</Indent>
          <TypeMeta>
            <Outline>{']'}</Outline>
          </TypeMeta>
        </span>
      );
    }
    type = resolveFromGeneric(type);
  }

  if (type.kind === 'string' || type.kind === 'stringLiteral') {
    if (type.value) {
      return (
        <StringType>
          {'"'}
          {type.value}
          {'"'}
        </StringType>
      );
    }
    return <Type>{type.kind}</Type>;
  }

  if (type.kind === 'function') {
    return <Type>{'function'}</Type>;
  }
  if (type.kind === 'any') {
    return <Type>{'any'}</Type>;
  }

  if (type.kind === 'number' || type.kind === 'numberLiteral') {
    if (type.value) {
      return <StringType>{type.value}</StringType>;
    }
    return <Type>{type.kind}</Type>;
  }

  // make sure we have an object; we should always have an object!!!
  if (typeof type !== 'object') {
    return <div>ERROR: TYPEOF type === {typeof type}</div>;
  }

  if (type.kind === 'object') {
    return (
      <span>
        <TypeMeta>
          Shape <Outline>{'{'}</Outline>
        </TypeMeta>
        <Indent>
          {type.members.map(prop => (
            <div key={prop.key}>
              <TypeMinWidth>
                <Type>{prop.key}</Type>
              </TypeMinWidth>{' '}
              {prop.value.kind !== 'generic' ? prop.value.kind : ''}
              {prop.optional ? null : <Required> required</Required>}{' '}
              {printComplexType(prop.value)}
            </div>
          ))}
        </Indent>
        <TypeMeta>
          <Outline>{'}'}</Outline>
        </TypeMeta>
      </span>
    );
  }

  if (type.name === 'enum') {
    if (typeof type.value === 'string') {
      return (
        <span>
          <TypeMeta>
            One of <Outline>{'('}</Outline>
          </TypeMeta>
          <InstanceType>{type.value}</InstanceType>
          <TypeMeta>
            <Outline>{')'}</Outline>
          </TypeMeta>
        </span>
      );
    }
    return (
      <span>
        <TypeMeta>
          One of <Outline>{'('}</Outline>
        </TypeMeta>
        <Indent>
          {Array.isArray(type.value)
            ? type.value.map((v, i) => (
                <Block key={i}>{print(v.value, depth + 1)}</Block>
              ))
            : print(type.value, depth + 1)}
        </Indent>
        <TypeMeta>
          <Outline>{')'}</Outline>
        </TypeMeta>
      </span>
    );
  }

  if (type.kind === 'union') {
    return (
      <span>
        <TypeMeta>
          One of <Outline>{'('}</Outline>
        </TypeMeta>
        <Indent>
          {Array.isArray(type.types)
            ? type.types.map((t, i) => (
                <Block key={i}>{print(t, depth + 1)}</Block>
              ))
            : print(type.types, depth + 1)}
        </Indent>
        <TypeMeta>
          <Outline>{')'}</Outline>
        </TypeMeta>
      </span>
    );
  }

  // note we guard against complex name properties here, because you can have
  // shapes with name properties
  if (!type.value && typeof type.name === 'string') {
    return <Type>{type.name}</Type>;
  }

  return <Invalid>{JSON.stringify(type)}</Invalid>;
}

type PrettyPropTypeProps = {
  type: Object,
};

export default function PrettyPropType(props: PrettyPropTypeProps) {
  let type = props.type;
  if (type.kind === 'generic') {
    type = resolveFromGeneric(props.type);
  }
  if (SIMPLE_TYPES.includes(type.kind)) return null;
  if (
    type.kind === 'nullable' &&
    SIMPLE_TYPES.includes(props.type.arguments.kind)
  ) {
    return null;
  }

  return <Wrapper>{print(type)}</Wrapper>;
}
