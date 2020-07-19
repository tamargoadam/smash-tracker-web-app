import React, {useState} from 'react';
import {
    Route,
    Switch,
    useHistory
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute"

//Components
import Home from "./views/Home/Home";
import NotFound from "./views/404/404"
import SignIn from "./views/SignIn/SignIn"
import SignUp from "./views/SignUp/SignUp"
import MatchUps from "./views/MatchUps/MatchUps";
import GameInput from "./views/GameInput/GameInput"
import Notifications from "./views/Notifications/Notifications"


export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    let history = useHistory();

    return (
        <div id="app">
            <Switch>
                <Route exact path="/" render={() => <Home/>}/>
                <Route exact path="/signin" render={() => <SignIn setCurrentUser={setCurrentUser} history={history}/>}/>
                <Route exact path="/signup" render={() => <SignUp/>}/>
                <PrivateRoute exact path="/matchups" render={() => <MatchUps currentUser={currentUser} history={history}/>}/>
                <PrivateRoute exact path="/gameinput" render={() => <GameInput history={history}/> }/>
                <PrivateRoute exact path="/notifications" render={() => <Notifications history={history}/> }/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    );
}
