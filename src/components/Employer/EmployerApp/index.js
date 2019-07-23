import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'
import EmployerLanding from '../EmployerLanding'
import EmployerNav from '../EmployerNav'
import {connect} from "react-redux";
import NotFound from "../../Not Found";



class EmployerApp extends Component {
    render() {
      return (
      <div>    
      <EmployerNav user={this.props.user}/>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.EMPLOYER_APP} component={EmployerLanding} />
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

  export default connect(mapStateToProps)(EmployerApp)