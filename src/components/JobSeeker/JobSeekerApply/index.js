import React, {useState, useEffect} from 'react';
import {auth} from "../../../actions";
import {connect} from "react-redux"
import {withRouter} from 'react-router-dom'
import {Paper, Container,Grid, Box, Typography, Stepper, Step, StepLabel, Fab, CircularProgress, Button} from '@material-ui/core/';
import CheckIcon from '@material-ui/icons/Check';
import {Save} from '@material-ui/icons'
import ReactQuill from 'react-quill'
import {API} from '../../../constants/api'
import UploadSupportingDocs from './upload'
import ReviewSubmit from './review'
import {act} from "react-dom/test-utils";
import axios from 'axios'




function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Please write a Cover Letter for your Application...';
    case 1:
      return 'Attach CV & Supporting Documents';
    case 2:
      return 'Review & Submit!';
    default:
      return 'Unknown step';
  }
}


function getSteps() {
  return ['Write Cover Letter', 'Attach CV & Supporting Documents', 'Review & Submit'];
}

const JobSeekerApply = (props) => {

    function getFunctionality(step) {
      switch (step) {
        case 0:
          return  <ReactQuill value={coverLetter}
                      onChange={handleCoverLetterChange}
                      placeholder='Please write your Cover Letter here'
                  />
                      ;
        case 1:
          return <UploadSupportingDocs uploads={uploads} setUploads={setUploads} addUpload={addUpload} setCV={setCV} CV={CV}/>
      ;
        case 2:
          return <ReviewSubmit coverLetter={coverLetter} CV={CV} uploads={uploads}/>;
        default:
          return 'Unknown step';
      }
    }

    const [job, setJob] = useState(props.location.state.job);
    const [coverLetter, setCoverLetter] = useState('');
    const [CV, setCV] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [uploads, setUploads] = useState([{key:0, upload:null}]);
    const [applicationRequest, setApplicationRequest] = useState({loading:false, completed:false, draft:false})


    const isInvalid = () =>{
        if (activeStep===0){
            return coverLetter===''
        }
        else if (activeStep===1){
            return !CV
        }
    }

    const handleSubmit = () => {
        setApplicationRequest({loading:true, completed:false, draft:false})
        let body = {
            'coverLetter':coverLetter,
            'CV':CV,
            'uploads':uploads,
            'job_id':props.location.state.job.id
        }
        let headers = {"Content-Type": "application/json",
            "Authorization":`Token ${props.token}`
        };
        axios.post(API+'jobseeker/post_application',body,{headers:headers})
            .then(res=>setApplicationRequest({loading:false, completed:true, draft:false}))
        };


    const handleSave = () => {
        setApplicationRequest({loading:true, completed:false, draft:true})
        let body = {
            'coverLetter':coverLetter,
            'CV':CV,
            'uploads':uploads,
            'job_id':props.location.state.job.id,
            'draft':true
        };
        let headers = {"Content-Type": "application/json",
            "Authorization":`Token ${props.token}`
        };
        axios.post(API+'jobseeker/post_application',body,{headers:headers})
            .then(res=>setApplicationRequest({loading:false, completed:true, draft:true}))
    };



    const steps = getSteps();

    
    const handleCoverLetterChange = (value) => {
      setCoverLetter(value)
    }

    const addUpload = (event) => {
      event.preventDefault();
      let int = uploads.length
      setUploads([...uploads, {key:int, upload:null} ])
      console.log(uploads)
    }



        
      function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    
      function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
      }
    

    return(
    <Box m={5}>
      <Paper className='graypaper'>
          {applicationRequest.completed ?
              <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{height: '70vh'}}
              >
                  <Box>
                  <Grid container xs={12} justify='center' style={{marginBottom:20}}>
                      <Fab style={{backgroundColor:'green', color:'white'}} >
                          {applicationRequest.draft? <Save/>:<CheckIcon />}
                      </Fab>
                  </Grid>
                  <Grid
                      container
                  >
                      <Grid
                      container
                      xs={12}
                      justify='center'
                      style={{marginBottom:20}}
                      >
                          <Typography>Your Application to the job <strong>{job.title}</strong> was successfully {applicationRequest.draft ? 'saved' : 'submitted'}!</Typography>
                      </Grid>
                      <Grid
                      container
                      xs={12}
                      sm={6}
                      justify="center"
                      >
                          <Button>
                              View my {applicationRequest.draft ? 'Drafts' : 'Applications'}
                          </Button>
                      </Grid>
                      <Grid
                          container
                          xs={12}
                          sm={6}
                          justify="center"
                      >
                          <Button>
                              Search for more Jobs
                          </Button>
                      </Grid>
                  </Grid>
                  </Box>
              </Grid>
              :
                  applicationRequest.loading ?
                      <Grid
                          container
                          spacing={0}
                          direction="column"
                          alignItems="center"
                          justify="center"
                          style={{height: '70vh'}}
                      >
                          <Grid item xs={3}>
                              <CircularProgress/>
                          </Grid>
                      </Grid>
                      :
                      <Box p={5}>
                          <Typography variant='h4'>
                              Apply to: {job.title}
                          </Typography>

                          <div style={{marginTop: 20}}>
                              <Stepper activeStep={activeStep} alternativeLabel>
                                  {steps.map(label => (
                                      <Step key={label}>
                                          <StepLabel>{label}</StepLabel>
                                      </Step>
                                  ))}
                              </Stepper>
                              <div>
                                  <Typography variant='h5'>{getStepContent(activeStep)}</Typography>
                              </div>
                          </div>

                          <div style={{marginTop: 30}}>
                              {getFunctionality(activeStep)}
                          </div>
                          <div className="bottomDiv">
                              <Button
                                  disabled={activeStep === 0}
                                  onClick={handleBack}
                              >
                                  Back
                              </Button>
                              {
                                  activeStep === steps.length - 1 ?
                                      <Button variant="contained" color="primary" onClick={handleSubmit}>
                                          Submit
                                      </Button>
                                      :
                                      <Button variant="contained" color="primary" onClick={handleNext}
                                              disabled={isInvalid()}>
                                          Next
                                      </Button>
                              }
                              <br/>
                              <br/>
                              <br/>
                              <Fab variant="extended" onClick={handleSave} disabled={coverLetter===''}>Save & Continue Later</Fab>
                          </div>
                      </Box>
          }
      </Paper>
    </Box>
    )
}


const mapStateToProps = state => {
    return {
      user: state.auth.user,
      token:state.auth.token

    }
  }
  


export default withRouter(connect(mapStateToProps, null, null)(JobSeekerApply))