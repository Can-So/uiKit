//@flow
import React, { Component } from 'react';
import { gridSize } from '@atlaskit/theme';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {
  RouterLink,
  RouterLinkLeft,
  RouterLinkRight,
} from './helpers/LinkComponent';
import Pagination from '../src';

const pages = [
  {
    href: '/',
    label: '1',
  },
  {
    href: '/about',
    label: '2',
  },
  {
    href: '/contact',
    label: '3',
  },
];

const Dashboard = () => (
  <div>
    <h1>Dashboard page</h1>
    <PaginationWithSelectPage pageSelected={1} />
  </div>
);
const About = () => (
  <div>
    <h1>About page</h1>
    <PaginationWithSelectPage pageSelected={2} />
  </div>
);
const Contact = () => (
  <div>
    <h1>Contact page</h1>
    <PaginationWithSelectPage pageSelected={3} />
  </div>
);

const PaginationWithSelectPage = ({
  pageSelected,
}: {
  pageSelected: number,
}) => (
  <div style={{ marginTop: `${gridSize() * 3} px` }}>
    <Pagination
      getPageLabel={page => (typeof page === 'object' ? page.label : page)}
      selectedIndex={pageSelected}
      pages={pages}
      components={{
        Page: RouterLink,
        Previous: RouterLinkLeft,
        Next: RouterLinkRight,
      }}
    />
  </div>
);

export default class WithReactRouterLink extends Component<{}> {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/" isExact component={Dashboard} />
        </Switch>
      </HashRouter>
    );
  }
}
