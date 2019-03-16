import * as React from 'react';
import { Card } from '@findable/smart-card';
import { getEventHandler } from '../../utils';
export default function InlineCard(props) {
    var url = props.url, data = props.data, eventHandlers = props.eventHandlers;
    var handler = getEventHandler(eventHandlers, 'smartCard');
    var onClick = url && handler ? function () { return handler(url); } : undefined;
    return React.createElement(Card, { appearance: "inline", url: url, data: data, onClick: onClick });
}
//# sourceMappingURL=inlineCard.js.map