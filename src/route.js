import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LeftMenu from './page/LeftMenu';
import Overview from './page/Home';
import GitHubStars from './page/GitHubInfo';
import Footprint from './page/Footprint';
import SVGDemo from './page/SVG/Overview';
import CanvasDemo from './page/CanvasDemo';
import ShangHai from './page/ShangHai';
import HangZhou from './page/HangZhou';

export const LeftMenuRoute = () =>
    <Route path="*" component={ LeftMenu }/>

export const ContentRoute = () =>
    <Switch>
        <Route exact path="/" component={ Overview }/>
        <Route exact path="/stars-info" component={ GitHubStars }/>
        <Route exact path="/footprint" component={ Footprint }/>
        <Route exact path="/svg" component={ SVGDemo }/>
        <Route exact path="/canvas" component={ CanvasDemo }/>
        <Route exact path="/shangHai" component={ ShangHai }/>
        <Route exact path="/hangZhou" component={ HangZhou }/>
    </Switch>

export default ContentRoute
