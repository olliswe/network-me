import React, {useState, useEffect, Fragment} from 'react';
import {Typography, Paper, Container, Box, CircularProgress, Grid, Divider, Fab} from '@material-ui/core';
import {API} from '../../../constants/api'
import {connect} from "react-redux";



const JobSeekerViewJob = (props) => {

    const [jobRequest, setJobRequest] = useState({
        data:null,
        loading:true
    })

    const getJobRequest = () => {
        setJobRequest({loading:true})
        let headers = {"Content-Type": "application/json",
        "Authorization":`Token ${props.token}`
        };
        fetch(API+'jobseeker/get_job/'+props.match.params.job_slug, {headers, method:"GET"})
        .then(res => res.json())
        .then(data => {
            setJobRequest({data:data, loading:false});
        })
    }

    useEffect(() => {
        getJobRequest()
    }, [])

    const handleClick = () => {
        props.history.push(
            {
            pathname:`${'/jobseeker/job'}/${jobRequest.data.slug}/${'apply'}`,
            state:{job:jobRequest.data}
            }
            )
   }


    return (
        <Container maxWidth="lg">
        <Box mt={5} p={5} pt={2}>
            <Paper className="graypaper">
                    {jobRequest.loading 
                    ?
                    <Grid container justify="center">  
                    <Box mt={'25vh'}>
                    <CircularProgress/>
                    </Box>
                    </Grid>
                    :
                    <Box style={{padding:30}}>
                        <Typography variant='h4'>{jobRequest.data.title}</Typography>
                        <Typography variant='h5'>posted by <strong>{jobRequest.data.employer.organization}</strong> {jobRequest.data.timesince_post} ago </Typography>
                        <Divider variant="left"/>
                        <Typography dangerouslySetInnerHTML={{__html:jobRequest.data.description}} style={{marginTop:20, lineHeight:'1.5em'}}></Typography>
                        <Divider style={{marginTop:30, marginBottom:30}}/>
                        {
                            jobRequest.data.closed ?
                            <Grid container xs={12} justify="center">
                                <Typography>
                                    This job is closed for applications
                                </Typography>
                            </Grid>
                                :
                            <Fragment>
                                <Grid container xs={12} justify="center">
                                    <Typography variant="subtitle1"><strong>Deadline in {jobRequest.data.timeuntil_deadline}</strong></Typography>
                                </Grid>
                                <Grid container xs={12} justify="center" style={{marginBottom:20}}>
                                    <Typography>({jobRequest.data.deadline})</Typography>
                                </Grid>
                            </Fragment>
                        }
                            <Grid container xs={12} justify="center">
                                <Fab variant="extended" className="successFab" onClick={handleClick} disabled={jobRequest.data.applied || jobRequest.data.closed}>Apply Online</Fab>
                            </Grid>
                            {
                                jobRequest.data.applied &&
                                    <Grid container xs={12} justify="center">
                                        <Typography>You have already applied for this job</Typography>
                                    </Grid>
                            }
                    </Box>
                    }
            </Paper>
        </Box>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      token:state.auth.token
    }
  }



export default connect(mapStateToProps, null, null)(JobSeekerViewJob)
