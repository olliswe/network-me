import React, {useState} from "react";
import {withRouter} from 'react-router-dom'
import {Container, Grid, Typography, Paper, TextField, Button, CircularProgress, Box} from '@material-ui/core'
import ReactQuill from "react-quill";
import axios from 'axios'
import {API} from '../../constants/api'
import {connect} from 'react-redux'
import * as ROUTES from '../../constants/routes'


const SendMessage = (props) => {

    const recipient = props.location.state.recipient
    const job = props.location.state.job



    const [subject, setSubject] = useState(!!props.location.state.subject ? props.location.state.subject : '')
    const [body, setBody] = useState('')
    const [request, setRequest] = useState({
        loading:false,
        completed:false,
        error:false
    })

    const isInvalid = subject ==='' || body === ''


    const handleSubmit = () => {
        setRequest({loading:true, completed:false});
        let content = {
            author:props.user.id,
            recipient:recipient.id,
            subject:subject,
            body:body,
            job:job.id

        }
        let headers = {"Content-Type": "application/json",
            "Authorization":`Token ${props.token}`
        };
        axios.post(API+'messages/', content, {headers:headers})
            .then(res=>{
                setRequest({loading:false, completed:true, error:false});
            })
            .catch(error=>{
                setRequest({loading:false, completed:true, error:true});
            })
    }

    const handleSubjectChange = event => {
        setSubject(event.target.value);
    }

    const handleBodyChange = (value) => {
        setBody(value)
    }

    const handleJobLink = () => {
        if (props.user.category == '1'){
            props.history.push('/jobseeker/job/'+job.slug)
        }
        else{
            props.history.push('/employer/job/'+job.slug)
        }
    }

    const handleInboxLink = () => {
        if (props.user.category == '1'){
            props.history.push('/jobseeker/inbox')
        }
        else{
            props.history.push('/employer/inbox')
        }
    }


    return(

        <Container>
            <Paper className="graypaper"
            style={{padding:20, marginTop:20}}
            >
                {
                    request.loading || request.completed ?

                        (
                            request.completed ?
                                <Grid
                                container
                                style={{height:'50vh'}}
                                >
                                    <Grid
                                    container
                                    justify='center'
                                    style={{marginTop:'22vh'}}
                                    xs={12}
                                    >
                                        <Typography variant='h5'>
                                            Message was successfully sent
                                        </Typography>
                                    </Grid>
                                    <Grid
                                    container
                                    xs={12}
                                    mt={5}
                                    justify='center'
                                    >
                                        <Button onClick={handleJobLink}>
                                            View Job Posting
                                        </Button>
                                    </Grid>
                                    <Grid
                                        container
                                        xs={12}
                                        mt={5}
                                        justify='center'
                                    >
                                        <Button onClick={handleInboxLink}>
                                            Go to Inbox
                                        </Button>
                                    </Grid>
                                </Grid>
                                :
                                <Grid
                                    container
                                    style={{height:'50vh'}}
                                    justify='center'
                                >
                                    <Box
                                    style={{marginTop:'22vh'}}
                                    >
                                        <CircularProgress/>
                                    </Box>
                                </Grid>

                        )
                    :

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography
                                variant='h4'
                            >
                                Send a new Message
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography>
                                <strong>To: </strong> {recipient.organization || recipient.first_name+' '+recipient.last_name}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography>
                                <strong>Regarding: </strong> {job.title}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography
                            >
                                <strong>Subject: </strong>
                                <TextField
                                    style={{width: '80%'}}
                                    value={subject}
                                    onChange={handleSubjectChange}
                                />
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <ReactQuill
                                placeholder='Please write the message here'
                                value={body}
                                onChange={handleBodyChange}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Button
                                color='primary'
                                variant='contained'
                                disabled={isInvalid}
                                onClick={handleSubmit}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                }
            </Paper>
        </Container>

    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token:state.auth.token
    }
}


export default withRouter(connect(mapStateToProps)(SendMessage))