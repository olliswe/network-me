import React, { Component, Fragment } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'


import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {auth} from "../../actions";
import jobsApp from "../../reducers";

import JobSeekerApp from "../JobSeeker/JobSeekerApp"
import EmployerApp from "../Employer/EmployerApp"
import NotFound from "../Not Found";
import Login from "../Login";
import Register from "../Register"


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
      } else if (!this.props.auth.isAuthenticated || this.props.auth.role != ROLES.JOBSEEKER) {
        return <Redirect to={ROUTES.LOGIN} />;
      } else {
        return <ChildComponent {...props} />
      }
    }} /> 
  }
  
  // A route which is only accessible by an employer
  EmployerRoute   = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } 
      else if (!this.props.auth.isAuthenticated || this.props.auth.role !== ROLES.EMPLOYER ) {
        return <Redirect to={ROUTES.LOGIN}/>;
      } 
      else {
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
          return <Redirect to={ROUTES.JOBSEEKER_APP} /> }
        if(this.props.auth.role === ROLES.EMPLOYER){
          return <Redirect to={ROUTES.EMPLOYER_APP}/>}
          
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
      <BrowserRouter>
        <Switch>
          <JobSeekerRoute path={ROUTES.JOBSEEKER_APP} component={JobSeekerApp} />
          <EmployerRoute path={ROUTES.EMPLOYER_APP} component={EmployerApp}/>
          <LoginRegisterRoute exact path={ROUTES.REGISTER} component={Register} />
          <LoginRegisterRoute exact path={ROUTES.LOGIN} component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
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