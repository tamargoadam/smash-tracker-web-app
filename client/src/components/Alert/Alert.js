import React from "react";
import MuiAlert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

export default function Alert(props) {
    const {alert, setAlert} = props;

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        let a = Object.assign({}, alert);
        a.open = false;
        setAlert(a);
    };

    return (
        <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
            <MuiAlert onClose={handleCloseAlert} elevation={6} variant="filled" severity={alert.severity}>
                {alert.message}
            </MuiAlert>
        </Snackbar>
    );
}