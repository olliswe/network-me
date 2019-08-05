import React, { useState, Fragment } from 'react';
import {Route, Switch,} from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'
import JobSeekerLanding from '../JobSeekerLanding'
import Nav from '../../Nav'
import {connect} from "react-redux";
import NotFound from "../../Not Found";
import JobSeekerDrawer from "../JobSeekerDrawer"
import JobSeekerApply from "../JobSeekerApply"


const JobSeekerApp = (props) => {



      return (
      <div>    
      <Nav drawerList={<JobSeekerDrawer/>}  user={props.user} 
      />
        <Switch>
          <Route exact path={ROUTES.JOBSEEKER_APP}
           render={props => <JobSeekerLanding {...props} />}/>
           <Route path={ROUTES.JOBSEEKER_APPLY}
           render={props => <JobSeekerApply {...props} />}/>
          <Route component={NotFound} />
        </Switch>
      </div>
      )
  }

  const mapStateToProps = state => {
    return {
      user: state.auth.user,
    }
  }



  export default connect(mapStateToProps, null, null)(JobSeekerApp)