import React, {useState, useEffect} from 'react';
import {auth} from "../../../actions";
import {withRouter} from "react-router"
import {connect} from "react-redux"
import {Typography, Grid, Box, InputBase, IconButton, Paper, Fab} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import {JOBSEEEKER_SEARCH} from '../../../constants/routes'



const JobSeekerLanding = (props) => {


    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchTermChange = event => {
        setSearchTerm(event.target.value);
    }


    const handleSearch = event => {
      event.preventDefault();
      props.history.push({
        pathname: JOBSEEEKER_SEARCH,
        state: { searchTerm : searchTerm  }
      })
    }

     

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
      <Grid container >
        <Grid item xs={12}>
          <Box mt={5} ml={'15vw'}><Typography variant='h2' style={{color:'white'}} >Make your next move {props.user.first_name}</Typography></Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={3} ml={'15vw'}><Typography variant='h5' style={{color:'white'}} > Look for a new job now!</Typography></Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={5} ml={'15vw'} mr={'5vw'}>
            <Grid container spacing={10} style={{width:'100%'}} justify = 'space-between'>
              <Grid item md={5} xs={12}>
                <Paper style={{ padding: '2px 10px', display: 'flex', alignItems: 'space-between',width:'400',maxWidth: '50vw',}}>
                    <InputBase
                    placeholder="Search by Job Title or Organization"
                    style={{width:'95%'}}
                    inputProps={{ 'aria-label': 'search google maps' }}
                    name = 'searchTerm'
                    value = {searchTerm}
                    onChange = {handleSearchTermChange}
                  />
                  <IconButton aria-label="search" style={{marginLeft:'30'}} onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
              <Grid item >
                <Box style={{padding:10}}>
                <Typography variant='h5' style={{color:'white'}} > or</Typography>
                </Box>
              </Grid> 
              <Grid item md={5}  xs={12}>
              <Fab variant='extended' size='large' color='primary'> View all Jobs </Fab>
              </Grid> 
            </Grid>
            <Grid container  spacing={10} style={{width:'100%', marginTop:50}} justify = 'space-between'>
            <Grid item xs={12} md={6} justify='center'>
              <Paper style={{width:'100%', height:'35vh'}}>Most recent job postings</Paper>
            </Grid>
            <Grid item xs={12} md={6} justify='center'>
              <Paper style={{width:'100%', height:'35vh'}}>Popular job postings</Paper>
            </Grid>
            </Grid>
          </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(JobSeekerLanding)