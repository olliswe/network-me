import React from 'react';
import {auth} from "../../../actions";
import {connect} from "react-redux"


const EmployerLanding = (props) => {

    
    return(
    <div>
        <h2>Welcome to the Landing page</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployerLanding)