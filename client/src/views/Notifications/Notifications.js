import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MailIcon from '@material-ui/icons/Mail';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NavigationDrawer from "../../components/NavigationDrawer/NavigationDrawer";
import MatchUpTable from "../../components/MatchUpTable/MatchUpTable";

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
        borderRadius: 20,
        width: "70vmax"
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    indicator: {
        backgroundColor: '#4fafc9',
    },
    label: {
        color: '#4fafc9'
    }
}));

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function Notifications(props) {
    const [value, setValue] = useState(0);
    const {history} = props;
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.back}>
            <NavigationDrawer history={history}/>
            <Container className={classes.container}>
                <Paper className={classes.paper} elevation={0}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="notification tabs"
                        classes={{
                            indicator: classes.indicator,
                        }}
                    >
                        <Tab
                            icon={<CheckCircleIcon/>}
                            className={value === 0 ? classes.label : null}
                            label="Game Approvals"
                            selected
                        />
                        <Tab
                            icon={<MailIcon/>}
                            className={value === 1 ? classes.label : null}
                            label="Messages"
                            disabled
                        />
                        <Tab
                            icon={<PersonAddIcon/>}
                            className={value === 2 ? classes.label : null}
                            label="Friend Requests"
                            disabled
                        />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                    <MatchUpTable approval={true}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                </TabPanel>
                <TabPanel value={value} index={2}>
                </TabPanel>
            </Container>
        </div>

    );
}