import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'



export const JobSeekerRoute   = ({component: ChildComponent, ...rest}) => {
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


export const EmployerRoute   = ({component: ChildComponent, ...rest}) => {
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

  export const LoginRegisterRoute   = ({component: ChildComponent, ...rest}) => {
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