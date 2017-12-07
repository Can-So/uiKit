// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

import Description from './Description';
import convert from './kindToString';
import { H2 } from './Heading';
import PrettyPropType from './PrettyPropType';

const Heading = styled.h3`
  border-bottom: 2px solid ${themed({ light: colors.N20, dark: colors.DN40 })};
  font-size: 0.9rem;
  font-weight: normal;
  line-height: 1.4;
  margin: 0 0 ${gridSize}px 0;
  padding-bottom: ${gridSize}px;
`;

const HeadingDefault = styled.code`
  color: ${themed({ light: colors.subtleText, dark: colors.subtleText })};
`;

const HeadingRequired = styled.span`
  color: ${themed({ light: colors.R500, dark: colors.R300 })};
`;

const HeadingType = styled.span`
  background: ${themed({ light: colors.N20, dark: colors.DN20 })};
  border-radius: ${borderRadius}px;
  color: ${themed({ light: colors.N300, dark: colors.DN300 })};
  display: inline-block;
  padding: 0 0.2em;
`;
const HeadingName = styled.span`
  background: ${themed({ light: colors.B50, dark: colors.B500 })};
  color: ${themed({ light: colors.B500, dark: colors.B50 })};
  border-radius: ${borderRadius}px;
  display: inline-block;
  margin-right: 0.8em;
  padding: 0 0.2em;
`;

const PropTypeWrapper = styled.div`
  margin-top: ${math.multiply(gridSize, 4)}px;
`;

const Wrapper = styled.div`
  margin-top: ${math.multiply(gridSize, 1.5)}px;

  @media (min-width: 780px) {
    margin-bottom: ${math.multiply(gridSize, 3)}px;
    margin-top: ${math.multiply(gridSize, 3)}px;
  }
`;

const PageWrapper = ({ children }: { children: Node }) => (
  <Wrapper>
    <H2>Props</H2>
    {children}
  </Wrapper>
);

type PropTypeHeadingProps = {
  name: string,
  required: boolean,
  type: any,
  // This is probably giving up
  defaultValue?: any,
};

const resolveFromGeneric = type => {
  if (type.value.kind === 'generic') return resolveFromGeneric(type.value);
  return type.value;
};

function PropTypeHeading(props: PropTypeHeadingProps) {
  let typeName = props.type.kind;
  if (typeName === 'nullable') {
    typeName = `?${props.type.arguments.kind}`;
  } else if (typeName === 'union') {
    typeName = 'set options';
  } else if (typeName === 'generic') {
    const r = resolveFromGeneric(props.type);
    if (r.kind === 'external') {
      typeName = `${r.moduleSpecifier}.${r.name}`;
    } else {
      typeName = r.kind;
    }
  }

  let defaultValue = null;

  if (props.defaultValue) {
    defaultValue = `${convert(props.defaultValue)}`;
  }

  return (
    <Heading>
      <code>
        <HeadingName>{props.name}</HeadingName>
        <HeadingType>{typeName}</HeadingType>
        {defaultValue && <HeadingDefault> = {defaultValue}</HeadingDefault>}
        {props.required ? <HeadingRequired> required</HeadingRequired> : null}
      </code>
    </Heading>
  );
}

const reduceToObj = type => {
  if (type.kind === 'generic') {
    return reduceToObj(type.value);
  } else if (type.kind === 'object') {
    return type.members;
  }
  // eslint-disable-next-line no-console
  console.warn('was expecting to reduce to an object and could not', type);
  return [];
};

type Obj = {
  kind: 'object',
  members: Array<any>,
};

type Gen = {
  kind: 'generic',
  value: any,
};

type Inter = {
  kind: 'intersection',
  types: Array<Obj | Gen>,
};

type DynamicPropsProps = {
  props: {
    classes?: Array<{
      kind: string,
      value: Obj | Inter,
    }>,
  },
};

const getPropTypes = propTypesObj => {
  let propTypes;
  if (propTypesObj.kind === 'object') {
    propTypes = propTypesObj.members;
  } else if (propTypesObj.kind === 'intersection') {
    propTypes = propTypesObj.types.reduce(
      (acc, type) => [...acc, ...reduceToObj(type)],
      [],
    );
  }
  return propTypes;
};

export default function DynamicProps(props: DynamicPropsProps) {
  const classes = props.props && props.props.classes;
  if (!classes) return null;

  const propTypesObj = classes[0] && classes[0].value;
  if (!propTypesObj) return null;

  const propTypes = getPropTypes(propTypesObj);

  console.log(propTypes);

  if (!propTypes) return null;

  return (
    <PageWrapper>
      {propTypes.map(propType => {
        let description;
        if (propType.leadingComments) {
          description = propType.leadingComments.reduce(
            (acc, { value }) => acc.concat(`\n${value}`),
            '',
          );
        }
        if (!propType.value) {
          // eslint-disable-next-line no-console
          console.error(
            `Prop ${
              propType.key
            } has no type; this usually indicates invalid propType or defaultProps config`,
          );
          return null;
        }
        return (
          <PropTypeWrapper key={propType.key}>
            <PropTypeHeading
              name={propType.key}
              required={!propType.optional}
              type={propType.value}
              defaultValue={propType.default}
            />
            {description && <Description>{description}</Description>}
            <PrettyPropType type={propType.value} />
          </PropTypeWrapper>
        );
      })}
    </PageWrapper>
  );
}
