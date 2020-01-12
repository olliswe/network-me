import React, {useState, useEffect} from "react";
import axios from 'axios'
import {API} from "../../constants/api";
import {connect} from 'react-redux'
import InboxCard from "./inboxCard";
import {Box} from '@material-ui/core'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";


const InboxMessages = (props) => {


    const [messages, setMessages] = useState(null);
    const [loading, setLoading] = useState(true);

    const outlinedBox = (msgId) => {
        if (!!props.selectedMsg && msgId == props.selectedMsg.id) {
            return true
        }
        else {
            return false
        }
    }

    const getMessages = () => {
        props.setSelectedMsg(null)
        if (props.value===0) {
            setLoading(true)
            let headers = {
                "Content-Type": "application/json",
                "Authorization": `Token ${props.token}`
            };
            axios.get(API + 'messages/', {headers: headers, params:{'type':'inbox'}})
                .then(res => {
                    console.log(res.data)
                    setMessages(res.data)
                    setLoading(false)
                })
        }
        else{
            setLoading(true)
        }
    }

    useEffect(()=> {
        getMessages()
    }, [props.value])




    return (
        <Box className='viewBox' >
            {
                loading ?

                    <Grid container justify="center">
                        <Box mt={'25vh'}>
                            <CircularProgress/>
                        </Box>
                    </Grid>
                    :
                    <PerfectScrollbar>
                        {messages.map((message) =>
                            <Box style={{marginTop:'5px'}}
                                 className={outlinedBox(message.id) && 'outlined'}
                            >
                                <InboxCard message={message} selectedMsg={props.selectedMsg} setSelectedMsg={props.setSelectedMsg}/>
                            </Box>
                        )
                        }
                    </PerfectScrollbar>

            }
        </Box>
    )
};


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(InboxMessages)