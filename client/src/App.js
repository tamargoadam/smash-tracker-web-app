import React, {Component, useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory
} from "react-router-dom";

//Components
import Home from "./views/home";
import NotFound from "./views/404"
import SignIn from "./views/signIn"
import SignUp from "./views/signUp"
import MatchUps from "./views/matchUps";
import GameInput from "./views/gameInput"


export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    let history = useHistory();

    return (
        <div id="app">
            <Switch>
                <Route exact path="/" render={() => <Home/>}/>
                <Route exact path="/signin" render={() => <SignIn setCurrentUser={setCurrentUser} history={history}/>}/>
                <Route exact path="/signup" render={() => <SignUp/>}/>
                <Route exact path="/matchups" render={() => <MatchUps currentUser={currentUser}/>}/>
                <Route exact path="/gameinput" render={() => <GameInput/>}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    );
}
