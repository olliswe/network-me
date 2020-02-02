
import React from "react";
import {connect} from "react-redux";

import {Link, Redirect, withRouter} from "react-router-dom";
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
import CircularProgress from '@material-ui/core/CircularProgress';



const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/user/olliswe/likes/)',
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
  loading:false
}

function Login (props) {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const onSubmit = e => {
      e.preventDefault();
      if (props.location.state && props.location.state.next){
        props.login(email, password, props.location.state.next);
      }
      else{
        props.login(email, password);
      }
      setLoading(true)
    }


    React.useEffect(()=>{
      if (props.isAuthenticated) {
            if(props.user.category=="1"){
              return <Redirect to="/jobseeker" /> }
            if(props.user.category=="2"){
              return <Redirect to="/employer"/>}
            return <Redirect to="/"/>
          }
      if (props.error){
        setLoading(false)
      }

    }, [props])



    const {classes} = props;

    const isInvalid = password === '' || email === ''




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
          <form className={classes.form} onSubmit={onSubmit}>
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
              onChange = {e => setEmail(e.target.value)}
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
              onChange = {e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid || loading}
            >
              {loading ?
                  <CircularProgress />
                  :
                  'Sign In'
              }
            </Button>
            {props.error &&
            <Grid>
              <Typography variant="body1" align="center"> {props.error.non_field_errors}</Typography>
            </Grid>
            }
            <Grid container>
              <Grid item xs>
                <a href="https://networkmesl-api.herokuapp.com/accounts/services/password_reset/" variant="body2">
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                {!!props.location.state && !!props.location.state.next ?
                    <Link to={{
                      pathname: "/register",
                      state: {next: props.location.state.next}
                    }}
                          variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                    :
                    <Link to='/register'
                          variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                }
              </Grid>
            </Grid>
            <Box mt={5}>
            <Typography variant="body2" align="center">
              Made ❤️ with  in 🇸🇱
            </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => { 
    if (state.auth.errors) {
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
      login: (email, password, next) => {
        return dispatch(auth.login(email, password, next));
      }
    };
  }
  
  export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login)));