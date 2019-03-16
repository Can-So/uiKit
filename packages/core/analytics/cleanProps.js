import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/*
cleanProps removes props added by the withAnalytics HOC from an object
*/
function cleanProps(props) {
  /* eslint-disable no-unused-vars */
  var analyticsId = props.analyticsId,
      analyticsData = props.analyticsData,
      delegateAnalyticsEvent = props.delegateAnalyticsEvent,
      fireAnalyticsEvent = props.fireAnalyticsEvent,
      firePrivateAnalyticsEvent = props.firePrivateAnalyticsEvent,
      getParentAnalyticsData = props.getParentAnalyticsData,
      cleanedProps = _objectWithoutProperties(props, ["analyticsId", "analyticsData", "delegateAnalyticsEvent", "fireAnalyticsEvent", "firePrivateAnalyticsEvent", "getParentAnalyticsData"]);
  /* eslint-enable no-unused-vars */


  return cleanedProps;
}

export default cleanProps;