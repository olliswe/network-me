import React, {useState, useEffect, Fragment} from 'react';
import {API} from '../../../constants/api'
import {connect} from 'react-redux'
import {Container, Box, Paper, Grid, CircularProgress, Typography, Divider, Fab} from '@material-ui/core';
import {Mail, Phone, AssignmentReturned, Sync} from '@material-ui/icons'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import StatusButton from './statusButton'




const EmployerViewApplication = (props) => {

    const [ applicationRequest, setApplicationRequest] = useState({
        application:{},
        loading:true
    })




    const getApplicationRequest = () => {
        let headers = {"Content-Type": "application/json",
        "Authorization":`JWT ${props.token}`
        };
        fetch(API+'employer/get_application/'+props.match.params.slug, {headers, method:"GET"})
        .then(res => res.json())
        .then(data => {
            setApplicationRequest({application:data, loading:false});
        })
    
    }


    useEffect(() => {
        getApplicationRequest()
    }, [props.token])


    return (
        <Container maxWidth="lg">
        <Box mt={1} p={5} pt={2}>
            <Paper style={{background:'#f2f2f2'}}>
                <Paper style={{padding:30, background:"#3f51b5"}}>
                    <Grid container justify='space-between'>
                    {applicationRequest.loading
                    ?
                    <Typography style={{color:'white'}} variant='subtitle1'>Application for: </Typography>
                    :
                    <Fragment>
                    <Typography style={{color:'white'}} variant='subtitle1'>
                                Application for: <Link style={{color:'white'}} to={"/employer/job/"+applicationRequest.application.job.slug}>{applicationRequest.application.job.title }</Link>
                    </Typography>
                    <StatusButton application ={applicationRequest.application} />
                    </Fragment>
                    }
                    </Grid>
                </Paper>
                <Box style={{padding:30, minHeight:'60vh'}}>
                    {applicationRequest.loading 
                    ?
                    <Grid container justify="center">  
                    <Box mt={'25vh'}>
                    <CircularProgress/>
                    </Box>
                    </Grid>
                    :
                    <Grid container spacing={2}>
                        <Grid container justify="space-between">
                            <Typography variant='h4'>
                            {applicationRequest.application.author.first_name} {applicationRequest.application.author.last_name}                    
                            </Typography>
                        <a href={applicationRequest.application.cv} download style={{textDecoration:'none'}}>   
                        <Fab variant='extended' color='success' size='large' style={{width:200}}>  <Box>Download CV</Box>&nbsp;  <AssignmentReturned color="white" style={{ fontSize: 30 }}/> </Fab>
                        </a> 
                        </Grid>

                        <Grid item xs={12} >
                            <Mail/> &nbsp;&nbsp;&nbsp; <Typography variant='subtitle1' style={{display: 'inline-block', verticalAlign:'top'}}>{applicationRequest.application.author.email}</Typography>
                        </Grid>    
                        <Grid item xs={12}>
                            <Phone/> &nbsp;&nbsp;&nbsp; <Typography variant='subtitle1' style={{display: 'inline-block', verticalAlign:'top'}}>{applicationRequest.application.author.telephone_number}</Typography>
                        </Grid> 
                        <Grid item xs={12}><Divider variant='left'/></Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>Cover Letter:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography  dangerouslySetInnerHTML={{__html:applicationRequest.application.cover_letter}}/>
                        </Grid>
                </Grid>
                    }
                </Box>
            </Paper>
        </Box>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
      token:state.auth.token
    }
  }

export default withRouter(connect(mapStateToProps)(EmployerViewApplication));