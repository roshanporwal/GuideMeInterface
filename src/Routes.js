import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import PATIENT_DASHBOARD from "./pages/patient_dashboard";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                   
                    <Route path="/patient_dashboard" component={PATIENT_DASHBOARD} />
                    
                </Switch>
            </Router>
        )
    }
}