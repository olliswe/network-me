import React from 'react'
import {withRouter, Redirect, Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as ROUTES from '../../../constants/routes'

const EmployerJobCard = (props) => {

    const handleClick = () => {
         props.history.push(`${'/employer/job'}/${props.job.slug}`)
    }

    return (
        <Card>
          <CardActionArea onClick={handleClick}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {props.job.title}
              </Typography>
              <Typography color="textSecondary">
                Posted&nbsp;{props.job.post_date}&nbsp;ago
              </Typography>
              <Typography variant="body1" component="p">
                <br/>
                Deadline: {props.job.deadline}
              </Typography>
              <Typography variant="body1" component="p">
                {props.job.applications.length}&nbsp;Applicant(s)
              </Typography>
            </CardContent>
          </CardActionArea>
      </Card>
    )

}



export default withRouter(EmployerJobCard)