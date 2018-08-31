import * as React from 'react';
import Button from '@atlaskit/button';
import FabricAnalyticsListeners from '../src/FabricAnalyticsListeners';
import {
  createComponentWithAnalytics,
  IncorrectEventType,
} from '../examples/helpers';
import { LOG_LEVEL } from '../src';
import { FabricChannel } from '../src/types';

const DummyElementsComponentWithAnalytics = createComponentWithAnalytics(
  FabricChannel.elements,
);
const DummyAtlaskitComponentWithAnalytics = createComponentWithAnalytics(
  FabricChannel.atlaskit,
);
const AtlaskitIncorrectEventType = IncorrectEventType(FabricChannel.atlaskit);

const myOnClickHandler = () => {
  console.log('Button clicked');
};

const logLevels = [
  { name: 'DEBUG', level: LOG_LEVEL.DEBUG },
  { name: 'INFO', level: LOG_LEVEL.INFO },
  { name: 'WARN', level: LOG_LEVEL.WARN },
  { name: 'ERROR', level: LOG_LEVEL.ERROR },
  { name: 'OFF', level: LOG_LEVEL.OFF },
];

const analyticsWebClientMock = {
  sendUIEvent: event => {},
  sendOperationalEvent: event => {},
  sendTrackEvent: (event: any) => {},
  sendScreenEvent: (event: any) => {},
};

class Example extends React.Component {
  state = {
    loggingLevelIdx: 0,
  };

  changeLogLevel = () => {
    this.setState({
      loggingLevelIdx: (this.state.loggingLevelIdx + 1) % logLevels.length,
    });
  };

  render() {
    const logLevel = logLevels[this.state.loggingLevelIdx];
    return (
      <FabricAnalyticsListeners
        client={analyticsWebClientMock}
        logLevel={logLevel.level}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button appearance="primary" onClick={this.changeLogLevel}>
              Change log level
            </Button>
            <div style={{ padding: '16px 8px' }}>Level: {logLevel.name}</div>
          </div>
          <div style={{ display: 'block' }}>
            <DummyElementsComponentWithAnalytics onClick={myOnClickHandler} />
          </div>
          <div style={{ display: 'block' }}>
            <DummyAtlaskitComponentWithAnalytics onClick={myOnClickHandler} />
          </div>
          <div style={{ display: 'block' }}>
            <AtlaskitIncorrectEventType onClick={myOnClickHandler} />
          </div>
        </div>
      </FabricAnalyticsListeners>
    );
  }
}

Object.assign(Example, {
  meta: {
    noListener: true,
  },
});

export default Example;
