import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


import * as ROUTES from '../../../constants/routes'
import {Link, withRouter} from 'react-router-dom'

function JobSeekerDrawer(props) {
        return (
        <MenuList style={{width:250}}>
              <MenuItem component={Link} to={ROUTES.JOBSEEKER_APPLY} >
                Apply
              </MenuItem>
          </MenuList>
        )
}

export default withRouter(JobSeekerDrawer)