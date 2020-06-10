import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LEGAL_STAGE_IMAGES, LEGAL_STAGES } from "../../constants";

const classes = makeStyles(() => ({
    scrollMenu: {
        backgroundColor: "#333",
        overflow: "auto",
        whiteSpace: "nowrap",
        borderRadius: "8px"
    },
    menuItem: {
        display: "inline-block",
        '&:hover': {
            background: "#4fafc9"
        },
    },
    itemLabel: {
        textAlign: "center",
        color: "white"
    }
}));

let menuItems = []
LEGAL_STAGES.map((stage) =>
    menuItems.push(
    <div className={classes.menuItem}>
        <img src={LEGAL_STAGE_IMAGES[stage]} height="150px" width="200px"/>
        <div className={classes.itemLabel}>{stage}</div>
    </div>
    )
);
export default function StageScrollSelect() {
    const [selected, setSelected] = useState(LEGAL_STAGES[0]);

    return (
        <div className={classes.scrollMenu}>
            {menuItems}
        </div>
    );
}