import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import {auth} from "../../actions";
import {connect} from "react-redux";
import logo from '../../images/logo.svg'
import {Link, withRouter} from 'react-router-dom'
import * as ROUTES from '../../constants/routes'



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign:'center'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

function Nav(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawer, setDrawer] = React.useState(false)
  const openMenu = Boolean(anchorEl);

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(open)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <div
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          >
          <Drawer open={drawer} onClose={toggleDrawer(false)}>
              {props.drawerList}
          </Drawer>
          </div>
          <div  className={classes.title}>
          <Link to='/'>
            <img src={logo} style={{height:'40px'}}/>
          </Link>
          </div>
            <div>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>props.history.push(ROUTES.PROFILE)}>Profile</MenuItem>
                <MenuItem onClick={props.logout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Nav))