// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Select from '@atlaskit/select';
import TableTree, {
  Headers,
  Header,
  Rows,
  Row,
  Cell,
  toTableTreeData,
} from '../src';

function getItemsData(parent, count) {
  //console.log(parent);
  return generateChildItems(parent || { numberingPath: '' }, count);
}

function generateChildItems(parent, count) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const number = i + 1;
    const numbering = `${parent.numberingPath}${number}`;
    items.push({
      numbering,
      title: `Item ${numbering}`,
      numberingPath: `${numbering}.`,
      id: `${parent.numberingPath}${number}`,
    });
  }
  return items;
}

const PerformanceTweakContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background: rgba(100%, 100%, 100%, 0.8);
  border: 5px solid rgba(0, 0, 0, 0.8);
  border-width: 5px 0 0 5px;
  padding: 20px;
  width: 450px;
`;

type State = {
  itemsById: Object,
  rootIds: Array<number | string>,
  childCount: number,
  totalCount: number,
  rootItems?: Array<Object>,
  selectedChildCountOption: Object,
};

const childCountPerItem = 100;
const childCountOptions = [
  {
    label: 10,
    value: 10,
  },
  {
    label: 20,
    value: 20,
  },
  {
    label: 50,
    value: 50,
  },
  {
    label: 100,
    value: 100,
  },
  {
    label: 200,
    value: 200,
  },
  {
    label: 500,
    value: 500,
  },
  {
    label: 1000,
    value: 1000,
  },
];

export default class extends PureComponent<{}, State> {
  state: State = {
    childCount: childCountPerItem,
    totalCount: childCountPerItem,
    selectedChildCountOption: childCountOptions[3],
    ...toTableTreeData(getItemsData(undefined, 100)),
  };

  handleExpand = (parentItem: Object) => {
    this.setState({
      ...toTableTreeData(
        getItemsData(parentItem, 100),
        parentItem,
        this.state.itemsById,
      ),
      totalCount:
        this.state.totalCount + this.state.selectedChildCountOption.value,
    });
  };

  handleItemsCountChange = (option: Object) => {
    this.setState({
      rootItems: getItemsData(undefined, option.value),
      selectedChildCountOption: option,
    });
  };

  render() {
    const { rootIds, itemsById } = this.state;
    return (
      <div style={{ position: 'relative' }}>
        <TableTree>
          <Headers>
            <Header width={300}>Chapter title</Header>
            <Header width={100}>Numbering</Header>
            <Header width={100}>Stuff</Header>
          </Headers>
          <Rows
            items={rootIds && rootIds.map(rootId => itemsById[rootId])}
            render={({ title, numbering, childIds }) => (
              <Row
                itemId={numbering}
                hasChildren
                onExpand={this.handleExpand}
                items={childIds && childIds.map(id => itemsById[id])}
              >
                <Cell singleLine>{title}</Cell>
                <Cell singleLine>{numbering}</Cell>
                <Cell singleLine>
                  <strong>B</strong>
                  <em>I</em>
                </Cell>
              </Row>
            )}
          />
        </TableTree>
        <PerformanceTweakContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>Tree children per item:</div>
            <div style={{ width: '90px', margin: '0 20px 0 10px' }}>
              <Select
                hasAutocomplete={false}
                shouldFocus={false}
                options={childCountOptions}
                onChange={this.handleItemsCountChange}
                value={this.state.selectedChildCountOption}
                placeholder="choose"
              />
            </div>
            <div>
              Items loaded total: <strong>{this.state.totalCount}</strong>
            </div>
          </div>
        </PerformanceTweakContainer>
      </div>
    );
  }
}
