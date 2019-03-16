import * as React from 'react';
import { Card } from '@atlaskit/smart-card';
import { getEventHandler } from '../../utils';
export default function BlockCard(props) {
    var url = props.url, data = props.data, eventHandlers = props.eventHandlers;
    var handler = getEventHandler(eventHandlers, 'smartCard');
    var onClick = url && handler ? function () { return handler(url); } : undefined;
    return React.createElement(Card, { appearance: "block", url: url, data: data, onClick: onClick });
}
//# sourceMappingURL=blockCard.js.map