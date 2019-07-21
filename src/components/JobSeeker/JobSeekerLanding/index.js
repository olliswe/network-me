import React, {Component} from 'react';
import {auth} from "../../../actions";
import {connect} from "react-redux"
import ButtonAppBar from '../JobSeekerNavbar'

class JobSeekerLanding extends Component {

   render(){
    return(
    <div>
        <ButtonAppBar/>
        <div>
          {this.props.user.email} (<a onClick={this.props.logout}>logout</a>)
        </div>
        <h2>Welcome JobSeeker</h2>
    </div>
    )
    }
}


const mapStateToProps = state => {
    return {
      user: state.auth.user,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(auth.logout()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(JobSeekerLanding)