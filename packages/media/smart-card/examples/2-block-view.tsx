import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { ResolvingView } from '../src/block/ResolvingView';
import { ErroredView as CollapsedErroredView } from '../src/block/ErroredView';
import { UnauthorisedView } from '../src/block/UnauthorisedView';
import { ForbiddenView } from '../src/block/ForbiddenView';
import { ResolvedView } from '../src/block/ResolvedView';

const url = 'https://www.dropbox.com/';
const icon =
  'https://aem.dropbox.com/cms/content/dam/dropbox/www/en-us/branding/app-dropbox-windows@2x.png';

const log = (name: string) => () => console.log(name);
const onClick = log('Open');

export default () => (
  <Page>
    <Grid>
      <GridColumn>
        <h4>Loading</h4>
        <ResolvingView onClick={onClick} />

        <h4>Errored</h4>
        <CollapsedErroredView
          url={url}
          message="We stumbled a bit here."
          onClick={onClick}
          onRetry={log('Retry')}
        />

        <h4>Unauthorised</h4>
        <UnauthorisedView
          icon={icon}
          url={url}
          onClick={onClick}
          onAuthorise={log('Authorise')}
        />

        <h4>Forbidden</h4>
        <ForbiddenView
          icon={icon}
          url={url}
          onClick={onClick}
          onAuthorise={log('Authorise')}
        />

        <h4>Resolved</h4>
        <ResolvedView
          context={{
            text: 'Dropbox',
            icon: icon,
          }}
          title={{ text: 'foo bar' }}
          byline={{ text: 'foo bar' }}
        />
        <br />
        <br />
        <ResolvedView
          context={{
            text: 'Dropbox',
            icon: icon,
          }}
          user={{
            name: 'Foo bar',
          }}
          title={{
            text:
              'The public is more familiar with bad design than good design. It is, in effect, conditioned to prefer bad design, because that is what it lives with. The ne',
          }}
          byline={{
            text:
              'Entity byline (not description) is limited to a single line, yep just one',
          }}
          description={{
            text:
              'Descriptions can be added in the meta data area using the text display. They are used to show additional information on the object and can be up to three lines',
          }}
          thumbnail="https://www.cupcakediariesblog.com/wp-content/uploads/2016/02/cookie-monster-cupcakes-2.jpg"
          preview="https://www.timelinecoverbanner.com/facebook-covers/2012/11/sunrise-earth.jpg"
          details={[
            {
              title: 'Size',
              text: '44.5MB',
            },
            {
              lozenge: {
                text: 'foobar',
              },
            },
            {
              title: 'Size',
              text: '44.5MB',
            },
            {
              lozenge: {
                text: 'foobar',
              },
            },
            {
              title: 'Size',
              text: '44.5MB',
            },
            {
              lozenge: {
                text: 'foobar',
              },
            },
            {
              title: 'Size',
              text: '44.5MB',
            },
            {
              lozenge: {
                text: 'foobar',
              },
            },
          ]}
          users={[
            { name: 'James' },
            { name: 'Scotty' },
            { name: 'Artur' },
            { name: 'Adam' },
            { name: 'Sherif' },
            { name: 'Waldemar' },
          ]}
          actions={[
            {
              id: 'success',
              text: 'Success',
              handler: ({ success }) => success('Success!'),
            },
            {
              id: 'failure',
              text: 'Failure',
              handler: ({ failure }) => failure(),
            },
            {
              id: 'pending',
              text: 'Pending',
              handler: ({ pending }) => pending(),
            },
          ]}
        />
      </GridColumn>
    </Grid>
  </Page>
);
