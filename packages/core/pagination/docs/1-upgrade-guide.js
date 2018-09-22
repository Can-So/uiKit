//@flow
import React from 'react';
import { code, md } from '@atlaskit/docs';

export default md`
## v8 to v9

### 🎉 New better API for composition

The pagination can we composed using four components exported from pagination component:

1. **LeftNavigator**: A react component that displays the left navigation button

2. **Page**: This is the actual component that you will use to display you page

3. **RightNavigator**: A react component that displays the right navigation button

4. **Ellipses**: This will print '...'  in the page, this is used to skip the pages

and there is a new export from the package:

5. **collapseRange**: This is a util function which takes in pages, current page value, optiional maximum visible pages and ellipsis component as arguments
and returns an array of items to show.

### 🚗 Upgrade from v8

To see an example of a pagination in v8 to show 10 pages:

${code`
<Pagination
    value={5}    // selected value
    total={10}  // Total number of pages
    onChange={e => console.log('page changed', e)} // onChange hook with page selected
/>
`}

**Drawbacks with the above approach:**

- You cannot control the total number of pagesNumber's displayed, as it is constant 7 defined in component.
- You have no control over what you display on page number, by that I mean it always displays 1,2,3... there is no
support for localisation.
- We cannot render Link component for routing with react-router, etc.

In v9 we can re-write the above component as:

${code`
import Pagination, {
    collapseRange
    LeftNavigator,
    RightNavigator,
} from '@atlaskit/pagination';


<Pagination>
    {/** The previous page navigator */}
    <LeftNavigator
        isDisabled={currentPageIndex === 1}
        onClick={() => this.updateSelectedPageTo(currentPageIndex - 1)}
    />
    {/** All the pages */}
    {collapseRange(PAGES, currentPageIndex)}
    {/** The Next page navigator */}
    <RightNavigator
        isDisabled={currentPageIndex === PAGES.length}
        onClick={() => this.updateSelectedPageTo(currentPageIndex + 1)}
    />
</Pagination>
`}

Where pages is the list of all the pages rendered. To see an example if you want render a pagination component of total 10 pages:

${code`
import { Page } from '@atlaskit/pagination';

const PAGES = [...Array(10)].map((_, i) => (
    <Page
        isSelected={currentPageIndex === i + 1}
        key={i + 1}
        onClick={() => this.updateSelectedPageTo(i + 1)}
    >
        {i + 1}
    </Page>
));
`}

**Advantages over old API:**

- You have full control over the total number of pages's displayed, it is the an optional argument in the \`collapseRange\` function with default value as 7.
- You have full control over what text to display in Page component, by that I mean you can render roman number I, II, III...
localisation can be achieved easily.
- We can render Link component for routing with react-router, etc.

## v7 to v8

### 🎉 ADG styling

In v8 pagination styling has been updated.

### 🎉 No changes in the API

There are no changes in the Pagination API. 
Therefore, no code change will be required to consume this major version. 
However, you might need to update your styling.

### 🚨 Styles changes

There must be spacing a 24px ( \`3 * gridSize\` ) between pagination and anything above it.
Add this spacing to the element above the pagination component.

In v7 this spacing was not there either, but because in v8 the buttons have a dark background color the experience will appear broken if this spacing is not there.

Have your designers check that this change does not break the look within your app. Functionaly there no changes in the component.

Example:

${code`
import { gridSize } from '@atlaskit/theme';

<div>
    <div style={{marginBottom: (gridSize() * 3) + 'px'}}>
        <!-- Your awesome page -->
    </div>
    <Pagination
        defaultValue={5}
        total={10}
        onChange={e => console.log('page changed', e)}
    />
</div>
`}

## Migrating to version 4

  In version 4 we have simplified the package to export a single component.
  This section describes the changes and how to migrate to version 4.

  ### Removal of Stateless component

  This export has been removed from the package. The value of the current page
  value can be controlled by using the \`value\` prop from the default import.

  Before version 4:

  ${code`
import React from 'react';
import { PaginationStateless } from '@atlaskit/pagination';

export default () => (
  <PaginationStateless
    current={4}
    total={10}
    onSetPage={page => console.log(page)}
  />
);
  `}

  In version 4:

  ${code`
import React from 'react';
import Pagination from '@atlaskit/pagination';

export default () => (
  <Pagination
    value={4}
    total={10}
    onChange={page => console.log(page)}
  />
);
  `}

  ### Naming changes

  Version 4 renames props to follow more standard React naming conventions.
  Below is a table of the changes.

  #### Prop name changes

  ${(
    <table>
      <thead>
        <tr>
          <th>Before</th>
          <th>In version 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{md`
\`current\`
          `}</td>
          <td>{md`
\`value\`
          `}</td>
        </tr>
        <tr>
          <td>{md`
\`defaultCurrent\`
          `}</td>
          <td>{md`
\`defaultValue\`
          `}</td>
        </tr>
        <tr>
          <td>{md`
\`onSetPage\`
          `}</td>
          <td>{md`
\`onChange\`
          `}</td>
        </tr>
      </tbody>
    </table>
  )}
`;
