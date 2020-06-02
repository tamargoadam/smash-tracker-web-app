import React from 'react';
import { Link } from 'react-router-dom'
import Shine from '../../../assets/shine.png';
import Falco from '../../../assets/falco.png'
import Fox from '../../../assets/fox.png'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    home: {
        textAlign: 'center'
    },
    homeLogo: {
        height: '40vmin',
        pointerEvents: 'none',
        animationName: '$rotation',
        animationDuration: '25s',
        animationTimingFunction: 'linear',
        animationIterationCount:'infinite'
    },
    "@keyframes rotation": {
        from: {
            transform: "rotate(0deg)"
        },
        to: {
            transform: "rotate(360deg)"
        }
    },
    row: {
        display: 'flex'
    },
    col: {
        width: '33.33%',
        padding: '50px'
    },
    characterImage: {
        height: '40vmin'
    },
    header: {
        backgroundColor: '#282c34',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white'
    },
    link: {
        color: '#61dafb'
    }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <header className={classes.header}>
                <div className={classes.row}>
                    <div className={classes.col}>
                        <img src={Falco} className={classes.characterImage}/>
                    </div>
                    <div className={classes.col}>
                        <img src={Shine} className={classes.homeLogo} alt="logo"/>
                    </div>
                    <div className={classes.col}>
                        <img src={Fox} className={classes.characterImage}/>
                    </div>
                </div>
                <p>
                    Welcome to Smash Tracker!
                </p>
                <Link className={classes.link} to="/signin">
                    Sign in here to track your play
                </Link>
            </header>
        </div>
    );
}
