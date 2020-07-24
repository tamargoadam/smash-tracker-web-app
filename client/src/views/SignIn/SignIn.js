import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Shine from '../../assets/shine.png';
import Copyright from '../../components/Copyright/Copyright'
import {SNACKBAR_SEVERITY} from "../../constants/Constants";
import MuiAlert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {postUserData} from "../../utils/Requests"
import {setUserSession} from "../../utils/AuthRequests"


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
        borderRadius:20
    },
    logo: {
        width: '10vmin'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        background: '#282c34',
        '&:hover': {
            background: "#4fafc9"
        },
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [user, setUser] = useState(
        {
            data: {
                email: "",
                password: "",
            }
        });
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertSeverity, setAlertSeverity] = React.useState(SNACKBAR_SEVERITY.info);

    const handleLogin = async () => {
        // Post to sign in api
        try {
            const response = await postUserData(user);
            console.log(response);
            setUserSession(response.jwt, response.user);
            props.history.push('/matchups')
        }
        catch(error){
            setAlertSeverity(SNACKBAR_SEVERITY.error);
            setAlertMessage(error.response.data ?
                error.response.data.message : "An error has occurred during the sign in process."
            );
            setOpenAlert(true);
        };
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <div className={classes.back}>
            <Container className={classes.container} component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <img className={classes.logo} src={Shine} alt='shine'/>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onKeyPress={e => {if(e.key === 'Enter') handleLogin()}} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setUser({...user, data: {...user.data, email: e.target.value}})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setUser({...user, data: {...user.data, password: e.target.value}})}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
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