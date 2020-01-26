import React from 'react';
import logo from '../../images/logo.svg'
import LinearProgress from '@material-ui/core/LinearProgress';

const Loading = () => {
    return (
        <div style={{height:'100vh', width:'100vw', textAlign:'center', alignItems:'center', paddingTop:'40vh'}}>
                <div>
                <img src={logo}/>
                </div>
                <div style={{paddingLeft:'10vw', paddingRight:'10vw'}}>
                    <LinearProgress color="primary" />
                </div>
        </div>
    );
};

export default Loading;
