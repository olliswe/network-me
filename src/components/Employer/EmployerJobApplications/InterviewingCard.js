import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ArrowRight, ArrowLeft } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {withRouter} from 'react-router-dom';





const InterviewingCard = (props) => {

  const handleClick = () => {
    props.history.push(`${'/employer/job'}/${props.job.slug}/${'application'}/${props.application.slug}`)
}

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h6">
            {props.application.author.first_name} {props.application.author.last_name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Applied {props.application.timesince_applied} ago
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup fullWidth aria-label="full width contained primary button group">
        <Button  onClick={() => props.changeApplicationStatus(props.application.id,'applied')}>
            <ArrowLeft/>
        </Button>
        <Button onClick={() => props.changeApplicationStatus(props.application.id,'rejected')}>
            <ArrowRight/>
        </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}


export default withRouter(InterviewingCard)