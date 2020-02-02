import React, {useEffect, useState} from 'react';
import {auth} from "../../../actions";
import {connect} from "react-redux"
import {Box, Grid, Typography, Card, CardActionArea, CardMedia, CardContent} from "@material-ui/core";
import jobposting from '../../../images/jobposting2.jpg'
import opening from '../../../images/opening.jpeg'
import * as ROUTES from '../../../constants/routes'
import {withRouter} from "react-router-dom"
import {API} from "../../../constants/api";


const EmployerLanding = (props) => {

    const [jobRequest, setJobRequest] = useState({jobs:null, loading:true})

    useEffect(() => {
        document.body.style.background = 'linear-gradient(#3f51b5, #c9d1ff)'
        document.body.style.backgroundRepeat = 'no-repeat'
        document.body.style.backgroundAttachment = 'fixed'
        return () => {
            document.body.style.background = null
            document.body.style.backgroundRepeat = null
            document.body.style.backgroundAttachment = null
        };
    }, [props.token])


    useEffect( () => {
            setJobRequest({loading:true})
            let headers = {"Content-Type": "application/json",
                "Authorization":`Token ${props.token}`
            };
            fetch(API+'employer/open', {headers, method:"GET"})
                .then(res => res.json())
                .then(data => setJobRequest({jobs:data, loading:false}))
                .catch(error => setJobRequest({error:true}))
        },
        []
    )

    
    return(
        <Grid container>
            <Grid item xs={12}>
                <Box mt={5} ml={'15vw'}><Typography variant='h2' style={{color:'white'}} >Welcome to your employment portal {props.user.organization}!</Typography></Box>
            </Grid>
            <Grid item xs={12}>
                <Box mt={3} ml={'15vw'}><Typography variant='h5' style={{color:'white'}} >Find your next hire now!</Typography></Box>
            </Grid>
            <Grid container  spacing={10} style={{width:'100%', marginTop:50, marginLeft:100, marginRight:100  }} justify = 'space-between'>
                <Grid item xs={12} md={6} justify='center'>
                    <Card style={{minHeight:'350px'}}>
                        <CardActionArea onClick={()=>props.history.push(ROUTES.EMPLOYER_POST)}>
                            <img
                                src={jobposting}
                                style={{height:'200px'}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Post a new job!
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Find your next hire by posting a job on our Portal.
                                    Our large network of job seekers will be able to view and apply to the job posting.
                                    You can easily track and reply to applications using our Portal.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} justify='center'>
                    <Card style={{minHeight:'350px'}}>
                        <CardActionArea onClick={()=>props.history.push(ROUTES.EMPLOYER_JOBS)}>
                            <div style={{textAlign:'center', width:'100%'}}>
                            <img
                                src={opening}
                                style={{height:'200px'}}
                            />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    You currently have {!!jobRequest.jobs && jobRequest.jobs.length} open position(s)
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Click here to view your open positions, and to check whether they have any applicants!
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}



const mapStateToProps = state => {
    return {
      user: state.auth.user,
      token:state.auth.token
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(auth.logout()),
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployerLanding))