import React, {useState, Fragment, useEffect} from 'react';
import {API} from '../../../constants/api'
import {connect} from 'react-redux'
import {CircularProgress, Typography, Grid,Button} from '@material-ui/core/';
import {AttachFile} from '@material-ui/icons/'


var ReactS3Uploader = require('react-s3-uploader');


const S3Uploader = (props) => {

    const getInitialState = () => {
        let INITIAL_STATE =       {
            key:props.uploadNumber,
            started:false,
            finished:false,
            upload:null
        }
        if (props.cv && props.CV){
            INITIAL_STATE = {
                key:props.uploadNumber,
                started:true,
                finished:true,
                upload:props.CV
            }
        }
        if (!props.cv){
            let upload = props.uploads.find(x => x.key === props.uploadNumber)
            if (upload && upload.upload ){
                INITIAL_STATE = {
                    key:props.uploadNumber,
                    started:true,
                    finished:true,
                    upload:props.uploads.find(x => x.key === props.uploadNumber).upload
                }
            }
        }
        return INITIAL_STATE
    }

//     useEffect(()=>{
//         setUploadedFile(getInitialState())
//     },[])
//
//
//     const [uploadedFile, setUploadedFile] = useState(
//       {
//         key:props.uploadNumber,
//         started:false,
//         finished:false,
//         upload:null
//       }
// )

    const [uploadedFile, setUploadedFile] = useState(getInitialState())
  
      const uploadOngoing = uploadedFile.started && !uploadedFile.finished;
  
      const onUploadStart = (event) => {
          setUploadedFile({started:true})
      }
  
      const uploadFinish = (url) => {
          setUploadedFile({...uploadedFile,finished:true, upload:{url:url.getUrl, key:url.key}})
          if (!props.cv){
              let uploads = props.uploads
              uploads.find(x => x.key === props.uploadNumber).upload = {url:url.getUrl, key:url.key}
              props.setUploads(uploads)
          }
          else{
              props.setCV({url:url.getUrl, key:url.key})
          }
          }
      

      const handleRemove = (event) => {
        event.preventDefault();
        setUploadedFile({...uploadedFile,
          upload:null,
          started:false,
          finished:false
      })
          if (!props.cv){
              let uploads = props.uploads
              uploads.find(x => x.key === props.uploadNumber).upload = null
              props.setUploads(uploads)
          }
          else{
              props.setCV(null)
          }
          }
  
  

    return (
        <Grid>
          {
            uploadedFile.finished?
            <Fragment>
            <Typography className='inlineText'>Attachment: <a href={uploadedFile.upload.url} download target="_blank">{uploadedFile.upload.key}</a></Typography>
            &nbsp;
            &nbsp;
            <Button onClick={handleRemove}>Remove</Button>
            </Fragment>
            :
        <label htmlFor={'uploader'+props.uploadNumber}>
         <span className="uploaderWrapper" variant="extended">{uploadOngoing?   <CircularProgress />:<Fragment><AttachFile className="fileattach" /><Typography variant="overline" style={{cursor:'pointer'}} className='inlineText'>Chose File</Typography></Fragment>}</span>
        </label>
          }
        <ReactS3Uploader
        id={'uploader'+props.uploadNumber}
        className="reacts3"
        signingUrl="s3/sign/"
        signingUrlMethod="GET"
        accept="*/*"
        signingUrlWithCredentials={ false }      // in case when need to pass authentication credentials via CORS
        signingUrlHeaders={{ "Content-Type": "application/json",
        "Authorization":`Token ${props.token}`
        }}
        contentDisposition="auto"
        server={API}
        autoUpload={true}
        onSignedUrl={onUploadStart}
        onFinish = {uploadFinish}
        scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
        />
      </Grid>
    )
        
}

const CVuploader = (props) => {

  const [uploadedFile, setUploadedFile] = useState(
    {
      started:false,
      finished:false,
      upload:null
    }
)


    const uploadOngoing = uploadedFile.started && !uploadedFile.finished

    const onUploadStart = (event) => {
        setUploadedFile({started:true})
    }

    const uploadFinish = (url) => {
        setUploadedFile({...uploadedFile,finished:true, upload:{url:url.getUrl, key:url.key}})
        }
    

    const handleRemove = (event) => {
      event.preventDefault();
      setUploadedFile({...uploadedFile,
        upload:null,
        started:false,
        finished:false
    })
    }



  return (
      <Grid>
        {
          uploadedFile.finished?
          <Fragment>
          <Typography className='inlineText'>Attachment: <a href={uploadedFile.upload.url} download target="_blank">{uploadedFile.upload.key}</a></Typography>
          &nbsp;
          &nbsp;
          <Button onClick={handleRemove}>Remove</Button>
          </Fragment>
          :

      <label htmlFor={'uploaderCV'}>
       <span className="uploaderWrapper" variant="extended">{uploadOngoing?   <CircularProgress />:<Fragment><AttachFile className="fileattach" /><Typography variant="overline" style={{cursor:'pointer'}} className='inlineText'>Chose File</Typography></Fragment>}</span>
      </label>
        }
      <ReactS3Uploader
      id={'uploaderCV'}
      className="reacts3"
      signingUrl="s3/sign/"
      signingUrlMethod="GET"
      accept="*/*"
      signingUrlWithCredentials={ false }      // in case when need to pass authentication credentials via CORS
      signingUrlHeaders={{ "Content-Type": "application/json",
      "Authorization":`Token ${props.token}`
      }}
      contentDisposition="auto"
      server={API}
      autoUpload={true}
      onSignedUrl={onUploadStart}
      onFinish = {uploadFinish}
      scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
      />
    </Grid>
  )

}

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      token:state.auth.token
    }
  }



export default connect(mapStateToProps, null, null)(S3Uploader)
