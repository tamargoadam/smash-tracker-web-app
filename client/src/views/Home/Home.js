import React from 'react';
import { Link } from 'react-router-dom'
import Shine from '../../assets/shine.png';
import Falco from '../../assets/falco.png'
import Fox from '../../assets/fox.png'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    container: {
        textAlign: 'center',
        height: "100vh",
        width: "100%",
        backgroundColor: "#282c34",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: 'column',
        overflowY: 'scroll'
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
        width: '100%',
        display: 'flex'
    },
    col: {
        width: '33.33%',
        margin: 'auto'
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
        <div className={classes.container}>
            <header className={classes.header}>
                <div className={classes.row}>
                    <div className={classes.col}>
                        <img src={Falco} className={classes.characterImage} alt='falco'/>
                    </div>
                    <div className={classes.col}>
                        <img src={Shine} className={classes.homeLogo} alt="logo"/>
                    </div>
                    <div className={classes.col}>
                        <img src={Fox} className={classes.characterImage} alt='fox'/>
                    </div>
                </div>
                <p>
                    Welcome to Smash Tracker!
                </p>
                <Link className={classes.link} to="/matchups">
                    Track your play and view previous matches here!
                </Link>
            </header>
        </div>
    );
}
