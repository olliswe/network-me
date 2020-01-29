import React, {useEffect} from 'react';
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
import SendMessage from "../../SendMessage";
import EmployerInbox from "../../Inbox";
import {auth} from "../../../actions";


const EmployerApp = (props) => {



  useEffect(() => {
    if (props.next){
      props.clearRedirect()
    }
  }, []);

      return (
      <div>
      <Nav drawerList={<EmployerDrawer/>}  user={props.user}  />
        <Switch>
          <Route exact path={ROUTES.EMPLOYER_APP} component= {EmployerLanding}/>
          <Route path={ROUTES.EMPLOYER_POST} component= {EmployerPost}/>
          <Route path={ROUTES.EMPLOYER_JOBS} component={EmployerJobs}/>
          <Route exact path={ROUTES.EMPLOYER_VIEW_JOB} component={EmployerViewJob}/>
          <Route exact path={ROUTES.EMPLOYER_VIEW_APPLICATION} component={EmployerViewApplication}/>
          <Route exact path={ROUTES.EMPLOYER_SEND_MESSAGE} render={(props) => <SendMessage {...props}/>}/>
          <Route exact path={ROUTES.EMPLOYER_INBOX} component={EmployerInbox}/>
          <Route component={NotFound} />
        </Switch>
      </div>
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



  export default connect(mapStateToProps, mapDispatchToProps)(EmployerApp)