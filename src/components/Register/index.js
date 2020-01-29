import React, {useState, Fragment, useEffect} from "react";
import {connect} from "react-redux";
import {Link, Redirect, withRouter} from "react-router-dom";
import {auth} from "../../actions";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from "@material-ui/core/CircularProgress";
import {compose} from 'redux'


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  category:'1',
  firstName:'',
  lastName:'',
  organization:'',
  telephone_number:'',
  loading:false
  };


function Register (props) {

  const [state, setState] = useState(INITIAL_STATE)


  useEffect(()=>{
    if (props.isAuthenticated) {
      if(props.user.category=="1"){
        return <Redirect to="/jobseeker" /> }
      if(props.user.category=="2"){
        return <Redirect to="/employer"/>}
      return <Redirect to="/"/>
    }
    if (props.error){
      setState({...state,loading:false})
    }

  }, [props])

  const onChange = event => {
    if(event.target.name === 'category') {
      event.target.value === '1'
          ? setState({...state, category:'1', organization: ''})
          : setState({...state, category:'2', firstName: '', lastName: ''});
    }
    else{
      setState({
            ...state,
            [event.target.name]:event.target.value
          }
      );
    }
    }


  const onSubmit = event => {
    event.preventDefault();
    if (props.location.state && props.location.state.next) {
      console.log('next there!')
      props.register(state.email,
          state.passwordOne,
          state.firstName,
          state.lastName,
          state.organization,
          state.category,
          state.telephone_number,
          props.location.state.next
      );
    }
    else{
      props.register(state.email,
          state.passwordOne,
          state.firstName,
          state.lastName,
          state.organization,
          state.category,
          state.telephone_number
      );
    }
    setState({...state, loading:true})
  }


  const {classes} = props

  const isInvalid =
      (state.passwordOne !== state.passwordTwo ||
          state.passwordOne === '' ||
          state.email === '') ||
      (state.category === "1" ? state.firstName==='' || state.lastName ==='' : state.organization==='')


        

    return (

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}  onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Register as:</FormLabel>
                    <RadioGroup
                      aria-label="Category"
                      name="category"
                      className={classes.group}
                      value={state.category}
                      onChange={onChange}
                    >
                    <FormControlLabel value="1" control={<Radio />} label="Job Seeker" />
                    <FormControlLabel value="2" control={<Radio />} label="Employer" />
                </RadioGroup>
             </FormControl>
            </Grid>
            {state.category === "1" ?
            <Fragment>  
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
                value={state.firstName}
                onChange={onChange}
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
                value = {state.lastName}
                onChange = {onChange}
                
              />
            </Grid>
            </Fragment> :
            <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="organization"
              label="Organization"
              name="organization"
              value = {state.organization}
              onChange = {onChange}
            />
            </Grid>
            }
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value = {state.email}
                onChange = {onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordOne"
                label="Password"
                type="password"
                id="passwordOne"
                value = {state.passwordOne}
                onChange = {onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordTwo"
                label="Confirm Password"
                type="password"
                id="passwordTwo"
                autoComplete="current-password"
                value = {state.passwordTwo}
                onChange = {onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="telephone_number"
                  label="Telephone Number"
                  name="telephone_number"
                  value = {state.telephone_number}
                  onChange = {onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {isInvalid || state.loading}
          >
            {state.loading ?
                <CircularProgress />
                :
            'Sign Up'
            }
          </Button>
          {props.error &&
            <Grid>
              <Typography variant="body1" align="center"> Error: {props.error.email}</Typography>
            </Grid>
            }
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
       <Box mt={5}>
            <Typography variant="body2" align="center">
              Made ❤️ with  in 🇸🇱
            </Typography>
        </Box>
    </Container>

    );
}





const mapStateToProps = state => {
  if(state.auth.errors && (state.auth.errors.email || state.auth.errors.password)) {
      return {error : state.auth.errors}
    };
  
  return {
    error:null,
    isAuthenticated: state.auth.isAuthenticated,
    user:state.auth.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password, firstName, lastName, organization, category, telephone_number, next) =>
    dispatch(auth.register(email, password, firstName, lastName, organization, category, telephone_number, next)),
  };
}

export default compose(withRouter,withStyles(styles))((connect(mapStateToProps, mapDispatchToProps)(Register)));