import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import Shine from '../../../assets/shine.png';
import Falco from '../../../assets/falco.png'
import Fox from '../../../assets/fox.png'
import './index.css';

export default class App extends Component {
    render() {
        return (
            <div className="Home">
                <header className="Header">
                    <div className="Row">
                        <div className="Col">
                            <img src={Falco} className="Character-image"/>
                        </div>
                        <div className="Col">
                            <img src={Shine} className="Home-logo" alt="logo"/>
                        </div>
                        <div className="Col">
                            <img src={Fox} className="Character-image"/>
                        </div>
                    </div>
                    <p>
                        Welcome to Smash Tracker!
                    </p>
                    <Link className="Link" to="/signin">
                        Sign in here to track your play
                    </Link>
                </header>
            </div>
        );
    }
}
