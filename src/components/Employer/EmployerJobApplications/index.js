import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'; 
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import { Edit, Save } from '@material-ui/icons';
import ApplicationCard from './ApplicationCard'
import InterviewingCard from './InterviewingCard'
import RejectionCard from './RejectionCard'
import {API} from '../../../constants/api' 
import {connect} from 'react-redux'
import ScrollableAnchor, {configureAnchors} from 'react-scrollable-anchor'

configureAnchors({offset:-60})


const EmployerJobApplications = (props) => {

    const [applicationRequest, setApplicationRequest] = useState({
        loading:false,
        applied:[],
        interview:[],
        rejected:[]
    });




    const setApplicationDataHelper = (data) => {
        let applied = []
        let interview = []
        let rejected = []
        data.forEach(element => {
            
            let status = element.employer_status
            if (status==='applied'){
                applied = [...applied, element]
            }
            else if (status==='interview'){
                interview = [...interview, element]
            }
            else if(status==='rejected'){
                rejected = [...rejected, element]
            }
        });
        console.log(applied)
        setApplicationRequest({loading:false, applied:applied, interview:interview, rejected:rejected})

    }

    const getApplicationRequest = () =>{
        setApplicationRequest({loading:true});
        let headers = {"Content-Type": "application/json",
        "Authorization":`JWT ${props.token}`
        };

        fetch(API+'application/?job='+props.job.id, {headers, method:"GET"})
        .then(res => res.json())
        .then(res => {
            setApplicationDataHelper(res)
        })
    };


    const changeApplicationStatus = (id, newStatus) => {
        let headers = {"Content-Type": "application/json",
        "Authorization":`JWT ${props.token}`
        };
        
        let update = {'employer_status':newStatus}
        let body = JSON.stringify(update);
        fetch(API+'application/'+id+'/', {headers, method:"PATCH", body})
        .then(res => getApplicationRequest())
        }
    



    useEffect( () => {
        if (!!props.job.id){
            console.log('hello')
            getApplicationRequest()
        }
    },
    [props.token]
    )




    return (
        // <Grid container spacing={3}>    
        // <Grid item xs={12} md={4}><Fab variant='extended' color='primary'>  <Box>Edit Applicants</Box>&nbsp;  <Edit color="white" style={{ fontSize: 30 }}/> </Fab></Grid>
        <ScrollableAnchor id="applications">
        <Grid container spacing={3} justify="space-around">
            <Grid item xs={12} md={4}>
                <Paper>
                    <Grid container spacing={3} style={{padding:25}}>
                        <Grid item xs={12}>
                            <Typography variant='h6'>All Applications</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Divider variant='left'/>
                        </Grid>
                        <Grid item xs={12}>
                        <Box style={{height:'75vh', overflowY:'auto'}}>
                        <Grid container spacing={3} style={{width:'100%'}} >
                        {applicationRequest.applied && applicationRequest.applied.map((application) => ( 
                        <Grid item xs={12} key={application.id}>
                            <ApplicationCard job={props.job} application={application} changeApplicationStatus={changeApplicationStatus}/>
                        </Grid>
                        ))}
                        </Grid>
                        </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper>
                    <Grid container spacing={3} style={{padding:25}}>
                        <Grid item xs={12}>
                            <Typography variant='h6'>Interviewing</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Divider variant='left'/>
                        </Grid>
                        <Grid item xs={12}>
                        <Box style={{height:'75vh', overflowY:'auto'}}>
                        <Grid container spacing={3} style={{width:'100%'}} >
                        {applicationRequest.interview && applicationRequest.interview.map((application) => ( 
                        <Grid item xs={12} key={application.id}>
                            <InterviewingCard job={props.job} application={application} changeApplicationStatus={changeApplicationStatus}/>
                        </Grid>
                        ))}
                        </Grid>
                        </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper>
                    <Grid container spacing={3} style={{padding:25}}>
                        <Grid item xs={12}>
                            <Typography variant='h6'>Rejected</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Divider variant='left'/>
                        </Grid>
                        <Grid item xs={12}>
                        <Box style={{height:'75vh', overflowY:'auto'}}>
                        <Grid container spacing={3} style={{width:'100%'}} >
                        {applicationRequest.rejected && applicationRequest.rejected.map((application) => ( 
                        <Grid item xs={12} key={application.id}>
                            <RejectionCard job={props.job} application={application} changeApplicationStatus={changeApplicationStatus}/>
                        </Grid>
                        ))}
                        </Grid>
                        </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        </ScrollableAnchor>

    );
}


const mapStateToProps = state => {
    return {
      token:state.auth.token
    }
  }



export default connect(mapStateToProps)(EmployerJobApplications)