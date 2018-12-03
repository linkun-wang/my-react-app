import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LeftMenu from './page/LeftMenu';
import Overview from './page/Overview';
import Option1 from './page/GitHubInfo';

export const LeftMenuRoute = () =>
    <Route path="*" component={ LeftMenu }/>

export const ContentRoute = () =>
    <Switch>
        <Route exact path="/" component={ Overview }/>
        <Route exact path="/stars-info" component={ Option1 }/>
    </Switch>

export default ContentRoute
