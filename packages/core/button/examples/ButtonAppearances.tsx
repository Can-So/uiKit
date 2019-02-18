import * as React from 'react';
import { Checkbox } from '@atlaskit/checkbox';
import Button, { ButtonAppearances } from '../src';

const appearances: ButtonAppearances[] = [
  'default',
  'primary',
  'link',
  'subtle',
  'subtle-link',
  'warning',
  'danger',
  'help',
];

const Table = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ display: 'table' }} {...props} />
);
const Row = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ display: 'table-row' }} {...props} />
);
const Cell = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ display: 'table-cell', padding: 4 }} {...props} />
);

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export type State = {
  showLoadingState: boolean;
};

export default class ButtonAppearance extends React.Component<{}, State> {
  state = { showLoadingState: false };

  render() {
    const { showLoadingState } = this.state;

    return (
      <React.Fragment>
        <Checkbox
          value="showLoading"
          label="Show Loading State"
          onChange={({ target }: React.SyntheticEvent<HTMLInputElement>) =>
            this.setState({
              showLoadingState: (target as HTMLInputElement).checked,
            })
          }
          name="show-loading"
        />
        <Table>
          {appearances.map(a => (
            <Row key={a}>
              <Cell>
                <Button isLoading={showLoadingState} appearance={a}>
                  {capitalize(a)}
                </Button>
              </Cell>
              <Cell>
                <Button
                  isLoading={showLoadingState}
                  appearance={a}
                  isDisabled={true}
                >
                  Disabled
                </Button>
              </Cell>
              <Cell>
                <Button
                  isLoading={showLoadingState}
                  appearance={a}
                  isSelected={true}
                >
                  Selected
                </Button>
              </Cell>
            </Row>
          ))}
        </Table>
      </React.Fragment>
    );
  }
}
