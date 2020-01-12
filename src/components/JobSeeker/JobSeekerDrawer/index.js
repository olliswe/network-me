import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


import * as ROUTES from '../../../constants/routes'
import {Link, withRouter} from 'react-router-dom'

function JobSeekerDrawer(props) {
        return (
        <MenuList style={{width:250}}>
              <MenuItem component={Link} to={ROUTES.JOBSEEKER_APP} >
                Home
              </MenuItem>
              <MenuItem component={Link} to={ROUTES.JOBSEEEKER_SEARCH} >
                Apply
              </MenuItem>
              <MenuItem component={Link} to={ROUTES.JOBSEEKER_MY_APPS} >
                My Applications
              </MenuItem>
              <MenuItem component={Link} to={ROUTES.JOBSEEKER_INBOX} >
                Inbox
              </MenuItem>
          </MenuList>
        )
}

export default withRouter(JobSeekerDrawer)