import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from "@material-ui/core/Box";
import Shine from "../../assets/shine.png";
import Copyright from "../../components/copyright/copyright";
import { CHARACTERS, STOCK_LOGOS, SNACKBAR_SEVERITY } from "../../constants"
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import CharacterSelect from '../../components/characterSelect/characterSelect'
import StageScrollSelect from "../../components/stageScrollSelect/stageScrollSelect";

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
            'http://127.0.0.1:5000/signup', game
        ).then(response =>
            {
                setAlertSeverity(SNACKBAR_SEVERITY.success)
                setAlertMessage('Account successfully created!')
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
                            <Grid item xs={12} sm={6} justify="left">
                                <CharacterSelect placeholder="Select User Character..."/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CharacterSelect placeholder="Select Opponent Character..."/>
                            </Grid>
                            <Grid item xs={12}>
                                <StageScrollSelect/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={e => setGame({...game, data: {...game.data, password: e.target.value}})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="tag"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="tag"
                                    label="Tag"
                                    onChange={e => setGame({...game, data: {...game.data, tag: e.target.value}})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    className={classes.select}
                                    required
                                    id="main"
                                    name="main"
                                    size='4'
                                    onChange={e => setGame({...game, data: {...game.data, main: e.target.value}})}
                                >
                                    <option selected
                                            className={classes.option}
                                            style={{backgroundImage: "url("+STOCK_LOGOS["Smash Ball"]+")"}}
                                    >
                                        No Main
                                    </option>
                                    {CHARACTERS.map((char) =>
                                        <option
                                            className={classes.option}
                                            style={{backgroundImage: "url("+STOCK_LOGOS[char]+")"}}
                                        >
                                            {char}
                                        </option>
                                    )}
                                </select>
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