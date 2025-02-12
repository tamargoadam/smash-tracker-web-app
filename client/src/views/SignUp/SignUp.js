import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from "@material-ui/core/Box";
import Shine from "../../assets/shine.png";
import Copyright from "../../components/Copyright/Copyright";
import { CHARACTERS, STOCK_LOGOS, SNACKBAR_SEVERITY } from "../../constants/Constants"
import axios from "axios";
import Alert from "../../components/Alert/Alert";

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
    select: {
        width: '100%',
        height: '100%',
        borderRadius: '5px'
    },
    option: {
        backgroundRepeat: "no-repeat",
        textAlign: "right",
        height: 25
    },
    submit: {
        background: '#282c34',
        '&:hover': {
            background: "#4fafc9"
        },
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignUp(props) {
    const classes = useStyles();
    const [user, setUser] = useState(
        {
            data: {
                f_name: "",
                l_name: "",
                email: "",
                password: "",
                tag: "",
                main: "No Main"
            }
        });
    const [alert, setAlert] = React.useState({open: false, message: '', severity: SNACKBAR_SEVERITY.info});
    const {history} = props;

    const postUserData = async () => {
        // Post to sign up api
        axios.post(
            'http://127.0.0.1:5000/signup', user
        ).then(response =>
        {
            setAlert({
                open: true,
                message: 'Account successfully created!',
                severity: SNACKBAR_SEVERITY.success
            });
            setTimeout(() => history.push('/signin'), 2000)
        }
        ).catch(error =>
        {
            setAlert({
                open: true,
                message: error.response.data.message,
                severity: SNACKBAR_SEVERITY.error
            })
        });
    };

    return (
        <div className={classes.back}>
            <Container className={classes.container} component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img className={classes.logo} src={Shine} alt='shine'/>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={e => setUser({...user, data: {...user.data, f_name: e.target.value}})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={e => setUser({...user, data: {...user.data, l_name: e.target.value}})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={e => setUser({...user, data: {...user.data, email: e.target.value}})}
                                />
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
                                    onChange={e => setUser({...user, data: {...user.data, password: e.target.value}})}
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
                                    onChange={e => setUser({...user, data: {...user.data, tag: e.target.value}})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <select
                                    className={classes.select}
                                    required
                                    id="main"
                                    name="main"
                                    size='4'
                                    onChange={e => setUser({...user, data: {...user.data, main: e.target.value}})}
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
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
            <Alert alert={alert} setAlert={setAlert}/>
        </div>
    );
}