import React from 'react';
import {Paper, Typography, Grid, Button, Fab} from '@material-ui/core'
import {connect} from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as ROUTES from "../../constants/routes";
import {withRouter} from 'react-router-dom'


const Message = (props) => {

    const getName = (user) => {

        if (props.user.email === user.email){
            return 'me'
        }
        else if (user.category == '2'){
            return user.organization
        }
        else {
            return user.first_name + ' ' + user.last_name
        }
    }

    const handleReply = () => {
            let link = null
            if (props.user.category == '1'){
                link = ROUTES.JOBSEEKER_SEND_MESSAGE
            }
            else {
                link = ROUTES.EMPLOYER_SEND_MESSAGE
            }
            props.history.push(link, {
            recipient:props.msg.author,
            job:props.msg.job,
            subject:'RE: '+props.msg.subject
                }
            )
    }


    return (
        <Paper className='graypaper' style={{margin:'20px',marginTop:'5%', padding:'20px', height:'100%', maxHeight:'80vh'}}>
            <PerfectScrollbar>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography variant='h5'>
                            <strong>{props.msg.subject}</strong>
                        </Typography>
                        <Typography>
                            <strong>From: </strong> {getName(props.msg.author)}
                        </Typography>
                        <Typography>
                            <strong>To: </strong> {getName(props.msg.recipient)}
                        </Typography>
                        <Typography>
                            <strong>Regarding: </strong> {props.msg.job.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>{props.msg.formatted_date}</Typography>
                        <Button onClick={handleReply} variant='contained'>Reply</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Typography dangerouslySetInnerHTML={{__html:props.msg.body}}></Typography>
                </Grid>
            </PerfectScrollbar>
        </Paper>
    );
};


const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}


export default withRouter(connect(mapStateToProps)(Message))
