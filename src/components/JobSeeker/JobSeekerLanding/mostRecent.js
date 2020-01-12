import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Paper, Container, Grid, CircularProgress, Box, Typography}  from '@material-ui/core/';
import {API} from '../../../constants/api'
import JobCard from './jobCard'
import PerfectScrollbar from 'react-perfect-scrollbar';




const MostRecentPanel = (props) => {

    const [jobsRequest, setJobsRequest] =  useState({
        'loading':true,
        'jobs':null
    })


    const getMostRecentJobs = () => {
        setJobsRequest({loading:true});
        let headers = {"Content-Type": "application/json",
        "Authorization":`Token ${props.token}`
        };
        fetch(API+'jobseeker/most_recent', {headers, method:"GET"})
        .then(res => res.json())
        .then(data => {
            setJobsRequest({jobs:data, loading:false});
        })
    } 


    useEffect(() => {
        getMostRecentJobs();
    }, [props.token])


    return(
        <Paper style={{width:'100%',}}>
            <Paper style={{padding:8, textAlign:'center', background:'#3f51b5', color:'white', }}>
                <Typography variant="subtitle1">
                    Most Recent Job Postings
                </Typography>
            </Paper>
            {jobsRequest.loading ?
            <Box style={{textAlign:'center', height:'35vh'}}>
                <CircularProgress style={{marginTop:'13vh'}}/>   
            </Box>

            :
            <div style={{height:'35vh'}}>
            <PerfectScrollbar>
            {
                jobsRequest.jobs.map((job) => (
                <Box m={1}>
                    <JobCard job={job}/>
                </Box>
            ))
                }
            </PerfectScrollbar>
            </div>
            }
        </Paper>

    )
}


const mapStateToProps = state => {
    return {
      token:state.auth.token
    }
  }

export default connect(mapStateToProps)(MostRecentPanel)
