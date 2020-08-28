import React, {useEffect, useState, useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import {approveGames, fetchGames} from "../../utils/Requests";
import {getUser} from "../../utils/AuthRequests";

import ApprovalTableToolbar from './ApprovalTableToolBar'
import ApprovalTableHead from './ApprovalTableHead'
import ApprovalRow from "./ApprovalRow";
import {SNACKBAR_SEVERITY} from "../../constants/Constants";
import Alert from "../Alert/Alert"

function createData(key, opponent, time, user_char, opponent_char, stage, win) {
    return {key, opponent, time, user_char, opponent_char, stage, win};
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        border: 'solid 4px #4fafc9'
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
}));

export default function ApprovalTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [games, _setGames] = useState([]);
    const [gameRows, setGameRows] = useState([]);
    const [alert, setAlert] = React.useState({open: false, message: '', severity: SNACKBAR_SEVERITY.info});


    const  setGames = useCallback((g) => {
        // sets games and gameRows states
        _setGames(g);
        let rows = [];
        g.forEach(game => {
            let opponent = "";
            let user_char = "";
            let opponent_char = "";
            let win = false;
            let approved = false;
            game.player_matches.forEach(pm => {
                if (pm.user === getUser()._id) {
                    user_char = pm.character;
                    win = pm.win;
                    approved = pm.approved
                } else {
                    opponent = pm.email;
                    opponent_char = pm.character
                }
            });
            if (!approved) rows.push(createData(game._id, opponent, game.date, user_char,
                opponent_char, game.stage, win));
        });
        setGameRows(rows)
    }, [_setGames, setGameRows]);

    useEffect(() => {
        fetchGames(getUser()).then(async (g) => {
            // Set the topics state with the response data
            setGames(g)
        });
    }, [setGames]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleApproveGames = () => {
        approveGames(selected).then(() => {
            let g = [...games];
            g = g.filter(game => !selected.some(s => s === game._id));
            setGames(g);
                setAlert({
                    open: true,
                    message: 'The selected games have been successfully approved!',
                    severity: SNACKBAR_SEVERITY.success
                })
            }
        ).catch(error => {
            setAlert({
                open: true,
                message: error.response.data.message ?
                    error.response.data.message :
                    "An error has occurred while attempting to approve the selected games.",
                severity: SNACKBAR_SEVERITY.error
            })
        });
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = gameRows.map((n) => n.key);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, key) => {
        const selectedIndex = selected.indexOf(key);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, key);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (key) => selected.indexOf(key) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <ApprovalTableToolbar handleApproveGames={handleApproveGames} numSelected={selected.length}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="enhanced table"
                    >
                        <ApprovalTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={gameRows.length}
                        />
                        <TableBody>
                            {stableSort(gameRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.key);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <ApprovalRow
                                            row={row}
                                            handleClick={handleClick}
                                            isItemSelected={isItemSelected}
                                            labelId={labelId}
                                        />
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={gameRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Alert alert={alert} setAlert={setAlert}/>
        </div>
    );
}
