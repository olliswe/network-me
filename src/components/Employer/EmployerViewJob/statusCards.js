import React from 'react'
import  {Paper, Typography}  from '@material-ui/core/';


export const TimedOutClosed = () => {
    return (
        <Paper style={{background:'', padding:30}}>
            <Typography>Position is timed out - if you want to open it to applications please change the deadline and then reopen the job</Typography>
        </Paper>
    )
}

export const TimedOut = () => {
    return (
    <Paper style={{background:'', padding:30}}>
        <Typography>Position is timed out - if you want to open it to applications please change the deadline</Typography>
    </Paper>
    )
}

export const ManuallyClosed = () => {
    return (
    <Paper style={{background:'', padding:30}}>
        <Typography>Position has been manually closed - if you want to open it to applications please click on "Reopen"</Typography>
    </Paper>
    )
}


export const Open = () => {
    return (
    <Paper style={{background:'', padding:30}}>
        <Typography>Position is open to applications</Typography>
    </Paper>
    )
}
