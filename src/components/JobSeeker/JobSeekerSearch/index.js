import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {API} from '../../../constants/api'


const JobSeekerSearch = (props) => {
    
    const [searchTerm, setSearchTerm] = useState('')
    
    const [searchRequest, setSearchRequest] = useState(
        {
            result:null,
            loading:false
        }
    )

        

    const getSearchResult = (term) => {
        setSearchRequest({loading:true});
        let headers = {"Content-Type": "application/json",
        "Authorization":`JWT ${props.token}`
        };
        fetch(API+'jobseeker/open_jobs?search='+term, {headers, method:"GET"})
        .then(res => res.json())
        .then(data => {
            setSearchRequest({result:data, loading:false});
            console.log(data)
        })
    }   

    useEffect(() => {
        if (!!props.location.state.searchTerm) {
            setSearchTerm(props.location.state.searchTerm)
            getSearchResult(props.location.state.searchTerm);
        }
    }, [props.token])

    return(
        <div>{props.searchTerm}</div>
    )

}


const mapStateToProps = state => {
    return {
      token:state.auth.token
    }
  }

export default connect(mapStateToProps)(JobSeekerSearch)