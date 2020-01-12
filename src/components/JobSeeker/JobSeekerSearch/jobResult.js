import React, {useState} from 'react';
import {Typography, Paper, Divider, Fab, Box, Grid} from '@material-ui/core';
import {withRouter} from 'react-router-dom'
import Dotdotdot from 'react-dotdotdot'




const JobResult = (props) => {

    const handleClick = () => {
        props.history.push(`${'/jobseeker/job'}/${props.job.slug}`)
   }


    return (
        <Paper className="jobResultPaper">
            <Typography variant="h5">{props.job.title}</Typography>
            <Divider/>
            <Typography variant="subtitle1">posted by <strong>{props.job.employer.organization}</strong> {props.job.timesince_post} ago </Typography>
            <Box mt={5}>
                <Dotdotdot clamp={10}>
                <Typography dangerouslySetInnerHTML={{__html:props.job.description}}></Typography>
                </Dotdotdot>
            </Box>

                <Grid container justify="center" className="bottomBox">
                    <Grid container xs={12} justify="center">
                        <Typography variant="subtitle1"><strong>Deadline in {props.job.timeuntil_deadline}</strong></Typography>
                    </Grid>
                    <Grid container xs={12} justify="center" style={{marginBottom:20}}>    
                        <Typography>({props.job.deadline})</Typography>
                    </Grid>
                    <Grid container xs={12} justify="center">
                        <Fab variant="extended" className="readmoreFab" onClick={handleClick}>Read More & Apply</Fab>
                    </Grid>
                </Grid>
        </Paper>
    )
}


export default withRouter(JobResult)