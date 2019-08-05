import React, {Component} from 'react';
import {auth} from "../../../actions";
import {connect} from "react-redux"

const JobSeekerApply = (props) => {

    props.setPageName('View Jobs')
    
    return(
    <div>
        <h2>Welcome to the Application page</h2>
    </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(JobSeekerApply)