import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ListAlt from '@material-ui/icons/ListAlt';
import GameIcon from '@material-ui/icons/SportsEsports';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import {endUserSession} from "../../utils/AuthRequests";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuHead: {
        height: 50,
        width: '100%',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    arrow: {
        float: 'right',
        height: '80%',
        margin: 5,
    },
    menuOpen: {
        color: 'white',
        fontSize: '50px'
    }
});

export default function NavigationDrawer(props) {
    const classes = useStyles();
    const anchor = 'left';
    const [open, setOpen] = useState(false);
    const {history} = props;

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const list = <div
        className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
    >
        <div className={classes.menuHead}>
            <ArrowBack className={classes.arrow}/>
        </div>
        <Divider/>
        <List>
            <ListItem button key={'Match Ups'} onClick={() => {
                history.push('/matchups')
            }}>
                <ListItemIcon><ListAlt/></ListItemIcon>
                <ListItemText primary={'Match Ups'}/>
            </ListItem>
            <ListItem button key={'Game Input'} onClick={() => {
                history.push('/gameinput')
            }}>
                <ListItemIcon><GameIcon/></ListItemIcon>
                <ListItemText primary={'Game Input'}/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button key={'Notifications'}>
                <ListItemIcon><NotificationsIcon/></ListItemIcon>
                <ListItemText primary={'Notifications'}/>
            </ListItem>
            <ListItem button key={'Account Management'}>
                <ListItemIcon><AccountCircle/></ListItemIcon>
                <ListItemText primary={'Account Management'}/>
            </ListItem>
            <ListItem button key={'Sign Out'}
                      onClick={() => {
                          endUserSession();
                          history.push('/');
                      }}
            >
                <ListItemIcon><SignOutIcon/></ListItemIcon>
                <ListItemText primary={'Sign Out'}/>
            </ListItem>
        </List>
    </div>

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><MenuIcon className={classes.menuOpen}/></Button>
            <SwipeableDrawer
                anchor={anchor}
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list}
            </SwipeableDrawer>
        </div>
    );
}