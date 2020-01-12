import React, {useEffect} from 'react';
import {auth} from "../../../actions";
import {connect} from "react-redux"
import {Box, Grid, Typography} from "@material-ui/core";
import MostRecentPanel from "../../JobSeeker/JobSeekerLanding/mostRecent";
import MostPopularPanel from "../../JobSeeker/JobSeekerLanding/mostPopular";


const EmployerLanding = (props) => {

    useEffect(() => {
        document.body.style.background = 'linear-gradient(#3f51b5, #c9d1ff)'
        document.body.style.backgroundRepeat = 'no-repeat'
        document.body.style.backgroundAttachment = 'fixed'
        return () => {
            document.body.style.background = null
            document.body.style.backgroundRepeat = null
            document.body.style.backgroundAttachment = null
        };
    }, [props.token])

    
    return(
        <Grid container>
            <Grid item xs={12}>
                <Box mt={5} ml={'15vw'}><Typography variant='h2' style={{color:'white'}} >Welcome to your employment portal {props.user.organization}!</Typography></Box>
            </Grid>
            <Grid item xs={12}>
                <Box mt={3} ml={'15vw'}><Typography variant='h5' style={{color:'white'}} >Find your next hire now!</Typography></Box>
            </Grid>
            <Grid container  spacing={10} style={{width:'100%', marginTop:100, marginLeft:100, marginRight:100  }} justify = 'space-between'>
                <Grid item xs={12} md={6} justify='center'>
                    <MostRecentPanel/>
                </Grid>
                <Grid item xs={12} md={6} justify='center'>
                    <MostPopularPanel/>
                </Grid>
            </Grid>
        </Grid>
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