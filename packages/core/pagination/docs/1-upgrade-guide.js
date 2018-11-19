//@flow
import React from 'react';
import { code, md } from '@atlaskit/docs';
import DynamicTable from '@atlaskit/dynamic-table';

export default md`
## v8 to v9

### ⚡️ Highlights

- Ability to extend the pagination UI with custom components
- Control the maximum number of pages to be displayed
- Ability to customise the logic to collapse the pagination affordance
- Pass in extra styling to the pagination container component so you can omit the use of style wrappers

### 💻 Upgrading:

In v8 we used to create pagination components like the following:

${code`
<Pagination
  total={10}
  onChange={e => console.log('page changed', e)}
/>
`}

The above code could be written in v9 as:

${code`
<Pagination
  pages={[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]} // or [ ...Array(10) ].map((_, i) => i + 1)
  onChange={(e, newSelectedPage) => console.log('page changed', newSelectedPage)}
/>
`}

### 🆕 Props added:

- **pages**: ( ***Required*** ) Array of pages to the rendered by the Pagination component
- **defaultSelectedIndex**: The index of the page to be selected by default
- **selectedIndex**: The index of the page to be selected.
- **collapseRange**: A function which should return an Array of pages to be rendered by Pagination component
- **pageComponent**: A react component to be rendered instead of the default subtle atlaskit button.
- **previousPageComponent**: A react component to be rendered instead of the default subtle atlaskit button.
- **nextPageComponent**: A react component to be rendered instead of the default subtle atlaskit button.
- **ellipsisComponent**: A react component to be rendered instead of default ellipsis component.
- **innerStyles**: A styles object that is spread on the styles on the div wrapping pagination. Ideal for adding margins as required by the ADG guideline.

### 🚨 Depcrecated Props:

- **defaultValue**: Please use ***defaultSelectedIndex*** prop instead
- **total**: Please use ***pages*** prop and pass in array of pages instead
- **value**: Please use ***selectedIndex*** prop instead

### ⏫ Props updated:

- **onChange**: The function signature has been updated to \`( event: SyntheticEvent, newSelectedPageIndex: number, analyticsEvent: UIAnalyticsEvent ) => void\`

### 𝌙 Advance Usage

#### Passing in the <Link> component from react-router

You can replace parts of the pagination UI by passing in previousPageComponent, nextPageComponent, pageComponent and ellipsisComponent.

The following will render the pagination component by replacing the @atlaskit/button component with the <Link> component from react-router.

${code`
import Pagination from '@atlaskit/pagination';
import { Link } from 'react-router-dom';

// Wrapper component for page link
function RouterLink (props) {
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
