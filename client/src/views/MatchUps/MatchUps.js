import React from "react"
import {makeStyles} from "@material-ui/core/styles";
import MatchUpTable from '../../components/MatchUpTable/MatchUpTable'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer'

const useStyles = makeStyles(() => ({
    container: {
        height: "100vh",
        width: "100%",
        backgroundColor: "#282c34",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: 'column',
        overflowY: 'scroll'
    },
    head: {
        marginLeft: "10vh",
        fontSize: 'calc(10px + 4vmin)',
        color: 'white'
    },
    table: {
        alignSelf: "center",
        width: "80vw",
        marginBottom: "5vh",
    }
}));

export default function MatchUps(props) {
    const {history} = props;

    const classes = useStyles();

    // Render the topics
    return (
        <div className={classes.container}>
            <NavigationDrawer history={history}/>
            <h2 className={classes.head}>Your Match Ups</h2>
            <div className={classes.table} >
                <MatchUpTable/>
            </div>
        </div>
    )
}
