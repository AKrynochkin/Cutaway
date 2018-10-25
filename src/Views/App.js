import React, { PureComponent, Fragment } from 'react';

import { Header, Footer, MainArea } from 'Components';

export class App extends PureComponent {
  static propTypes = {};

  componentDidMount() {
    const pushState = history.pushState;

    history.pushState = function (state) {
      if (typeof history.onpushstate == 'function') {
        history.onpushstate({ state });
      }

      document.body.scrollTop = 0;

      return pushState.apply(history, arguments);
    };
  }

  render() {
    return (
      <Fragment>
        <Header />
        <MainArea />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
