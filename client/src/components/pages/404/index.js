import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Copyright from "../../copyright";

const useStyles = makeStyles(() => ({
    notFound: {
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#282c34',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white'
    }
}));

export default function NotFound() {
    const classes = useStyles();

    return (
        <div className={classes.notFound}>
            <header className={classes.header}>
                <div>
                    <h2 class=" mdc-typography--title">
                        404! Page not found.
                    </h2>
                </div>
                <div>
                    Looks like the page you are trying to access doesn't exist.
                </div>
            </header>
        </div>
    );
}