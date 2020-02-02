import React, {useEffect, useState, Fragment} from 'react'
import {API} from '../../../constants/api'
import {connect} from "react-redux";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Edit, Save, Close, OpenInNew } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import ReactQuill from 'react-quill'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'
import EmployerJobApplications from '../EmployerJobApplications'
import {TimedOutClosed, TimedOut, ManuallyClosed, Open} from './statusCards'





const EmployerViewJob = (props) => {

    const today = new Date()

    const [ jobRequest, setJobRequest] = useState({
        job:null,
        loading:true
    })

    const [editing, setEditing] = useState(false)
    const [success, setSuccess] = useState(false)
    const [deadline, setDeadline] = useState(null)
    const[description, setDescription]=useState(null)

    const getJobRequest = () => {
        setJobRequest({loading:true})
        let headers = {"Content-Type": "application/json",
        "Authorization":`Token ${props.token}`
        };
        fetch(API+'employer/get_job/'+props.match.params.slug, {headers, method:"GET"})
        .then(res => res.json())
        .then(data => {
            setJobRequest({job:data, loading:false});
            console.log(data.deadline)
        })
        .catch(error => setJobRequest({error:true}))
    }


    useEffect( () => {
        getJobRequest()
    },
    [props.token]
    )


    const handleEdit = event => {
        event.preventDefault();
        setEditing(true);
        setSuccess(false);
        setDeadline(jobRequest.job.deadline);
        setDescription(jobRequest.job.description)
    }

    const handleSave = event => {
        event.preventDefault();
        setEditing(false);
        setJobRequest({loading:true});
        setSuccess(false);
        let formattedDeadline = moment(deadline).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        let job = {
                    'deadline':formattedDeadline,
                    'description':description
        }
        let headers = {"Content-Type": "application/json",
                        "Authorization":`Token ${props.token}`
        };
        let body = JSON.stringify(job);
        fetch(API+'job/'+jobRequest.job.id+'/', {headers, method: "PATCH", body})
            .then(res => res.json())
            .then(res => {
                setSuccess(true)
                getJobRequest()
            })
    }
    
    const handleClose = event => {
        event.preventDefault();
        setJobRequest({loading:true});
        let job = {
                    'manually_closed':true
        }
        let headers = {"Content-Type": "application/json",
                        "Authorization":`Token ${props.token}`
        };
        let body = JSON.stringify(job);
        fetch(API+'job/'+jobRequest.job.id+'/', {headers, method: "PATCH", body})
            .then(res => res.json())
            .then(res => {
                getJobRequest()
            })
    }

    const handleReopen = event => {
        event.preventDefault();
        setJobRequest({loading:true});
        let job = {
                    'manually_closed':false
        }
        let headers = {"Content-Type": "application/json",
                        "Authorization":`Token ${props.token}`
        };
        let body = JSON.stringify(job);
        fetch(API+'job/'+jobRequest.job.id+'/', {headers, method: "PATCH", body})
            .then(res => res.json())
            .then(res => {
                getJobRequest()
            })
    }


    const handleDeadlineChange = (value) => {
        setDeadline(value)
    }
    
    const handleDescriptionChange = (value) => {
        setDescription(value)
        }


    
    return (

        <Container maxWidth="lg">
        <Box mt={5} p={5} pt={2}>
            <Paper style={{background:'#f2f2f2'}}>
                    {jobRequest.loading 
                    ?
                    <Grid container justify="center">  
                    <Box mt={'25vh'}>
                    <CircularProgress/>
                    </Box>
                    </Grid>
                    :
                    <Fragment>
                        {jobRequest.job.timed_out && jobRequest.job.manually_closed ?
                        <TimedOutClosed/>
                        :
                        (jobRequest.job.timed_out ?
                        <TimedOut/>
                        :
                        (jobRequest.job.manually_closed?
                        <ManuallyClosed/> 
                        :
                        <Open/>      
                        )
                        )   
                        }
                    <Box style={{padding:30}}>
                    <Grid container spacing={2}>
                        <Grid container justify="space-between">
                            <Typography variant='h4'>{jobRequest.job.title}</Typography>
                            <Grid container justify="space-between" style={{width:'30%'}}>
                            {jobRequest.job.manually_closed ?
                            <Fab variant='extended' onClick={handleReopen} disabled={jobRequest.job.timed_out}>  <Box>Reopen Job</Box>&nbsp;  <OpenInNew color="white" style={{ fontSize: 30 }}/> </Fab>
                            :
                            <Fab variant='extended' color='secondary' onClick={handleClose} disabled={jobRequest.job.timed_out}>  <Box>Close Job</Box>&nbsp;  <Close color="white" style={{ fontSize: 30 }}/> </Fab>
                            }

                            {editing ? 
                            <Fab variant='extended'  onClick={handleSave}>  <Box>Save</Box>&nbsp;  <Save color="white" style={{ fontSize: 30 }}/> </Fab>
                            :
                            <Fab variant='extended' color='primary' onClick={handleEdit}>  <Box>Edit</Box>&nbsp;  <Edit color="white" style={{ fontSize: 30 }}/> </Fab>
                            }
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Typography variant='subtitle1'><strong>Deadline:</strong></Typography> 
                        {editing?
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                        margin="normal"
                                        id="mui-pickers-date"
                                        label="Deadline Date"
                                        value={deadline}
                                        onChange={handleDeadlineChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />
                                        <KeyboardTimePicker
                                        margin="normal"
                                        id="mui-pickers-time"
                                        label="Deadline Time"
                                        value={deadline}
                                        onChange={handleDeadlineChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                        />
                                </MuiPickersUtilsProvider>
                        :
                        <Typography variant='subtitle1'>{jobRequest.job.formatted_deadline}</Typography>
                    
                        }

                        
                        
                        </Grid>
                        <Grid item xs={12}><Divider variant='left'/></Grid>
                        <Grid item xs={12} style={{minHeight:'60vh'}}>
                        {editing ?
                            <div>
                            <ReactQuill value={description}
                                          onChange={handleDescriptionChange}
                                          placeholder='Please write the job description here'
                                          />
                            </div>
                        :
                        <Typography dangerouslySetInnerHTML={{__html:jobRequest.job.description}}/>
                        }
                    
                        </Grid>
                        <Grid item xs={12}><Divider variant='left'/></Grid>
                    </Grid>
                    </Box>   
                    </Fragment>
                    }
                    
            </Paper>
        </Box>
        

        <Box mt={5} p={5} pt={2} mb={20}>
            {!!jobRequest.job ?
            <EmployerJobApplications job={jobRequest.job}/>

            :            
            <Grid container justify="center">  
                <Box mt={'15vh'}>
                <CircularProgress/>
                </Box>
            </Grid>        
             }
        </Box>


            
        
        </Container>
    );
}

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      token:state.auth.token
    }
  }

export default connect(mapStateToProps)(EmployerViewJob);