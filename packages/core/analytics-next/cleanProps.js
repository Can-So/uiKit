import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

/*
cleanProps removes props added by the withAnalyticsEvents HOC from an object
*/
export default function cleanProps(props) {
  /* eslint-disable no-unused-vars */
  var createAnalyticsEvent = props.createAnalyticsEvent,
      cleanedProps = _objectWithoutProperties(props, ["createAnalyticsEvent"]);
  /* eslint-enable no-unused-vars */


  return cleanedProps;
}