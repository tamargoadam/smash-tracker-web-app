import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { STOCK_LOGOS } from "../../constants/Constants";

const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        backgroundColor: 'LightGrey'
    },
});

export default function MatchUpRow(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.opponent_tag}
                </TableCell>
                <TableCell align="right">{row.wins}</TableCell>
                <TableCell align="right">{row.losses}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Game History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date, Time</TableCell>
                                        <TableCell align="right">Your Character</TableCell>
                                        <TableCell align="right">Opponent's Character</TableCell>
                                        <TableCell align="right">Stage</TableCell>
                                        <TableCell align="right">Win/Loss</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.games.map((gameRow) => (
                                        <TableRow key={gameRow.date}>
                                            <TableCell component="th" scope="row">
                                                {gameRow.date}
                                            </TableCell>
                                            <TableCell align="right">
                                                <img src={STOCK_LOGOS[gameRow.user_char]}/>
                                            </TableCell>
                                            <TableCell align="right">
                                                <img src={STOCK_LOGOS[gameRow.opponent_char]}/>
                                            </TableCell>
                                            <TableCell align="right">{gameRow.stage}</TableCell>
                                            <TableCell
                                                align="right"
                                                style={{color: gameRow.win ? "Green" : "Red"}}
                                            >
                                                {gameRow.win ? "Win" : "Loss"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

MatchUpRow.propTypes = {
    row: PropTypes.shape({
        opponent: PropTypes.string.isRequired,
        opponent_tag: PropTypes.string.isRequired,
        wins: PropTypes.number.isRequired,
        losses: PropTypes.number.isRequired,
        games: PropTypes.arrayOf(
            PropTypes.shape({
                user_char: PropTypes.string.isRequired,
                opponent_char: PropTypes.string.isRequired,
                stage: PropTypes.string.isRequired,
                win: PropTypes.bool.isRequired,
                user_stock: PropTypes.number.isRequired,
                opponent_stock: PropTypes.number.isRequired,
                user_approved: PropTypes.bool.isRequired,
                opponent_approved: PropTypes.bool.isRequired,
                date: PropTypes.string.isRequired
            }),
        ).isRequired,
    }).isRequired,
};
