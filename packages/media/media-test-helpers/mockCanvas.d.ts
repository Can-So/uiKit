/// <reference types="jest" />
export declare function mockCanvas(width?: number, height?: number): {
    canvas: {
        width: number;
        height: number;
        toDataURL: jest.Mock<{}>;
        getContext: jest.Mock<{}>;
    };
    context: Partial<CanvasRenderingContext2D>;
};
