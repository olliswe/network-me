
import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";
import {auth} from '../../actions'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  email: "",
  password: "",
}

class Login extends Component {

    constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }

  render() {

    const {classes} = this.props

    const {
      email,
      password
    } = this.state

    const isInvalid = password === '' || email === ''

    if (this.props.isAuthenticated) {
        console.log(this.props)
        console.log(this.state)
        if(this.props.user.category=="1"){ 
        return <Redirect to="/jobseeker" /> }
        if(this.props.user.category=="2"){
        return <Redirect to="/employer"/>}
        return <Redirect to="/"/>
      }
    return (
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Network Me Job Portal
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
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
              onChange = {e => this.setState({email: e.target.value})}
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
              onChange = {e => this.setState({password: e.target.value})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid}
            >
              Sign In
            </Button>
            {this.props.error &&
            <Grid>
              <Typography variant="body1" align="center"> {this.props.error.non_field_errors}</Typography>
            </Grid>
            }
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            <Typography variant="body2" align="center">
              Made with love in Salone
            </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
    
  }
}

const mapStateToProps = state => { 
    if (state.auth.errors) {
            console.log(state.auth.errors)
            if (Object.keys(state.auth.errors).length){
            return {error : state.auth.errors}}
      } 
    return {
      error:null,
      isAuthenticated: state.auth.isAuthenticated,
      user:state.auth.user
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      login: (email, password) => {
        return dispatch(auth.login(email, password));
      }
    };
  }
  
  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));