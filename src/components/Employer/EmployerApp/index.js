import React, { useState } from 'react';
import {Route, Switch,} from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'
import EmployerLanding from '../EmployerLanding'
import Nav from '../../Nav'
import {connect} from "react-redux";
import NotFound from "../../Not Found";
import EmployerDrawer from "../EmployerDrawer"
import EmployerPost from "../EmployerPost"
import EmployerJobs from "../EmployerJobs"
import EmployerViewJob from "../EmployerViewJob"
import EmployerViewApplication from "../EmployerViewApplication"


const EmployerApp = (props) => {

      return (
      <div>    
      <Nav drawerList={<EmployerDrawer/>}  user={props.user}  />
        <Switch>
          <Route exact path={ROUTES.EMPLOYER_APP} component= {EmployerLanding}/>
          <Route path={ROUTES.EMPLOYER_POST} component= {EmployerPost}/>
          <Route path={ROUTES.EMPLOYER_JOBS} component={EmployerJobs}/>
          <Route exact path={ROUTES.EMPLOYER_VIEW_JOB} component={EmployerViewJob}/>
          <Route exact path={ROUTES.EMPLOYER_VIEW_APPLICATION} component={EmployerViewApplication}/>
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



  export default connect(mapStateToProps, null, null)(EmployerApp)