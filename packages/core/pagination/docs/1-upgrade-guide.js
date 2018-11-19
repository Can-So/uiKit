//@flow
import React from 'react';
import { code, md } from '@atlaskit/docs';
import DynamicTable from '@atlaskit/dynamic-table';

export default md`
## v8 to v9

### ⚡️ Highlights

- Ability to pass in custom components
- Control the number of pages to be displayed
- Ability to provide custom logic to collapse the pages
- Pass in innerStyles to Pagination component

### 🆕 Props added:

- **pages**: ( ***Required*** ) Pages to displayed in the pagination
- **defaultSelectedIndex**: The index of the defualt selected page
- **selectedIndex**: The index of currently selected page. Incase you want to control the selected page
- **collapseRange**: Function used to create a collapsed range of the pages to display
- **pageComponent**: A react component to be rendered instead of the defualt subtle atlaskit button.
- **previousPageComponent**: A react component to be rendered instead of the defualt subtle atlaskit button.
- **nextPageComponent**: A react component to be rendered instead of the defualt subtle atlaskit button.
- **ellipsisComponent**: A react component to be rendered instead of default ellipsis component.
- **innerStyles**: A styles object that is spread on the styles on the div wrapping pagination. Ideal for adding margins as required as per guideline.

### 🚨 Depcrecated Props:

- **defaultValue**: Please use ***defaultSelectedIndex*** instead
- **total**: Please use ***pages*** instead and pass in array of pages instead of just a number
- **value**: Please use ***selectedIndex*** instead

### ⏫ Props updated:

- **onChange**: The function signature has been updated to \`( event: SyntheticEvent, newSelectedPageIndex: number, analyticsEvent: UIAnalyticsEvent ) => void\`

### 💻 Upgrading:

In v8 we used to create pagination like following:

${code`
<Pagination
  total={10}
  onChange={e => console.log('page changed', e)}
/>
`}

In v9 instead of total we should pass in the array of pages. So, the above code needs to be re-written in v9 as:

${code`
<Pagination
  pages={[ ...Array(10).map((_, i) => i + 1) ]} // or [ 1, 2, 3, 4, 5,... , 10 ]
  onChange={(e, newSelectedPage) => console.log('page changed', newSelectedPage)}
/>
`}

### 𝌙 Advance Usage

#### Passing in custom component for pages:

We can you use the **previousPageComponent**, **nextPageComponent**, **pageComponent** and **ellipsisComponent** to replace the default components respectively.

Following usage will render the custom component passed in instead of the subtle @atlaskit/button for pages.

${code`
import Pagination from '@atlaskit/pagination';
import { Link } from 'react-router-dom';

// Wrapper component for right navigator
function RouterLinkNavigationRight (props) {
  const { pages, selectedIndex } = props;
  return <Link
      to={pages[selectedIndex + 1].to}
    >
      Next
    </Link>
}

// Wrapper component for left navigator
function RouterLinkNavigationLeft (props) {
  const { pages, selectedIndex } = props;
  return <Link
      to={pages[selectedIndex - 1].to}
    >
      Previous
    </Link>
}

// Wrapper component for page link
function RouterLinkPage (props) {
  const { page } = props;
  return <Link
      to={page.to}
    >
      {page.label}
    </Link>
}

<Pagination 
  pages={[{ label: '1', to: '/home' }, { label: '2', to: '/about' }, { label: '3', to: '/contact' } ]}
  pageComponent={RouterLink}
  previousPageComponent={RouterLinkNavigationLeft}
  previousPageComponent={RouterLinkNavigationRight}
/>
`}

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
    <DynamicTable
      head={{
        cells: [
          {
            key: 'before',
            content: 'Before',
          },
          {
            key: 'v4',
            content: 'In version 4',
          },
        ],
      }}
      rows={[
        {
          cells: [
            {
              key: 'current',
              content: 'current',
            },
            {
              key: 'value',
              content: 'value',
            },
          ],
          key: 'value',
        },
        {
          cells: [
            {
              key: 'defaultCurrent',
              content: 'defaultCurrent',
            },
            {
              key: 'defaultValue',
              content: 'defaultValue',
            },
          ],
          key: 'defaultValue',
        },
        {
          cells: [
            {
              key: 'onSetPage',
              content: 'onSetPage',
            },
            {
              key: 'onChange',
              content: 'onChange',
            },
          ],
          key: 'onChange',
        },
      ]}
    />
  )}
`;
