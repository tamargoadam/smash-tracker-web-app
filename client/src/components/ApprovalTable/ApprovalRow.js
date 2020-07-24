import TableCell from "@material-ui/core/TableCell/TableCell";
import {CustomCheckbox} from "./CustomCheckbox";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {lighten} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(() => ({
    tableRow: {
        "&$selected, &$selected:hover": {
            color: '#282c34',
                backgroundColor: lighten('#282c34', 0.85),
        }
    },
    selected: {}
}));

export default function ApprovalRow(props){
    const classes = useStyles();
    const {row, handleClick, isItemSelected, labelId} = props;

    return(
        <TableRow
            hover
            onClick={(event) => handleClick(event, row.key)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.key}
            selected={isItemSelected}
            classes={{selected: classes.selected}}
            className={classes.tableRow}
        >
            <TableCell padding="checkbox" className={classes.tableCell}>
                <CustomCheckbox
                    checked={isItemSelected}
                    inputProps={{'aria-labelledby': labelId}}
                />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.opponent}
            </TableCell>
            <TableCell align="right">
                {row.time}
            </TableCell>
            <TableCell align="right">
                {row.user_char}
            </TableCell>
            <TableCell align="right">
                {row.opponent_char}
            </TableCell>
            <TableCell align="right">
                {row.stage}
            </TableCell>
            <TableCell style={{color: row.win ? "Green" : "Red"}} align="right">
                {row.win ? "Win" : "Loss"}
            </TableCell>
        </TableRow>
    );
}