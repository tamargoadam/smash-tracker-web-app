import React, {useState, useEffect} from "react"
import {makeStyles} from "@material-ui/core/styles";
// import {Link} from "react-router-dom"

// Use this for http requests
//import axios from 'axios'

const useStyles = makeStyles(() => ({
    container: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "#282c34",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: 'column'
    },
    head: {
        marginLeft: "10vh",
        fontSize: 'calc(10px + 4vmin)',
        color: 'white'
    },
    table: {
        alignSelf: "center",
        width: "80vw",
        backgroundColor: "white",
        border: "1px solid black",
        borderCollapse: "collapse",
        textAlign: "left"

    },
    tableElement: {
        border: "1px solid black",
        borderCollapse: "collapse",
        textAlign: "left"
    },
    row:{
        "&:hover": {
            backgroundColor: "#dcdcdc"
        }
     },
    matchUp: {
        backgroundColor: "#e6e6e6",
        "&:hover": {
            backgroundColor: "#dcdcdc"
        }
    }
}));

export default function ViewGames(props) {
    const [matchUps, setMatchUps] = useState([])
    const [expand, setExpand] = useState(null)

    const classes = useStyles();

    useEffect( () => {
        // Implement the fetchTopics function
        const fetchMatchUps = async () => {
            /*
            [{
                opponent: "o_name",
                wins: int,
                losses: int,
                games: {
                    ...
                }
            },
            ...]
            */

            // Call the topics api
            /*const response = await axios(
                '',
            );
            // Set the topics state with the response data
            setMatchUps(response.data);*/
            setMatchUps(
                [
                    {
                        opponent: "opponent 1",
                        wins: 5,
                        losses: 3,
                        games:
                            [
                                {'user_char': 'Captain Falcon', 'opponent_char': 'Falco', 'stage': 'Pokemon Stadium', 'win': true, 'user_stock': 1, 'opponent_stock': 0},
                                {'user_char': 'Captain Falcon', 'opponent_char': 'Kirby', 'stage': 'Final Destination', 'win': false, 'user_stock': 4, 'opponent_stock': 0},
                                {'user_char': 'Captain Falcon', 'opponent_char': 'Kirby', 'stage': 'Final Destination', 'win': true, 'user_stock': 4, 'opponent_stock': 0}
                            ]
                    },
                    {
                        opponent: "opponent 2",
                        wins: 1,
                        losses: 2,
                        games:
                            [
                                {'user_char': 'Captain Falcon', 'opponent_char': 'Falco', 'stage': 'Pokemon Stadium', 'win': true, 'user_stock': 1, 'opponent_stock': 0},
                                {'user_char': 'Falco', 'opponent_char': 'Kirby', 'stage': 'Final Destination', 'win': true, 'user_stock': 4, 'opponent_stock': 0},
                                {'user_char': 'Yoshi', 'opponent_char': 'Fox', 'stage': 'Final Destination', 'win': false, 'user_stock': 4, 'opponent_stock': 0}
                            ]
                    },
                    {
                        opponent: "opponent 3",
                        wins: 8,
                        losses: 5,
                        games:
                            [
                                {'user_char': 'Captain Falcon', 'opponent_char': 'Falco', 'stage': 'Pokemon Stadium', 'win': true, 'user_stock': 1, 'opponent_stock': 0},
                                {'user_char': 'Falco', 'opponent_char': 'Kirby', 'stage': 'Final Destination', 'win': true, 'user_stock': 4, 'opponent_stock': 0},
                                {'user_char': 'Yoshi', 'opponent_char': 'Fox', 'stage': 'Final Destination', 'win': false, 'user_stock': 4, 'opponent_stock': 0}
                            ]
                    }
                ]
            )
        }

        fetchMatchUps()
    }, [])

    // Render the topics
    return (
        <div className={classes.container}>
            <h1></h1>
            <h2 className={classes.head}>Your Match Ups</h2>
            <table className={classes.table} onMouseLeave={() => setExpand(null)}>
                {matchUps.map(matchUp =>
                    <tbody onMouseEnter={() => setExpand(matchUp.opponent)}>
                    <tr className={classes.matchUp}>
                        <th className={classes.tableElement} colSpan={1}>
                            {matchUp.opponent}
                        </th>
                        <td className={classes.tableElement} colSpan={2}>
                            {matchUp.wins} - {matchUp.losses}
                        </td>
                    </tr>
                    {
                        /*
                        For current game, render rows containing activity name, difficulty, and learning category
                        if 'expand' is current game.
                        */
                        matchUp.games.map(game =>
                        {
                            return expand == matchUp.opponent ?
                                <tr className={classes.row}>
                                    <td className={classes.tableElement}>
                                        {game.win ? "Win" : "Loss"}
                                    </td>
                                    <td className={classes.tableElement}>
                                        {game.user_stock} {game.user_char} vs. {game.opponent_stock} {game.opponent_char}
                                    </td>
                                    <td className={classes.tableElement}>
                                        {game.stage}
                                    </td>
                                </tr>: null
                        })
                    }
                    </tbody>
                )}
            </table>
        </div>
    )
}
