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
    },
    arrow: {
        float: 'right',
        height: '80%',
        margin: 5,
        paddingLeft: '100%',
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

export default function NavigationDrawer() {
    const classes = useStyles();
    const anchor = 'left';
    const [open, setOpen] = useState(true);

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
            <ListItem button key={'Match Ups'}>
                <ListItemIcon><ListAlt/></ListItemIcon>
                <ListItemText primary={'Match Ups'}/>
            </ListItem>
            <ListItem button key={'Game Input'}>
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
            <ListItem button key={'Sign Out'}>
                <ListItemIcon><SignOutIcon/></ListItemIcon>
                <ListItemText primary={'Sign Out'}/>
            </ListItem>
        </List>
    </div>

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>{anchor}</Button>
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