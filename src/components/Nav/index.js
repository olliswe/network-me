import React, {Component} from 'react';
import * as ROLES from '../../constants/roles'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class Nav extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {classes} = this.props
        
        if (this.props.role===ROLES.JOBSEEKER){
        return (        
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {this.props.role}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
        );}
        else if (this.props.role===ROLES.EMPLOYER)
        {
            return (
            <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {this.props.role}
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>)
        }
        else return ('')
    }
}

export default withStyles(styles)(Nav);
