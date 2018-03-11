// @flow
import React, { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import ArrowDown from '@atlaskit/icon/glyph/arrow-down';
import ArrowUp from '@atlaskit/icon/glyph/arrow-up';
import { Note, Code } from '../examples-util/helpers';
import { AvatarGroup } from '../src';
import { AVATAR_SIZES } from '../src/styled/constants';
import { avatarUrl } from '../examples-util/data';

type State = {|
  avatarCount: number,
  avatarCountMax: number,
  gridWidth: number,
  mode: 'stack' | 'grid',
  sizeIndex: number,
|};

export default class AvatarGroupExample extends Component<*, State> {
  state: State = {
    avatarCount: 20,
    avatarCountMax: 11,
    gridWidth: 220,
    mode: 'stack',
    sizeIndex: 3,
  };

  decrement = (key: string) =>
    this.setState(state => ({ [key]: state[key] - 1 }));

  increment = (key: string) =>
    this.setState(state => ({ [key]: state[key] + 1 }));

  render() {
    const {
      avatarCount,
      avatarCountMax,
      gridWidth,
      mode,
      sizeIndex,
    } = this.state;
    const sizes = Object.keys(AVATAR_SIZES);
    const avatarSize = sizes[sizeIndex];
    const stackSourceURLs = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < avatarCount; i++) stackSourceURLs.push(i);

    return (
      <div>
        <h2>Avatar Group </h2>
        <Note size="large">
          Click the excess indicator to see the remaining avatars in a dropdown
          menu.
        </Note>
        <div style={{ display: 'flex', marginTop: '1em' }}>
          <div style={{ flex: 1 }}>
            <h5 style={{ marginBottom: '0.5em' }}>Avatar Size: {avatarSize}</h5>
            <ButtonGroup>
              <Button
                isDisabled={avatarSize === 'small'}
                onClick={() => this.decrement('sizeIndex')}
                iconBefore={<ArrowDown size="small" label="Smaller" />}
              >
                Smaller
              </Button>
              <Button
                isDisabled={avatarSize === 'xlarge'}
                onClick={() => this.increment('sizeIndex')}
                iconBefore={<ArrowUp size="small" label="Larger" />}
              >
                Larger
              </Button>
            </ButtonGroup>
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ marginBottom: '0.5em' }}>
              Avatar Count: {avatarCount}
            </h5>
            <ButtonGroup>
              <Button
                isDisabled={avatarCount <= 1}
                onClick={() => this.decrement('avatarCount')}
                iconBefore={<ArrowDown size="small" label="Less" />}
              >
                Less
              </Button>
              <Button
                isDisabled={avatarCount >= 30}
                onClick={() => this.increment('avatarCount')}
                iconBefore={<ArrowUp size="small" label="More" />}
              >
                More
              </Button>
            </ButtonGroup>
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ marginBottom: '0.5em' }}>
              Grid Max: {avatarCountMax}
            </h5>
            <ButtonGroup>
              <Button
                isDisabled={avatarCountMax <= 1}
                onClick={() => this.decrement('avatarCountMax')}
                iconBefore={<ArrowDown size="small" label="Less" />}
              >
                Less
              </Button>
              <Button
                isDisabled={avatarCountMax >= 30}
                onClick={() => this.increment('avatarCountMax')}
                iconBefore={<ArrowUp size="small" label="More" />}
              >
                More
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <h5>Grid</h5>
        <Note>
          Total {stackSourceURLs.length} / Max {avatarCountMax}
        </Note>
        <input
          min="200"
          max="500"
          onChange={e =>
            this.setState({ gridWidth: parseInt(e.target.value, 10) })
          }
          step="10"
          title="Grid Width"
          type="range"
          value={gridWidth}
        />
        <div style={{ maxWidth: gridWidth, position: 'relative' }}>
          <AvatarGroup
            appearance="grid"
            onAvatarClick={console.log}
            data={stackSourceURLs.map(i => ({
              key: i,
              appearance: 'circle',
              enableTooltip: true,
              name: `Grid Avatar ${i + 1}`,
              src: avatarUrl,
              size: avatarSize,
            }))}
            maxCount={avatarCountMax}
            size={avatarSize}
          />
          <span
            style={{
              borderLeft: '1px solid #ccc',
              paddingLeft: '1em',
              fontSize: 11,
              position: 'absolute',
              right: 0,
              top: 0,
              color: '#999',
              transform: 'translateX(100%)',
            }}
          >
            {gridWidth}px
          </span>
        </div>
        <h5>Stack</h5>
        <Note>Total {stackSourceURLs.length} / Max 5</Note>
        <AvatarGroup
          onAvatarClick={console.log}
          data={stackSourceURLs.map(i => ({
            key: i,
            name: `Stack Avatar ${i + 1}`,
            src: avatarUrl,
            size: avatarSize,
            appearance: 'circle',
            enableTooltip: true,
          }))}
          size={avatarSize}
        />

        <h5>On {'"More"'} Click</h5>
        <div style={{ maxWidth: 380 }}>
          <Note>
            Circumvent the default dropdown menu behaviour by passing{' '}
            <Code>onMoreClick</Code> to <Code>{'<AvatarGroup />'}</Code> and
            handle the event however you want.
          </Note>
          <AvatarGroup
            onMoreClick={() => this.setState({ mode: 'grid' })}
            appearance={mode}
            maxCount={mode === 'grid' ? avatarCount : 0}
            data={stackSourceURLs.map(i => ({
              key: i,
              name: `Stack Avatar ${i + 1}`,
              src: avatarUrl,
              size: avatarSize,
              appearance: 'circle',
              enableTooltip: true,
            }))}
            size={avatarSize}
          />
          {mode === 'grid' ? (
            <button onClick={() => this.setState({ mode: 'stack' })}>
              reset
            </button>
          ) : null}
        </div>

        <h5>Constrained by the scroll parent</h5>
        <div>
          <p>Expand and scroll up to reposition the avatar group menu</p>
          <div
            style={{
              border: '1px solid black',
              height: '200px',
              width: '300px',
              overflow: 'scroll',
            }}
          >
            <div
              style={{ width: '300px', height: '600px', paddingTop: '200px' }}
            >
              <AvatarGroup
                boundariesElement="scrollParent"
                onAvatarClick={console.log}
                data={stackSourceURLs.slice(0, 6).map(i => ({
                  key: i,
                  name: `Stack Avatar ${i + 1}`,
                  src: avatarUrl,
                  size: avatarSize,
                  appearance: 'circle',
                  enableTooltip: true,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
