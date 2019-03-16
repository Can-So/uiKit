import { ComponentType } from 'react';
export interface WithFeedbackButtonProps {
    /**
     * The ID for the feedback collector. See: https://jira.atlassian.com/secure/ViewCollectors!default.jspa?projectKey=FEEDBACK.
     */
    feedbackCollectorId: string;
}
export default function withFeedbackButton<P extends {}>(WrappedComponent: ComponentType<P>): ComponentType<P & WithFeedbackButtonProps>;
