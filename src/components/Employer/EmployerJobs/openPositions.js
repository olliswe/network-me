import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import EmployerJobCard from '../EmployerJobCard';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {API} from '../../../constants/api'



const OpenPositions = (props) => {

    const [jobRequest, setJobRequest] = useState(
        {
            loading:false,
            jobs:[],
            error:false
        }
    )

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
    [props.token]
    )

    
    return(
        <Box mb={20}>  
            <Container maxWidth="lg">
            <Typography variant='h4'>Your Open Positions</Typography>
            <Divider variant='left'/>
            <Box mt={5}>
                { jobRequest.loading ?
                <Grid container justify='center'>
                    <Box mt={'15vh'}> <CircularProgress/> </Box>
                </Grid>
                 
                : 
                <Grid container spacing={2}>
                {jobRequest.jobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <EmployerJobCard job={job} />
                    </Grid>
                ))}
                </Grid>                
                }                
            </Box>
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


export default connect(mapStateToProps)(OpenPositions)
