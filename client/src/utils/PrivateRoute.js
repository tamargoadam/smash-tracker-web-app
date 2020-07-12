import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './AuthRequests';

// creates private route handler
export default function PrivateRoute({ render: Render, ...rest }) {
    return(
        <Route
            {...rest}
            render={(props) => getToken() ? <Render {...props} /> : <Redirect to={{pathname: '/signin', state: { from: props.location }}} />}
        />
    )
}