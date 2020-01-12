import React from 'react'
import {Card, CardActionArea, CardContent, Typography, Grid, Chip} from '@material-ui/core/';
import {withRouter} from 'react-router-dom'


const JobCard = (props) => {

    const handleClick = () => {
        props.history.push(`${'/jobseeker/job'}/${props.job.slug}`)
   }

    return(
        <Card style={{background:'linear-gradient(#ffffff, #e8e8e8)'}}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Grid container justify="space-between">
                        <Grid item xs={7}>
                        <Typography>
                            {props.job.title}
                        </Typography>
                            {
                                props.job.applied &&
                                <Chip size='small' label="applied" className="appliedChip" />
                            }
                        </Grid>
                        <Grid container xs={5}>
                        <Grid item xs={12}>
                            <strong>{props.job.employer.organization}</strong>
                        </Grid>  
                        <Grid item xs={12}>
                            Posted {props.job.timesince_post} ago
                        </Grid>
                        <Grid item xs={12}>
                            Deadline in {props.job.timeuntil_deadline}
                        </Grid>
                        </Grid>
                    </Grid>    


                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(JobCard)