import React, {useEffect} from 'react'
import {Container, Divider, Box, Typography} from '@material-ui/core/';



const ReviewSubmit = (props) => {



    return (
        <div>
            <Typography variant='h6'>
                Cover Letter
            </Typography>
            <Container>
                <Typography dangerouslySetInnerHTML={{ __html: props.coverLetter }}/>
            </Container>
            <Box mb={5} mt={5}>
                <Divider/>
            </Box>
            <Typography variant='h6'>
                CV
            </Typography>
            <Container>
                <Typography><a href={props.CV.url} download target="_blank">{props.CV.key}</a></Typography>
            </Container>
            <Box mb={5} mt={5}>
                <Divider/>
            </Box>
            <Typography variant='h6'>
                Additional Documents
            </Typography>
            <Container>
                {props.uploads.map((upload)=> {
                        if (upload.upload) {
                            return <Typography><a href={upload.upload.url} download target="_blank">{upload.upload.key}</a></Typography>
                        }
                    }
                )
                }
            </Container>
            <Box mb={5} mt={5}>
                <Divider/>
            </Box>


        </div>
    )
}


export default ReviewSubmit