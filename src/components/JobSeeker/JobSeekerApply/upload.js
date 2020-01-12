import React, {useState, useEffect} from 'react'
import {Fab, Typography, Divider, Box} from '@material-ui/core/';
import {Add} from '@material-ui/icons'
import S3Uploader from './reacts3'


const UploadSupportingDocs = (props) => {



    




    return (
        <div>
            <Box mb={5}>
                <Box mb={3}>
                    <Typography variant='h6'>
                        CV (required)
                    </Typography>
                </Box>
                <Box ml={3}>
                    <S3Uploader cv={true} setCV={props.setCV} CV={props.CV}/>
                </Box>
            </Box>
            <Box mb={5}>
                <Divider/>
            </Box>
            <Typography variant='h6'>
                Additional Documents (optional)
            </Typography>
            {props.uploads.map((item, index)=> <div key={index} className="uploadDiv"><S3Uploader key={index} uploadNumber={index} uploads={props.uploads} setUploads={props.setUploads} cv={false} setCV={props.setCV}/></div>)}
        <Fab className='successFab' variant='extended' onClick={props.addUpload} ><Add/> Additional Upload</Fab>
        </div>

    )
}






export default UploadSupportingDocs