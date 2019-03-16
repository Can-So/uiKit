var mock = function (payload) { return ({
    context: [],
    hasFired: false,
    payload: payload,
    clone: function () {
        return null;
    },
    fire: function () { },
    update: function (updater) {
        return mock(payload);
    },
}); };
export default function createAnalyticsEventMock() {
    return jest.fn(mock);
}
//# sourceMappingURL=create-analytics-event-mock.js.map