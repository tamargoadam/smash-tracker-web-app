import React, {useState, useEffect} from "react"
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios'
import MatchUpTable from '../../components/matchUpTable/matchUpTable'

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
    const [matchUps, setMatchUps] = useState([]);

    const classes = useStyles();

    useEffect( () => {
        const fetchMatchUps = async () => {
            // Call the matchups api
            const response = await axios(
                'http://127.0.0.1:5000/matchups/atamargo@ufl.edu',
            );
            // Set the topics state with the response data
            setMatchUps(response.data);
        }

        fetchMatchUps()
    }, [])

    // Render the topics
    return (
        <div className={classes.container}>
            <h2 className={classes.head}>Your Match Ups</h2>
            <div className={classes.table} >
                <MatchUpTable match_ups={matchUps}/>
            </div>
        </div>
    )
}
