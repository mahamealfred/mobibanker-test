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
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import SettingsIcon from '@mui/icons-material/Settings';
const handleLogout=()=> {

  localStorage.removeItem("mobicashAuth");
  sessionStorage.removeItem("mobicash-auth")
   window.location.reload(true);
};

export const mainListItems = (
  
  <React.Fragment >
    <ListItemButton sx={{marginTop:3}} >
      <ListItemIcon>
        <DashboardIcon sx={{color:"#F9842C"}} />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Person sx={{color:"#F9842C"}} />
      </ListItemIcon>
      <ListItemText primary="My Profile" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ReceiptLongIcon  sx={{color:"#F9842C"}}  />
      </ListItemIcon>
      <ListItemText primary="Previous Transactions" />
    </ListItemButton>
    <ListItemButton >
      <ListItemIcon>
        <ChangeCircleIcon sx={{color:"#F9842C"}} />
      </ListItemIcon>
      <ListItemText primary="Change Password" />
    </ListItemButton>
    <ListItemButton sx={{display:{xs:"block",sm:"none",md:"none",lg:"none"}}}>
      <ListItemIcon>
        <LanguageIcon sx={{color:"#F9842C"}} />
      </ListItemIcon>
      <ListItemText primary="Change Language" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      <ListItemIcon>
        <SettingsIcon sx={{color:"#F9842C"}} />
      </ListItemIcon>
     Settings
    </ListSubheader> */}
   
    <ListItemButton sx={{marginTop:10,display:{xs:"block",sm:"none",md:"none"}}} onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon sx={{color:"#F9842C"}} />
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