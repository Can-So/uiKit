// @flow
import React, { Component, type Node } from 'react';
import { mount, render } from 'enzyme';

import { colors } from '@atlaskit/theme';
import { name } from '../package.json';
import Icon, { size } from '../src';
import { spanStyles } from '../src/components/Icon';

const sizeValues = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

describe(name, () => {
  describe('Icon', () => {
    const secretContent = 'secret content';
    const secretWrapper = () => <div>{secretContent}</div>;
    const empty = () => <div>Icon</div>;

    const MyIcon = props => <Icon glyph={secretWrapper} {...props} />;

    describe('glyph prop', () => {
      const id = 'customSvg';
      const customGlyphJsx = () => <svg id={id} />;
      const wrapper = mount(<Icon glyph={customGlyphJsx} label="" />);

      it('should render an SVG provided via JSX', () => {
        expect(wrapper.html().includes(`<svg id="${id}"`)).toBe(true);
      });
    });

    describe('dangerouslySetGlyph prop', () => {
      const id = 'customSvg';
      const customGlyphString = `<svg id=${id}></svg>`;
      const wrapper = mount(
        <Icon dangerouslySetGlyph={customGlyphString} label="" />,
      );

      it('should render an SVG provided as a string', () => {
        expect(wrapper.html().includes(`<svg id="${id}"`)).toBe(true);
      });
      it('should replace idPlaceholders with a unique ID generated at runtime', () => {
        const gradientId = 'a-idPlaceholder';
        const glyphString = `<svg><defs><linearGradient id="${gradientId}"></linearGradient></defs><g><path fill="url(#${gradientId})"></path></g></svg>`;
        // Using render as mount/shallow as .find does not work with dangerouslySetInnerHTML
        const icon = render(
          <Icon dangerouslySetGlyph={glyphString} label="My icon" />,
        );
        const uuidLength = 7;

        // for some reason cheerio will no longer find linear gradient elements. Instead we look
        // inside defs and confirm that we have a linearGradient
        const gradientEls = icon.find('defs > *');
        expect(gradientEls.length).toBe(1);
        expect(gradientEls[0].name).toBe('linearGradient');

        // now we can check the id of it
        const gradientDomId = gradientEls[0].attribs.id;
        expect(typeof gradientDomId).toBe('string');
        expect(gradientDomId).not.toBe(gradientId);
        expect(gradientDomId.length).toBeGreaterThan(uuidLength);

        const otherIcon = render(
          <Icon dangerouslySetGlyph={glyphString} label="My icon" />,
        );
        const otherId = otherIcon.find('lineargradient').prop('id');
        expect(otherId).not.toBe(gradientDomId);
      });
    });

    describe('exports', () => {
      it('exports the React component, and size', () => {
        expect(Icon).not.toBe(undefined);
        expect(size).not.toBe(undefined);

        expect(new Icon({ label: 'My icon' })).toBeInstanceOf(Component);
        expect(Object.values(size)).toEqual([
          'small',
          'medium',
          'large',
          'xlarge',
        ]);
      });
    });

    it('should be possible to create an Icon via a subclass', () => {
      const wrapper = mount(<MyIcon label="My icon" />);
      expect(wrapper.find('span').is('[aria-label="My icon"]')).toBe(true);
    });

    describe('label property', () => {
      it('is accessed by glyph', () => {
        /* eslint-disable react/prop-types */
        const LabelWriter = (props: { label: string }): Node => (
          <div>{props.label}</div>
        );
        const labelContent = 'label content';
        const wrapper = mount(
          // $FlowFixMe - LabelWriter function signature interpreted incorrectly
          <Icon glyph={LabelWriter} label={labelContent} />,
        );
        expect(wrapper.find('span').is(`[aria-label="${labelContent}"]`)).toBe(
          true,
        );
      });
    });

    describe('size property', () => {
      const sizes = ['small', 'medium', 'large', 'xlarge'];
      sizes.forEach(s => {
        const span = mount(<Icon glyph={empty} label="My icon" size={s} />);
        // $FlowFixMe - return type of styled components is bad
        const iconSize = spanStyles[1](span.props());

        it(`with value ${s}`, () => {
          expect(iconSize.includes(sizeValues[s])).toBe(true);
        });
      });
    });

    describe('primaryColor property', () => {
      it('is set to inherit the text color by default', () => {
        const span = mount(<MyIcon label="default primaryColor" />);
        // $FlowFixMe - return type of styled components is bad
        const color = spanStyles[3](span.props());
        expect(color).toBe('currentColor');
      });
      it('can be changed to a hex value', () => {
        const primaryColor = '#ff0000';
        const span = mount(
          <MyIcon label="hex primaryColor" primaryColor={primaryColor} />,
        );
        // $FlowFixMe - return type of styled components is bad
        const color = spanStyles[3](span.props());

        expect(color).toBe(primaryColor);
      });
      it('can be changed to a named color', () => {
        const primaryColor = 'rebeccapurple';
        const span = mount(
          <MyIcon label="hex primaryColor" primaryColor={primaryColor} />,
        );
        // $FlowFixMe - return type of styled components is bad
        const color = spanStyles[3](span.props());

        expect(color).toBe(primaryColor);
      });
    });

    describe('secondaryColor property', () => {
      it('is set to the default theme background color by default', () => {
        const span = mount(<MyIcon label="default secondaryColor" />);
        const props = span.props();
        // $FlowFixMe - return type of styled components is bad
        const fill = spanStyles[5](props)(props);

        expect(fill).toBe(colors.background(props));
      });
      it('can be changed to a hex value', () => {
        const secondaryColor = '#ff0000';
        const span = mount(
          <MyIcon label="hex secondaryColor" secondaryColor={secondaryColor} />,
        );
        // $FlowFixMe - return type of styled components is bad
        const fill = spanStyles[5](span.props());

        expect(fill).toBe(secondaryColor);
      });
      it('can be changed to a named color', () => {
        const secondaryColor = 'rebeccapurple';
        const span = mount(
          <MyIcon label="hex secondaryColor" secondaryColor={secondaryColor} />,
        );
        // $FlowFixMe - return type of styled components is bad
        const fill = spanStyles[5](span.props());

        expect(fill).toBe(secondaryColor);
      });
    });

    describe('onClick property', () => {
      it('should set a click handler', () => {
        const handler = jest.fn().mockImplementation(() => {}); // eslint-disable-line no-undef

        const wrapper = mount(
          <Icon glyph={empty} label="My icon" onClick={handler} />,
        );
        expect(wrapper.prop('onClick')).toBe(handler);

        wrapper.find('span').simulate('click');
        expect(handler.mock.calls.length).toBe(1);
      });
    });
  });
});
