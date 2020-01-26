import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {API} from '../../../constants/api'
import {Grid, Paper, InputBase, IconButton, Box, 
    Divider, Fab, Typography, CircularProgress, Container} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search'
import JobCard from './jobCard'
import PerfectScrollbar from 'react-perfect-scrollbar'
import JobResult from './jobResult'
import {useKeyPress} from '../../../utils'





const JobSeekerSearch = (props) => {
    
    const [searchTerm, setSearchTerm] = useState('')
    const [noJobs, setNoJobs] = useState(false)
    const [searchRequest, setSearchRequest] = useState(
        {
            result:null,
            loading:false
        }
    )
    const [currentJob, setCurrentJob] = useState(null)
    const enterPress = useKeyPress('Enter');


    const handleClick = (job) => setCurrentJob(job)

    const handleSearchTermChange = (event) =>{
        setSearchTerm(event.target.value);
    };



    const outlinedBox = (jobId) => {
        if (!!currentJob && jobId == currentJob.id) {
            return true
        }
        else {
            return false
        }
    }

        

    const getSearchResult = (term) => {
        setSearchRequest({loading:true});
        if (term != null) {
            setNoJobs(true);
        }
        let headers = {"Content-Type": "application/json",
        "Authorization":`Token ${props.token}`
        };
        fetch(API+'jobseeker/open_jobs?search='+term, {headers, method:"GET"})
        .then(res => res.json())
        .then(data => {
            setSearchRequest({result:data, loading:false});
            console.log(data)
            if (data.length>0){
                setNoJobs(false)
            }
        })
    }  ;

    useEffect(() => {
       if (props.location.state && props.location.state.searchTerm===''){
           setSearchTerm('')
           getSearchResult('')
       }
       if (props.location.state && props.location.state.searchTerm) {
           setSearchTerm(props.location.state.searchTerm)
           getSearchResult(props.location.state.searchTerm)
       }
}, []);

    useEffect(()=> {
            if (enterPress) {
                getSearchResult(searchTerm)
            }
        }
        , [enterPress]
    )


    const handleSearch = event => {
        getSearchResult(searchTerm)
    }




    return(
        <Grid container style={{marginTop:20, maxWidth:'100%'}} spacing={3}>
            <Grid item xs={1}>
                <Typography style={{marginTop:14, textAlign:'right'}} variant="subtitle2">Search:</Typography>
                </Grid>
            <Grid item xs={9}>
                <Paper style={{padding: '2px 10px', display: 'flex', alignItems: 'space-between',width:'80%',}}>
                        <InputBase
                        placeholder="Search by Job Title or Organization"
                        style={{width:'95%'}}
                        inputProps={{ 'aria-label': 'search google maps' }}
                        name = 'searchTerm'
                        value = {searchTerm}
                        onChange = {handleSearchTermChange}
                        />
                        <IconButton aria-label="search" style={{marginLeft:'30'}}>
                            <SearchIcon onClick={handleSearch} disabled={searchRequest.loading} />
                        </IconButton>
                </Paper>
            </Grid>
            <Grid item xs={2}>
                <Fab variant='extended' size='large' color='primary'
                     onClick={()=>{
                         setSearchTerm('')
                         getSearchResult('')
                     }}
                > View all Jobs </Fab>
            </Grid>
            <Grid item xs={12}>
                <Divider variant="middle"/>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box className="viewBox">
                {
                    searchRequest.loading ?
                    <Box style={{height:'25vh', textAlign:'center', paddingTop:'20vh'}}>
                        <CircularProgress/> 
                    </Box>
                    :
                        noJobs ?
                            <Container>
                                <Typography>
                                    There are no jobs that match your search. Please try again or check back later!
                                </Typography>
                            </Container>

                            :
                        <PerfectScrollbar>
                        {searchRequest.result && searchRequest.result.map((job) => <Box style={{margin: '2px'}}
                                                                                        className={outlinedBox(job.id) && 'outlined'}>
                            <JobCard job={job} handleClick={handleClick}/></Box>)}
                        </PerfectScrollbar>

                    
                }
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                {currentJob && <JobResult job={currentJob}/>}
            </Grid>


        </Grid>
    )

}


const mapStateToProps = state => {
    return {
      token:state.auth.token
    }
  }

export default connect(mapStateToProps)(JobSeekerSearch)