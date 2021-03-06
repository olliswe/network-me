import React, { Fragment, useEffect } from 'react';
import {Route, Switch,} from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'
import JobSeekerLanding from '../JobSeekerLanding'
import Nav from '../../Nav'
import {connect} from "react-redux";
import NotFound from "../../Not Found";
import JobSeekerDrawer from "../JobSeekerDrawer"
import JobSeekerApply from "../JobSeekerApply"
import JobSeekerSearch from "../JobSeekerSearch"
import JobSeekerViewJob from "../JobSeekerViewJob"
import MyApplications from "../JobSeekerMyApplications";
import SendMessage from "../../SendMessage";
import EmployerInbox from "../../Inbox";
import {auth} from "../../../actions";


const JobSeekerApp = (props) => {


  useEffect(() => {
    if (props.next){
      props.clearRedirect()
    }
  }, []);


      return (
      <Fragment>    
      <Nav drawerList={<JobSeekerDrawer/>}  user={props.user} />
        <Switch>
          <Route exact path={ROUTES.JOBSEEKER_APP}
           render={props => <JobSeekerLanding {...props} />}/>
          <Route path={ROUTES.JOBSEEEKER_SEARCH} component={JobSeekerSearch}/>
          <Route exact path={ROUTES.JOBSEEKER_VIEW} component={JobSeekerViewJob}/>
          <Route path={ROUTES.JOBSEEKER_APPLY} component={JobSeekerApply}/>
          <Route path={ROUTES.JOBSEEKER_MY_APPS} component={MyApplications}/>
          <Route exact path={ROUTES.JOBSEEKER_SEND_MESSAGE} render={(props) => <SendMessage {...props}/>}/>
          <Route exact path={ROUTES.JOBSEEKER_INBOX} component={EmployerInbox}/>
          <Route component={NotFound} />
        </Switch>
      </Fragment>
      )
  }

  const mapStateToProps = state => {
    return {
      user: state.auth.user,
      next:state.auth.next
    }
  }

const mapDispatchToProps = dispatch => {
  return {
    clearRedirect: ()=>{
      return dispatch(auth.clear_redirect())

    }
  }
}



  export default connect(mapStateToProps, mapDispatchToProps)(JobSeekerApp)