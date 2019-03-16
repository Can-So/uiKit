/// <reference types="jest" />
import * as React from 'react';
export declare function createFixture(response: Promise<Blob>): {
    context: import("../../../../../../../media-test-helpers/node_modules/@atlaskit/media-core/context/context").Context;
    el: import("enzyme").ReactWrapper<any, {}, React.Component<{}, {}, any>>;
    onClose: jest.Mock<{}>;
};
