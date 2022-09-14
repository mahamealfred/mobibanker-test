import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
    Avatar,
    AvatarGroup,
    Box,
    Divider,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
  } from "@mui/material";


const Widget = () => {
  const archives=[
    {
      url:"/",
      value:"Agent Business Rules"
    },
    {
      url:"/",
      value:"AML/CFT"
    },
    {
      url:"/",
      value:"MobiScan Sanction List"
    },
    {
      url:"/",
      value:"Traning"
    },
    {
      url:"/hello",
      value:"BNR Regulation"
    }
  ]
  return (
    <Box
    sx={{
      my: 12,
      mx: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
 <Typography variant="h6" fontWeight={100} mt={2}>
 <img src="../../Assets/images/mobibanker.png" alt="logo" height="80" width="300" />
        </Typography>
        <List sx={{ width: '100%', 
        maxWidth: 360, 
        // bgcolor: 'background.paper'
        backgroundColor: 'transparent',

         }}>
      <ListItem alignItems="flex-start" 
      >
        <ListItemAvatar
         sx={{padding:'0 10px'}}
        >
          {/* <Avatar alt="Remy Sharp" src="" /> */}
          <img src="../../Assets/images/knowledge.png" alt="logo" height="120" width="80" margin="50px"/>
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
              component="span"
              variant="body3"
              color="text.primary"
              mt={2}
              fontWeight={800} 
              >
              Knowledgebase
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
              >
              {archives.map((archive) => (
        <Link display="block" href={archive.url} key={archive.value}>
          -{archive.value}
        </Link>
      ))}
          </Typography>  
        </React.Fragment>
          }
          
        />
        
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar
            sx={{padding:'0 10px'}}
        >
          {/* <Avatar alt="Agent Support" src="" /> */}
          <img src="../../Assets/images/support.png" alt="logo" height="80" width="80" margin="50px"/>
        </ListItemAvatar>
        
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
              component="span"
              variant="body3"
              color="text.primary"
              mt={2}
              fontWeight={800} 
              >
              Agent Support
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
            
            </React.Fragment>
          }
        />
      </ListItem>
      
    </List>
</Box>
  )
}

export default Widget