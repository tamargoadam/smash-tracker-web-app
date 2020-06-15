import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
        toggledButton: {
            display: "block",
            width: "100%",
            height: "60px",
            textAlign: "center",
            border: "2px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            fontSize: "20px",
        },
        notToggledButton: {
            display: "block",
            width: "100%",
            height: "60px",
            textAlign: "center",
            border: "2px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            fontSize: "20px",
        }
    })
);

const toggleTrueStyle = {
    background: 'green',
    color: 'white',
    opacity: "0.7",
};

const toggleFalseStyle = {
    background: 'red',
    color: 'white',
    opacity: "0.7",
};

export default function ToggleSwitch(props) {
    const classes = useStyles();
    const { toggledText, notToggledText, setTrue} = props;
    const [toggle, setToggle] = React.useState(true);

    return (
        <Grid component="label" container alignItems="center" spacing={0}>
            <Grid item xs={12} sm={12}>
                <button type="button"
                        className={classes.toggledButton}
                        style={toggle ? toggleTrueStyle : {}}
                        onClick={() =>
                        {
                            setToggle(true);
                            setTrue(true);
                        }}
                >
                    {toggledText}
                </button>
            </Grid>
            <Grid item xs={12} sm={12}>
                <button type="button"
                        className={classes.notToggledButton}
                        style={!toggle ? toggleFalseStyle : {}}
                        onClick={() =>
                        {
                            setToggle(false);
                            setTrue(false);
                        }}
                >
                    {notToggledText}
                </button>
            </Grid>
        </Grid>
    );
}

ToggleSwitch.protoTypes = {
    toggledText: PropTypes.string.isRequired,
    notToggledText: PropTypes.string.isRequired,
};