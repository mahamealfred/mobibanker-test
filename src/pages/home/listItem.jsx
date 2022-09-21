import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Person } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Redirect, useHistory} from "react-router-dom";
import Login from "../../pages/login/Login"


const handleLogout=()=> {

  localStorage.removeItem("mobicashAuth");
  sessionStorage.removeItem("mobicash-auth")
   window.location.reload(true);
};

export const mainListItems = (
  
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon sx={{color:"orange"}} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Person sx={{color:"orange"}} />
      </ListItemIcon>
      <ListItemText primary="My Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon sx={{color:"orange"}}  />
      </ListItemIcon>
      <ListItemText primary="Previous Transactions" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon sx={{color:"orange"}} />
      </ListItemIcon>
      <ListItemText primary="Change Password" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
     Settings
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon sx={{color:"orange"}} />
      </ListItemIcon>
      <ListItemText primary="Change Language" />
    </ListItemButton>
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <AssignmentIcon sx={{color:"orange"}} />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
    
  </React.Fragment>
);


const listItem = () => {
  return (
    <div>listItem</div>
  )
}

export default listItem