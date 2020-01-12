import React, {useState} from 'react';
import {connect} from "react-redux"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import ReactQuill from 'react-quill'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'
import {API} from '../../../constants/api'



  
const EmployerPost = (props) => {

    const today = new Date

    const[title, setTitle] = useState('')
    const[description, setDescription]=useState('')
    const[deadline, setDeadline]=useState(today)
    const[loading, setLoading]=useState(false)
    const[success, setSuccess]=useState(false)
    const[submissionError, setSubmissionError]=useState(null)
  

    const dateError = (deadline < today)
    const isInvalid = (
        title === '' || description === '' || dateError
    )

    const handleTitleChange = event => {
        setTitle(event.target.value);
      }

    const handleDescriptionChange = (value) => {
        setDescription(value)
        }

    const handleDeadlineChange = (value) => {
        setDeadline(value)
    }


    const handleSubmit = event => {
      event.preventDefault();
      setLoading(true);
      setSuccess(false);
      let formattedDeadline = moment(deadline).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      let job = {'title':title,
                 'description':description,
                 'deadline':formattedDeadline,
                 'employer':props.user.id
    }
      let headers = {"Content-Type": "application/json",
                      "Authorization":`Token ${props.token}`
    };
      let body = JSON.stringify(job);
      fetch(API+'job/', {headers, method: "POST", body})
        .then(res => res.json())
        .catch(error => setSubmissionError('An issue was encountered - please try again later'))
        .then(res => setSuccess(true))
    }

    
    return(  
    <Box mt={5} mb={20}>  
    <Container maxWidth="lg">
    <Typography variant='h4'>Post a New Job</Typography>
    <Divider variant='left'/>
    <Paper style={{background:'#f2f2f2'}}>
    <Box mt={5} p={5} pt={2}>


    { loading ? 
    (<Grid container justify="center" style={{height:'60vh'}}>  
    <Box mt={'25vh'}>
    {(!success ? <CircularProgress/> : 
    <Grid container spacing={5}>
      <Grid item xs={12} style={{textAlign:'center'}}>
        <Fab style={{backgroundColor:'green', color:'white'}} >
          <CheckIcon />
        </Fab>
      </Grid>
      <Grid item xs={12} style={{textAlign:'center'}}>
        <Typography>The job "{title}" was successfully submitted to our portal</Typography>
      </Grid>
      <Grid item xs={12} sm={6}  style={{textAlign:'center'}}>
        <Fab variant='extended' color='primary'><Box style={{width:160}}>View Job</Box></Fab>
      </Grid>
      <Grid item xs={12} sm={6} style={{textAlign:'center'}}>
        <Fab variant='extended' color='primary'><Box style={{width:160}}>Post Another Job</Box></Fab>
      </Grid>
    </Grid>
    )}
    </Box>
    </Grid> 
    )

     :

    (  
    <form onSubmit={handleSubmit}> 
    <Grid container spacing={3}>
    <Grid item xs={12}>   
    <TextField
        label="Job Title"
        value={title}
        onChange={handleTitleChange}
        margin="normal"
        style={{width:'80%'}}
      />  
    </Grid>
    <Grid item xs={12}>
    <div>
    <ReactQuill value={description}
                  onChange={handleDescriptionChange}
                  placeholder='Please write the job description here'
                  />
    </div>
    </Grid>   
    <Grid item xs={12}>  
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
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
        </Grid>
        </MuiPickersUtilsProvider>
    </Grid>
    {dateError && 
    <Grid container item xs={12} justify='center'><Typography>Deadline must be in the future!</Typography></Grid>
    }
    <Grid item xs={12}><Divider/></Grid>
    <Grid container justify="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isInvalid}
            >
              Post Job
            </Button>   
    </Grid>
    <Grid container justify="center">
     {submissionError&& <Typography>{submissionError}</Typography> } 
    </Grid>     
    </Grid> 
    </form>)}
    </Box>
    </Paper>
    </Container>
    </Box>  
    )
}








const mapStateToProps = state => {
    return {
      user: state.auth.user,
      token:state.auth.token
    }
  }


export default connect(mapStateToProps)(EmployerPost)