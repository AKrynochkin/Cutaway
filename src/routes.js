import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Gallery } from './Views/Gallery';

export default () => (
  <Switch>
    <Route path='/' component={Gallery}/>
    <Redirect from='*' to='/' />
  </Switch>
);
