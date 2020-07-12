import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import { GAME_DATA } from "../../constants/Constants";

const useStyles = makeStyles(() => ({
    slider: {
        "-webkit-appearance": "none",
        width: "90%",
        height: "10",
        background: "#4fafc9",
        border: "solid black",
        borderRadius: "15px",
        outline: "none",
        opacity: "0.7",
        "-webkit-transition": ".2s",
        transition: "opacity .2s",
        "&:hover": {
            opacity: 1,
        },
        "&::-webkit-slider-thumb": {
            "-webkit-appearance": "none",
            appearance: "none",
            width: "25px",
            height: "25px",
            borderRadius: "15px",
            background: 'black',
            cursor: "pointer",
        },

        "&::-moz-range-thumb": {
            width: "25px",
            height: "25px",
            borderRadius: "15px",
            background: '#282c34',
            cursor: "pointer",
        }
    }})
);

export default function StockSlider(props) {
    const classes = useStyles();
    const { player, setStocks, isUser } = props;
    const [selected, setSelected] = useState(0);

    return (
        <div>
            <p>Stocks remaining for player, {player}:</p>
            <input
                type="range"
                min="0"
                max="4"
                value={selected}
                id="stocks"
                className={classes.slider}
                onChange={e => {
                    setSelected(e.target.value);
                    setStocks(isUser ? GAME_DATA.user_stock : GAME_DATA.opponent_stock, e.target.value);
                }}
            />
            {selected}
        </div>
    );
}

StockSlider.protoTypes = {
    player: PropTypes.string
};
