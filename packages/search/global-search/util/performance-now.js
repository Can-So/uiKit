export default (window.performance &&
    window.performance.now.bind(performance)) ||
    Date.now;
//# sourceMappingURL=performance-now.js.map