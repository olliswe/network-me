import React, {useEffect, useState} from 'react'
import {Card, CardActionArea, CardContent, Typography, Grid, Chip} from '@material-ui/core/';
import {connect} from 'react-redux'
import axios from 'axios'
import {API} from "../../constants/api";


const InboxCard = (props) => {

    const message = props.message

    const getName = (user) => {

        if (props.user.email === user.email){
            return 'me'
        }
        else if (user.category == '2'){
            return user.organization
        }
        else {
            return user.first_name + ' '+user.last_name
        }
    }

    const handleClick = () => {
        props.setSelectedMsg(props.message)
        message.read = true
        let headers = {'Authorization':'Token '+props.token}
        axios.patch(API+'messages/'+props.message.id+'/', {read:true},{headers:headers})
    }


    return(
        <Card style={{ width:'100%', border:'none', shadow:'none', background:'none'}} className={'read_'+message.read} >
            <CardActionArea onClick={handleClick}>
                <CardContent style={{paddingTop:20, paddingBottom:20}}>
                    <Grid container justify="space-between">
                        <Grid item xs={7}>
                            <Typography>
                                <strong>From: </strong>{getName(message.author)}
                            </Typography>
                            <Typography>
                                <strong>Subject: </strong> {message.subject}
                            </Typography>
                        </Grid>
                        <Grid container xs={5}>
                            <Grid item xs={12}>
                                <strong> Job:</strong> {message.job.title}
                            </Grid>
                            <Grid item xs={12}>
                                Sent {message.days}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(InboxCard)