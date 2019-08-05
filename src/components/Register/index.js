import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
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
  organization:''
  };


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}
  }

  onChange = event => {
    this.setState({[event.target.name]:event.target.value});
    this.state.category === '1' 
    ? this.setState({organization:''})
    : this.setState({firstName:'', lastName:''});
    }


  onSubmit = event => {
    event.preventDefault();
    this.props.register(this.state.email, 
                        this.state.passwordOne, 
                        this.state.firstName,
                        this.state.lastName,
                        this.state.organization,
                        this.state.category
                        );
                        console.log('submit!')
  }

  render() {

    if (this.props.isAuthenticated) {
      console.log(this.props)
      console.log(this.state)
      if(this.props.user.category=="1"){ 
      return <Redirect to="/jobseeker" /> }
      if(this.props.user.category=="2"){
      return <Redirect to="/employer"/>}
      return <Redirect to="/"/>
    }

    const {classes} = this.props

    const {
     email,
     passwordOne,
     passwordTwo,
     category,
     firstName,
     lastName,
     organization
        } = this.state

    const isInvalid =
        (passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '') ||
        (category === "1" ? firstName==='' || lastName ==='' : organization==='') 
        

        
        

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
        <form className={classes.form}  onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Register as:</FormLabel>
                    <RadioGroup
                      aria-label="Category"
                      name="category"
                      className={classes.group}
                      value={category}
                      onChange={this.onChange}
                    >
                    <FormControlLabel value="1" control={<Radio />} label="Job Seeker" />
                    <FormControlLabel value="2" control={<Radio />} label="Employer" />
                </RadioGroup>
             </FormControl>
            </Grid>
            {category === "1" ? 
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
                value={firstName}
                onChange={this.onChange}
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
                value = {lastName}
                onChange = {this.onChange}
                
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
              value = {organization}
              onChange = {this.onChange}
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
                value = {email}
                onChange = {this.onChange}
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
                value = {passwordOne}
                onChange = {this.onChange}               
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
                value = {passwordTwo}
                onChange = {this.onChange}               
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {isInvalid}
          >
            Sign Up
          </Button>
          {this.props.error &&
            <Grid>
              <Typography variant="body1" align="center"> Error: {this.props.error.email}</Typography>
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
              Made with love in Salone
            </Typography>
        </Box>
    </Container>

      // <form onSubmit={this.onSubmit}>
      //         <input
      //         name="email"
      //         value={email}
      //         onChange={this.onChange}
      //         type="text"
      //         placeholder="Email Address"
      //         />
      //         <input
      //         name="passwordOne"
      //         value={passwordOne}
      //         onChange={this.onChange}
      //         type="password"
      //         placeholder="Password"
      //         />
      //         <input
      //         name="passwordTwo"
      //         value={passwordTwo}
      //         onChange={this.onChange}
      //         type="password"
      //         placeholder="Confirm Password"
      //         />
      //         <button type="submit" disabled={isInvalid}>Register</button>
      // </form>
    );
  }
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
    register: (email, password, firstName, lastName, organization, category) => 
    dispatch(auth.register(email, password, firstName, lastName, organization, category)),
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Register));