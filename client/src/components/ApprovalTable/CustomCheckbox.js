import {lighten, withStyles} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

const checkBoxStyles = () => ({
    root: {
        color: '#4fafc9',
        '&:hover': {
            background: lighten('#4fafc9', .8),
        },
        '&$checked': {
            color: '#4fafc9',
            '&:hover': {
                background: lighten('#282c34', 0.90),
            }
        },
    },
    checked: {},
});

export const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);