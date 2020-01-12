import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab, Typography, Box, Grid, Paper} from '@material-ui/core';
import SentMessages from "./sent";
import InboxMessages from "./inbox";
import Message from "../Message";




function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


const Inbox =  (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [selectedMsg, setSelectedMsg] = useState(null)

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <Grid
        container
        >
            <Grid
            item
            xs={!!selectedMsg ? 5 : 12}
            >
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="simple tabs example">
                            <Tab label="Inbox" {...a11yProps(0)} />
                            <Tab label="Sent Messages" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <div style={selectedMsg ?{width:'100%'}: {width:'80%', margin:'auto'}}>
                            <InboxMessages value={value} selectedMsg={selectedMsg} setSelectedMsg={setSelectedMsg} />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style={selectedMsg ?{width:'100%'}: {width:'80%', margin:'auto'}}>
                            <SentMessages value={value} selectedMsg={selectedMsg} setSelectedMsg={setSelectedMsg} />
                        </div>
                    </TabPanel>
                </div>
            </Grid>
            {!!selectedMsg &&
            <Grid
                item
                xs={7}
            >
                <Message msg={selectedMsg}/>
            </Grid>
            }
        </Grid>
    );
}




export default Inbox