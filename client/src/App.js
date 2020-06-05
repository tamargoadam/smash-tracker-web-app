import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

//Components
import Home from "./views/home";
import NotFound from "./views/404"
import SignIn from "./views/signIn"
import SignUp from "./views/signUp"
import MatchUps from "./views/matchUps";


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
                        <Route exact path="/signin" component={SignIn}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/matchups" component={MatchUps}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}
