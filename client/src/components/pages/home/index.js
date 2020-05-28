import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import shine from '../../../assets/shine.png';
import falco from '../../../assets/falco.png'
import fox from '../../../assets/fox.png'
import './index.css';

export default class App extends Component {
    render() {
        return (
            <div className="Home">
                <header className="Header">
                    <div className="Row">
                        <div className="Col">
                            <img src={falco} className="Character-image"/>
                        </div>
                        <div className="Col">
                            <img src={shine} className="Home-logo" alt="logo"/>
                        </div>
                        <div className="Col">
                            <img src={fox} className="Character-image"/>
                        </div>
                    </div>
                    <p>
                        Welcome to Smash Tracker!
                    </p>
                    <Link className="Link" to="/login"
                    >
                        Login here to track your play
                    </Link>
                </header>
            </div>
        );
    }
}
