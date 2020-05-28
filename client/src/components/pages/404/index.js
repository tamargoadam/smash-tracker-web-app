import React, { Component } from 'react';

export default class NotFound extends Component {
    render() {
        return (
            <div className="NotFound">
                <header className="Header">
                    <div>
                        <h2 class=" mdc-typography--title">404! Page not found.</h2>
                    </div>
                    <div>
                        Looks like the page you are trying to access doesn't exist.
                    </div>
                </header>
            </div>
        );
    }
}