import React, {Component} from 'react';
import {auth} from "../../../actions";
import {connect} from "react-redux"

class EmployerLanding extends Component {
    constructor(props) {
          super(props);
        }
    render(){
      console.log(this.props)
      console.log(this.state)
    return(
    <div>
        <div>
          {this.props.user.email} (<a onClick={this.props.logout}>logout</a>)
        </div>
        <h2>Welcome Employer!</h2>
    </div>
    )
    }
}


const mapStateToProps = state => {
    console.log(state)
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