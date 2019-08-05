import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'


export default function EmployerDrawer(props) {
        return (
          <MenuList style={{width:250}}>
            <MenuItem component={Link} to={ROUTES.EMPLOYER_APP} >
              Home
            </MenuItem>
            <MenuItem component={Link} to={ROUTES.EMPLOYER_POST} >
              Post a New Job
            </MenuItem>
            <MenuItem component={Link} to={ROUTES.EMPLOYER_JOBS} >
              Job Positions
            </MenuItem>
            <MenuItem component={Link} to='#' >
              Inbox
            </MenuItem>
          </MenuList>
        )
}