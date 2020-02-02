import React, {Fragment, useState} from 'react';
import JobSeekerDrawer from "../JobSeeker/JobSeekerDrawer"
import Nav from "../Nav";
import * as ROLES from "../../constants/roles";
import EmployerDrawer from "../Employer/EmployerDrawer";
import { connect } from "react-redux";
import {Paper, Grid, Box, Typography, IconButton, Fab, CircularProgress, TextField, Divider, Button} from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import axios from 'axios'
import {API} from "../../constants/api";
import {auth} from "../../actions";

const Profile = (props) => {

    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState(props.auth.user.first_name)
    const [lastName, setLastName] = useState(props.auth.user.last_name)
    const [telephoneNumber, setTelephoneNumber] = useState(props.auth.user.telephone_number)
    const [organization, setOrganization] = useState(props.auth.user.organization)
    const [oldPassword, setOldPassword] = useState('')
    const [newPasswordOne, setNewPasswordOne] = useState('')
    const [newPasswordTwo, setNewPasswordTwo] = useState('')
    const [passwordChangeLoading, setPasswordChangeLoading] = useState(false)
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false)
    const [passwordChangeError, setPasswordChangeError] = useState(false)

    const isDisabled = oldPassword==='' || newPasswordOne==='' || newPasswordTwo===''

    const notMatching = newPasswordOne !== newPasswordTwo

    const handlePasswordChange = () => {
        setPasswordChangeLoading(true)
        setPasswordChangeSuccess(false)
        setPasswordChangeError(false)
        let body = {
            new_password1:newPasswordOne,
            new_password2:newPasswordTwo,
            old_password:oldPassword
        }
        let headers = {"Content-Type": "application/json",
            "Authorization":`Token ${props.auth.token}`
        };
        axios.post(API+'accounts/auth/password/change/', body, {headers:headers})
            .then(res => {
                console.log(res.data)
                setPasswordChangeSuccess(true)
                setPasswordChangeLoading(false)
                setOldPassword('')
                setNewPasswordOne('')
                setNewPasswordTwo('')
            })
            .catch(error=>{
                console.log(error)
                setPasswordChangeError(true)
                setPasswordChangeLoading(false)
            })

    }

    const handleSave = () => {
        setLoading(true)

        let body = {
            first_name:firstName,
            last_name:lastName,
            telephone_number:telephoneNumber,
            organization:organization
        }
        let headers = {"Content-Type": "application/json",
            "Authorization":`Token ${props.auth.token}`
        };
        console.log(body)
        axios.patch(API+'accounts/users/'+props.auth.user.id+'/', body, {headers:headers})
            .then(res=>{
                let new_data = {
                  first_name:res.data.first_name,
                  last_name:res.data.last_name,
                  telephone_number:res.data.telephone_number,
                  organization:res.data.organization
                }
                props.updateUser(new_data)
                }
            )
        setLoading(false)
        setEditing(false)
    }


    return (
        <div>
            <Nav drawerList={props.auth.role === ROLES.JOBSEEKER ? <JobSeekerDrawer/> : <EmployerDrawer/>}  user={props.auth.user} />
            <Box style={{marginRight:'10%', marginLeft: '10%', marginTop:50, marginBottom:20}}>
                <Paper className='graypaper'>
                    <Grid container style={{padding:20, paddingBottom:100}} spacing={5} >
                        <Grid
                        container
                        xs={12}
                        justify='center'
                        >
                            <Typography variant='h4'>
                               &nbsp;&nbsp;&nbsp; Your Profile
                            </Typography>
                            &nbsp; &nbsp;
                            {loading ?
                                <CircularProgress color='primary' />
                                :
                                (
                                    editing ?
                                        <Fab variant='round' size='small' color='primary'
                                             onClick={handleSave}>
                                            <SaveIcon/>
                                        </Fab>
                                        :
                                        <IconButton onClick={() => setEditing(true)}>
                                            <EditIcon/>
                                        </IconButton>
                                )
                            }
                        </Grid>
                        <Grid
                        container
                        style={{marginLeft:'10%', marginTop:20, marginRight:'10%'}}
                        spacing={3}
                        >
                            <Grid
                                item
                                xs={6}
                            >
                                <Typography>
                                    <strong>Email:&nbsp;&nbsp;</strong>{props.auth.user.email}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <Typography>
                                    <strong>Telephone Number:&nbsp;&nbsp;</strong>
                                    {
                                        editing ?
                                            <TextField
                                                value={telephoneNumber}
                                                onChange={(event)=>setTelephoneNumber(event.target.value)}
                                            />
                                            :
                                            telephoneNumber
                                    }
                                </Typography>
                            </Grid>
                            {props.auth.role === ROLES.JOBSEEKER ?
                            <Fragment>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <Typography>
                                        <strong>First Name: </strong>
                                        {
                                            editing ?
                                                <TextField
                                                    value={firstName}
                                                    onChange={(event)=>setFirstName(event.target.value)}
                                                />
                                                :
                                                firstName
                                        }

                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <Typography>
                                        <strong>Last Name: </strong>
                                    {
                                        editing ?
                                            <TextField
                                                value={lastName}
                                                onChange={(event)=>setLastName(event.target.value)}
                                            />
                                            :
                                            lastName
                                    }
                                    </Typography>
                                </Grid>
                            </Fragment>
                                :
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Typography>
                                        <strong>Organization: </strong>
                                        {
                                            editing ?
                                                <TextField
                                                    value={organization}
                                                    onChange={(event)=>setOrganization(event.target.value)}
                                                />
                                                :
                                                organization
                                        }
                                    </Typography>
                                </Grid>
                            }
                            <Grid xs={12} item>
                                <Divider/>
                            </Grid>
                            <Grid container spacing={5}>
                                <Grid item xs={12} style={{textAlign:'center'}}>
                                    <Typography variant='h5'>Change Password</Typography>
                                </Grid>
                                <Grid item xs={3}/>
                                <Grid item xs={9}>
                                    <TextField
                                        placeholder='Old Password'
                                        type="password"
                                        value={oldPassword}
                                        onChange={(event)=>setOldPassword(event.target.value)}
                                        style={{width:'50%'}}
                                    />
                                </Grid>
                                <Grid item xs={3}/>
                                <Grid item xs={9}>
                                    <TextField
                                        placeholder='New Password'
                                        type="password"
                                        value={newPasswordOne}
                                        onChange={(event)=>setNewPasswordOne(event.target.value)}
                                        style={{width:'50%'}}
                                    />
                                </Grid>
                                <Grid item xs={3}/>
                                <Grid item xs={9}>
                                    <TextField
                                        placeholder='Repeat New Password'
                                        type="password"
                                        value={newPasswordTwo}
                                        onChange={(event)=>setNewPasswordTwo(event.target.value)}
                                        style={{width:'50%'}}
                                    />
                                </Grid>
                                <Grid item xs={3}/>
                                <Grid item xs={9}>
                                    <Button onClick={handlePasswordChange} disabled={notMatching || isDisabled || passwordChangeLoading}>
                                        {passwordChangeLoading ? <CircularProgress/> : 'Change Password'}
                                    </Button>
                                </Grid>
                                {(!isDisabled && notMatching) &&
                                <Fragment>
                                <Grid item xs={3}/>
                                <Grid item xs={9}>
                                    <Typography> Passwords do not match</Typography>
                                </Grid>
                                </Fragment>
                                }
                                {passwordChangeError &&
                                <Fragment>
                                    <Grid item xs={3}/>
                                    <Grid item xs={9}>
                                        <Typography>Error! Your password is not correct.</Typography>
                                    </Grid>
                                </Fragment>
                                }
                                {passwordChangeSuccess &&
                                <Fragment>
                                    <Grid item xs={3}/>
                                    <Grid item xs={9}>
                                        <Typography>New password was successfully saved!</Typography>
                                    </Grid>
                                </Fragment>
                                }

                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </Box>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (data) => {
            return dispatch(auth.updateUser(data));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
