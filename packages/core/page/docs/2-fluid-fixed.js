// @flow
import { code, md } from '@findable/docs';

export default md`
# Grid with custom width

Page can also be used for custom width pages. You need to use "fluid" layout for this

${code`
import Page, { Grid, GridColumn } from '@findable/page';

render(
  <Page>
    <div style={{ width: '1200px', margin: '0 auto' }}
      <Grid layout="fluid">
        <GridColumn medium={4}>
          This is a sidebar
        </GridColumn>
        <GridColumn medium={8}>
          This is a content
        </GridColumn>
      </Grid>
    </div>
  </Page>
);
`}
`;
