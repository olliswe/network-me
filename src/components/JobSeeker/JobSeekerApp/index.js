import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'
import JobSeekerLanding from '../JobSeekerLanding'
import JobSeekerNav from '../JobSeekerNav'
import {connect} from "react-redux";
import NotFound from "../../Not Found";



class JobSeekerApp extends Component {
    render() {
      return (
      <div>    
      <JobSeekerNav user={this.props.user}/>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.JOBSEEKER_APP} component={JobSeekerLanding} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      </div>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.auth.user,
    }
  }

  export default connect(mapStateToProps)(JobSeekerApp)