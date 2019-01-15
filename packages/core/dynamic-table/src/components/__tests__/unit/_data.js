// @flow

export const sortKey = 'first_name';
export const secondSortKey = 'last_name';
export const thirdSortKey = 'numeric';

export const head = {
  cells: [
    {
      key: sortKey,
      content: 'First name',
      isSortable: true,
    },
    {
      key: secondSortKey,
      content: 'Last name',
    },
    {
      key: thirdSortKey,
      content: 'Arbitrary numeric',
      isSortable: true,
    },
  ],
};

export const rows = [
  {
    cells: [
      {
        key: 'baob',
        content: 'Barack',
      },
      {
        content: 'Obama',
      },
      {
        content: 1,
      },
    ],
  },
  {
    cells: [
      {
        key: 'dotr',
        content: 'Donald',
      },
      {
        content: 'Trump',
      },
      {
        content: 0,
      },
    ],
  },
  {
    cells: [
      {
        key: 'hicl',
        content: 'Hillary',
      },
      {
        content: 'Clinton',
      },
      {
        content: -1,
      },
    ],
  },
  {
    cells: [
      {
        key: 'tjeff',
        content: 'Thomas',
      },
      {
        content: 'Jefferson',
      },
      {
        content: 20,
      },
    ],
  },
];

export const row = rows[0];

export const rowsWithKeys: Array<Object> = rows.map((tRow, rowIndex) => {
  return {
    key: `${rowIndex}`,
    ...tRow,
  };
});

export const rowWithKey = rowsWithKeys[0];

export const cellWithKey = rowWithKey.cells[0];
