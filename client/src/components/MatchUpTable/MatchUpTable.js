import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MatchUpRow from './MatchUpRow'
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {fetchMatchUps} from "../../utils/Requests";
import {getUser} from "../../utils/AuthRequests";

// TODO: Style Table
const HeaderRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#4fafc9",
            fontWeight: "bold",
        },
    },
}))(TableRow);

export default function MatchUpTable(props) {
    const [matchUps, setMatchUps] = useState([]);

    useEffect( () => {
        fetchMatchUps(getUser()).then((response) => {
            // Set the topics state with the response data
            setMatchUps(response);
        })

    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <HeaderRow>
                        <TableCell />
                        <TableCell>Opponent</TableCell>
                        <TableCell align="right">Wins</TableCell>
                        <TableCell align="right">Losses</TableCell>
                    </HeaderRow>
                </TableHead>
                <TableBody>
                    {matchUps.map((row) => (
                        <MatchUpRow key={row.opponent} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

MatchUpTable.propTypes = {
    // match_ups: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         opponent: PropTypes.string.isRequired,
    //         opponent_tag: PropTypes.string.isRequired,
    //         wins: PropTypes.number.isRequired,
    //         losses: PropTypes.number.isRequired,
    //         games: PropTypes.arrayOf(
    //             PropTypes.shape({
    //                 user_char: PropTypes.string.isRequired,
    //                 opponent_char: PropTypes.string.isRequired,
    //                 stage: PropTypes.string.isRequired,
    //                 win: PropTypes.bool.isRequired,
    //                 user_stock: PropTypes.number.isRequired,
    //                 opponent_stock: PropTypes.number.isRequired,
    //                 user_approved: PropTypes.bool.isRequired,
    //                 opponent_approved: PropTypes.bool.isRequired,
    //                 date: PropTypes.string.isRequired
    //             }),
    //         ).isRequired,
    //     }).isRequired,
    // ).isRequired,

    approval: PropTypes.bool
};