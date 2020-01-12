import React, {useState, useEffect} from "react";
import {Grid, Typography, Card, CardContent, Button, Box} from '@material-ui/core';
import {connect} from 'react-redux'
import axios from 'axios'
import {API} from '../../../constants/api'


const MyApplications = (props) => {

    const [applicationsRequest, setApplicationsRequest] = useState({
        loading:true,
        data:null
    })

    useEffect( () => {
        let headers = {"Content-Type": "application/json",
            "Authorization":`Token ${props.token}`
        };
        setApplicationsRequest({loading:true})
        axios.get(API+'jobseeker/all_applications', {headers:headers})
            .then(res=> {
                console.log(res)
                setApplicationsRequest({
                    loading:false,
                    data:res.data
                })
            })

    },[])



    return (
        <Grid
        container
        justify='space-between'
        style={{marginTop:10}}
        spacing={2}
        >
            <Grid
            item
            justify='content-center'
            xs={12}
            >
                    <Typography variant='h4'
                    style={{display:'flex', justifyContent:'center'}}
                    >
                        Your Applications
                    </Typography>
            </Grid>

            {applicationsRequest.loading ?

                <div></div>
            :

                applicationsRequest.data.map((application) =>
                <Grid
                item
                xs={12}
                md={6}
                >
                    <Card style={{width:'95%', margin:'auto'}}>
                        <CardContent>
                            <Grid container justify='space-between'>
                                <Grid container xs={10}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            <strong>{application.job.title}</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {application.job.employer.organization}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Deadline: {application.job.deadline}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Applied: {application.date}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2}>
                                        <Button onClick={()=>{props.history.push('/jobseeker/job/'+application.job.slug)}}>View Job</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                )


            }
        </Grid>
    )
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token:state.auth.token
    }
}


export default connect(mapStateToProps, null, null)(MyApplications)