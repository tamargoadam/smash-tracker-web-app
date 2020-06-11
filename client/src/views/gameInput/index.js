import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from "@material-ui/core/Box";
import Shine from "../../assets/shine.png";
import Copyright from "../../components/copyright/copyright";
import { SNACKBAR_SEVERITY } from "../../constants"
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import CharacterSelect from '../../components/characterSelect/characterSelect'
import StageScrollSelect from "../../components/stageScrollSelect/stageScrollSelect";
import StockSlider from "../../components/stockSlider/stockSlider";
import ToggleSwitch from "../../components/toggleSwitch/toggleSwitch";

const useStyles = makeStyles((theme) => ({
    back: {
        background: '#282c34',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'scroll'
    },
    container: {
        border: '12px solid #282c34',
        background: 'white',
        borderRadius:20,
        width: "70vmax"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: '10vmin'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    grid: {
        alignContent: "center"
    },
    select: {
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        zIndex: "-1"
    },
    optionTitle: {
        textAlign: "center",
        height: 25,
        paddingTop: "3%"
    },
    option: {
        backgroundRepeat: "no-repeat",
        textAlign: "right",
        height: 25,
    },
    submit: {
        background: '#282c34',
        '&:hover': {
            background: "#4fafc9"
        },
        width: "100%",
        margin: theme.spacing(5, 0, 2),
    },
}));


export default function GameInput() {
    const classes = useStyles();
    const [game, setGame] = useState(
        {
            data: {
                user_char: "",
                opponent_char: "",
                stage: "",
                win: true,
                user_stock: 4,
                opponent_stock: 4
            }
        });
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertSeverity, setAlertSeverity] = React.useState(SNACKBAR_SEVERITY.info);

    const postUserData = async () => {
        // Post to sign up api
        axios.post(
            'http://127.0.0.1:5000/gameInput', game
        ).then(response =>
            {
                setAlertSeverity(SNACKBAR_SEVERITY.success)
                setAlertMessage('Game record successfully submitted!')
                setOpenAlert(true);
            }
        ).catch(error =>
        {
            setAlertSeverity(SNACKBAR_SEVERITY.error)
            setAlertMessage(error.response.data.message)
            setOpenAlert(true);
        });
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <div className={classes.back}>
            <Container className={classes.container} component="main">
                <CssBaseline />
                <div className={classes.paper}>
                    <img className={classes.logo} src={Shine}/>
                    <Typography component="h1" variant="h5">
                        Enter Your Game Info
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2} className={classes.grid}>
                            <Grid item xs={12} sm={4} justify="left">
                                <CharacterSelect placeholder="Select User Character..."/>
                            </Grid>
                            <Grid item xs={12} sm={4}/>
                            <Grid item xs={12} sm={4}>
                                <CharacterSelect placeholder="Select Opponent Character..."/>
                            </Grid>
                            <Grid item xs={12}>
                                <StageScrollSelect/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <StockSlider player="User"/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <ToggleSwitch toggledText="Win" notToggledText="Loss"/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <StockSlider player="Opponent"/>
                            </Grid>
                        </Grid>
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={postUserData}
                        >
                            Submit Game
                        </Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <MuiAlert onClose={handleCloseAlert} elevation={6} variant="filled" severity={alertSeverity}>
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}