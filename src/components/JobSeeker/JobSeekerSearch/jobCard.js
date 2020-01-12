import React, {useEffect, useState} from 'react'
import {Card, CardActionArea, CardContent, Typography, Grid, Chip} from '@material-ui/core/';


const JobCard = (props) => {

    
    return(
        <Card style={{ width:'100%', border:'none', shadow:'none', background:'none'}} onClick = {()=> props.handleClick(props.job)} >
            <CardActionArea>
                <CardContent style={{paddingTop:20, paddingBottom:20}}>
                    <Grid container justify="space-between">
                        <Grid item xs={7}>
                        <Typography>
                            {props.job.title}
                        </Typography>
                            {props.job.applied &&
                            <Chip size='small' label="applied" className="appliedChip" />
                            }
                        </Grid>
                        <Grid container xs={5}>
                        <Grid item xs={12}>
                            <strong>
                                {props.job.employer.organization}
                            </strong>
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

export default JobCard