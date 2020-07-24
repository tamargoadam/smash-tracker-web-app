import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import {CustomCheckbox} from "./CustomCheckbox"
import React from "react";

const headCells = [
    {id: 'opponent', numeric: false, disablePadding: true, label: 'Opponent'},
    {id: 'time', numeric: false, disablePadding: true, label: 'Date, Time'},
    {id: 'user_char', numeric: false, disablePadding: false, label: 'Your Character'},
    {id: 'opponent_char', numeric: false, disablePadding: false, label: 'Opponent Character'},
    {id: 'stage', numeric: false, disablePadding: false, label: 'Stage'},
    {id: 'win', numeric: false, disablePadding: false, label: 'Win/Loss'},
];

export default function ApprovalTableHead(props) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <CustomCheckbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'select all desserts'}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.id === 'opponent' ? 'left' : 'right'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

ApprovalTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};