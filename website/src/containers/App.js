// @flow

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled, { injectGlobal } from 'styled-components';
import LayerManager from '@atlaskit/layer-manager';
import Page, { Grid, GridColumn } from '@atlaskit/page';

import Home from '../pages/Home';
import ChangeLogExplorer from '../pages/ChangeLogExplorer';
import Examples from '../pages/Examples';
import FourOhFour from '../pages/FourOhFour';
import Pattern from '../pages/Pattern';
import PatternsInfo from '../pages/PatternsInfo';
import Document from '../pages/Document';
import Package from '../pages/Package';
import PackagesList from '../pages/PackagesList';
import PackageDocument from '../pages/PackageDocument';
import ChangelogModal from '../pages/Package/ChangelogModal';
import ExamplesModal from '../pages/Package/ExamplesModal';
import AnalyticsListeners from '../components/Analytics/AnalyticsListeners';

import Nav from './Nav';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const AppContent = styled.div`
  flex: 1 1 auto;
`;

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

const ScrollHandler = withRouter(ScrollToTop);

class Boundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    let { hasError } = this.state;
    if (hasError) {
      return <FourOhFour />;
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsListeners>
        <Route>
          <ScrollHandler />
        </Route>
        <Switch>
          <Route
            path="/examples/:groupId?/:pkgId?/:exampleId*"
            component={Examples}
          />
          <Route>
            <LayerManager>
              <Page navigation={<Nav />}>
                <Boundary>
                  <Grid>
                    <GridColumn>
                      <AppContent>
                        <Switch>
                          <Route
                            path="/mk-2"
                            render={props => (
                              <Redirect
                                to={props.location.pathname.replace(
                                  '/mk-2',
                                  '',
                                )}
                              />
                            )}
                          />
                          <Route
                            path="/components"
                            render={props => (
                              <Redirect
                                to={props.location.pathname.replace(
                                  '/components',
                                  '/packages/core',
                                )}
                              />
                            )}
                          />
                          <Route exact path="/" component={Home} />
                          <Route path="/docs/:docId*" component={Document} />
                          <Route
                            path="/patterns"
                            component={PatternsInfo}
                            exact
                          />

                          <Route
                            path="/patterns/:patternId*"
                            component={Pattern}
                          />
                          <Route
                            path="/packages/examples"
                            component={({ location }) => (
                              <Redirect
                                to={location.pathname.replace('/examples', '')}
                              />
                            )}
                          />
                          <Route
                            path="/packages/:groupId/:pkgId/docs/:docId"
                            component={PackageDocument}
                          />

                          <Route
                            path="/packages/:groupId/:pkgId"
                            component={Package}
                          />
                          <Route path="/packages" component={PackagesList} />
                          <Route
                            path="/changelog/:groupId/:pkgId/:semver?"
                            component={ChangeLogExplorer}
                          />
                          <Route path="/error" component={FourOhFour} />
                          <Route component={FourOhFour} />
                        </Switch>

                        <Route
                          path="/packages/:groupId/:pkgId/changelog/:semver?"
                          component={ChangelogModal}
                        />
                        <Route
                          path="/packages/:groupId/:pkgId/example/:exampleId"
                          component={ExamplesModal}
                        />
                      </AppContent>
                    </GridColumn>
                  </Grid>
                </Boundary>
              </Page>
            </LayerManager>
          </Route>
        </Switch>
      </AnalyticsListeners>
    </BrowserRouter>
  );
}
