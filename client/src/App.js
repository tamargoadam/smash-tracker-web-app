import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

//Components
import Home from "./components/pages/home";
import NotFound from "./components/pages/404"


export default class App extends Component {

    handleRoute = e => {
        this.setState({
            currentUrl: e.url
        });
    };

    render() {
        return (
            <div id="app">
                <Router onChange={this.handleRoute}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}
