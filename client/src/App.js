import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

//Components
import Home from "./components/pages/home";
import NotFound from "./components/pages/404"
import SignIn from "./components/pages/signIn"
import SignUp from "./components/pages/signUp"
import Copyright from "./components/copyright"
import ViewGames from "./components/pages/viewGames";


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
                        <Route exact path="/viewgames" component={ViewGames}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}
