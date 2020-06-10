import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LEGAL_STAGE_IMAGES, LEGAL_STAGES } from "../../constants";

const useStyles = makeStyles(() => ({
    scrollMenu: {
        backgroundColor: "#333",
        overflow: "auto",
        whiteSpace: "nowrap",
        borderRadius: "8px",
        "& div": {
            display: "inline-block",
            border: "1px solid white",
            '&:hover': {
                background: "#4fafc9"
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

let menuItems = []
LEGAL_STAGES.map((stage) =>
    menuItems.push(
    <div>
        <img src={LEGAL_STAGE_IMAGES[stage]} height="150px" width="200px"/>
        <div>{stage}</div>
    </div>
    )
);
export default function StageScrollSelect() {
    const [selected, setSelected] = useState(LEGAL_STAGES[0]);
    const classes = useStyles();
    return (
        <div className={classes.scrollMenu}>
            {menuItems.map((item) => {return item;})}
        </div>
    );
}