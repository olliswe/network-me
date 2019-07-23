import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'


import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {auth} from "../../actions";
import jobsApp from "../../reducers";

import JobSeekerLanding from "../JobSeeker/JobSeekerLanding";
import EmployerLanding from "../Employer/EmployerLanding"
import NotFound from "../Not Found";
import Login from "../Login";
import Register from "../Register"
import Nav from "../Nav"

let store = createStore(jobsApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
  }


  // A route which is only accessible by a Job Seeker
  JobSeekerRoute   = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to={ROUTES.LOGIN} />;
      } else {
        if (this.props.auth.role != ROLES.JOBSEEKER){
          return <Redirect to={ROUTES.EMPLOYER_LANDING} />;
        }
        return <ChildComponent {...props} />
      }
    }} /> 
  }
  
  // A route which is only accessible by an employer
  EmployerRoute   = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to={ROUTES.LOGIN}/>;
      } else {
        if (this.props.auth.role !== ROLES.EMPLOYER){
          return <Redirect to={ROUTES.JOBSEEKER_LANDING} />;
        }
        return <ChildComponent {...props} />
      }
    }} /> 
  }



  // A route that only non-authenticated users should access
  LoginRegisterRoute   = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } 
      else if (this.props.auth.isAuthenticated)  {
        console.log(this.props.auth.role)
        if(this.props.auth.role === ROLES.JOBSEEKER){ 
          return <Redirect to={ROUTES.JOBSEEKER_LANDING} /> }
        if(this.props.auth.role === ROLES.EMPLOYER){
          return <Redirect to={ROUTES.EMPLOYER_LANDING}/>}
          
          return <Redirect to={ROUTES.LANDING}/>
      }
      else{
        return <ChildComponent {...props} />
      }
    }
  } /> 
}



  render() {
    let {JobSeekerRoute, EmployerRoute, LoginRegisterRoute } = this;
    return (
      <div>
      <Nav role = {this.props.auth.role}/>
      <BrowserRouter>
        <Switch>
          <JobSeekerRoute exact path={ROUTES.JOBSEEKER_LANDING} component={JobSeekerLanding} />
          <EmployerRoute exact path={ROUTES.EMPLOYER_LANDING}component={EmployerLanding}/>
          <LoginRegisterRoute exact path={ROUTES.REGISTER}component={Register} />
          <LoginRegisterRoute exact path={ROUTES.LOGIN} component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}