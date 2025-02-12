import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LEGAL_STAGE_IMAGES, LEGAL_STAGES, GAME_DATA } from "../../constants/Constants";

const useStyles = makeStyles(() => ({
    scrollMenu: {
        backgroundColor: "#333",
        overflow: "auto",
        whiteSpace: "nowrap",
        border: "8px solid #333",
        borderRadius: "8px",
        "& div": {
            display: "inline-block",
            border: "0px",
            '&:hover': {
                background: "#4fafc9",
                border: "#4fafc9",
            },
            "& div": {
                border: "0px",
                display: "block",
                textAlign: "center",
                color: "white"
            }
        }
    },
}));

const selectedStyle={
    border: "4px solid #4fafc9"
};
const notSelectedStyle={
    border: "4px solid #333"
};

let menuItems = [];
LEGAL_STAGES.map((stage) =>
    menuItems.push(
        {
            option: <img src={LEGAL_STAGE_IMAGES[stage]} height="150px" width="200px" alt='stage'/>,
            value: stage
        }
    )
);
export default function StageScrollSelect(props) {
    const [selected, setSelected] = useState(LEGAL_STAGES[0]);
    const classes = useStyles();
    const { setStage } = props;

    return (
        <div className={classes.scrollMenu}>
            {menuItems.map((item, index) =>
                <div
                    onClick={
                        () =>
                        {
                            setSelected(item.value);
                            setStage(GAME_DATA.stage, item.value);
                        }
                    }
                    style={item.value === selected ? selectedStyle : notSelectedStyle}
                    key={index}
                >
                    {item.option}
                    <div>{item.value}</div>
                </div>)}
        </div>
    );
}