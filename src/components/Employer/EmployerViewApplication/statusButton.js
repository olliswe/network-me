import React, { Fragment } from 'react'
import {Fab, Button, Box} from '@material-ui/core/';
import {Sync} from '@material-ui/icons';


const StatusButton = (props) => {

    return(
        <Fragment>
        {
        props.application.employer_status === 'applied' &&
        (<Fab variant='extended'  size='large' style={{width:250}}>  <Box>Status: Applied</Box>&nbsp;  <Sync color="white" style={{ fontSize: 30 }}/> </Fab>)
        }

       {
       props.application.employer_status === 'interview' &&
       (<Fab variant='extended' color='primary' size='large' style={{width:250}}>  <Box>Status: Interview</Box>&nbsp;  <Sync color="white" style={{ fontSize: 30 }}/> </Fab>)
       }

       {
           props.application.employer_status === 'rejected' &&
           (<Fab variant='extended' color='secondary' size='large' style={{width:250}}>  <Box>Status: Rejected</Box>&nbsp;  <Sync color="white" style={{ fontSize: 30 }}/> </Fab>)
       }
        </Fragment>
        )
}

export default StatusButton