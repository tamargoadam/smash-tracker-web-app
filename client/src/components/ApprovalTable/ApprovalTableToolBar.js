import {lighten, makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ApproveIcon from '@material-ui/icons/CheckCircleOutline';
import DeclineIcon from '@material-ui/icons/HighlightOff';
import React from "react";
import PropTypes from "prop-types";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: '#4fafc9',
                backgroundColor: lighten('#282c34', 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    approveIcon: {
        color: 'green',
        '&:hover': {
            background: lighten('#00ff00', .9)
        }
    },
    declineIcon: {
        color: '#db0e00',
        '&:hover': {
            background: lighten('#db0e00', .9)
        }
    }
}));

export default function ApprovalTableToolbar(props) {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Games to be Approved
                </Typography>
            )}

            {numSelected > 0 ? (
                <>
                    <Tooltip title="Approve">
                        <IconButton aria-label="approve" className={classes.approveIcon}>
                            <ApproveIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Decline">
                        <IconButton aria-label="decline" className={classes.declineIcon}>
                            <DeclineIcon/>
                        </IconButton>
                    </Tooltip>
                </>
            ) : null}
        </Toolbar>
    );
};

ApprovalTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
