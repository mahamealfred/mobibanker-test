import {
    ChevronLeft,
    Dashboard,
    KingBed,
    Logout,
    MarkChatUnread,
    NotificationsActive,
    PeopleAlt,
  } from '@mui/icons-material';
  import {
    Avatar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Tooltip,
    Typography,
  } from '@mui/material';
  import MuiDrawer from '@mui/material/Drawer';
  import { useMemo, useState,useEffect } from 'react';
  import { Route, Switch } from 'react-router-dom';
  import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Person } from '@mui/icons-material';
import Transactions from '../transactions/Transactions';
import { useHistory } from 'react-router-dom';
import jwt from "jsonwebtoken";
import Changepassword from '../changepassword/Changepassword';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import Account from '../myaccount/Account';
import WalletIcon from '@mui/icons-material/Wallet';
import { useTranslation } from "react-i18next";
//   import { useValue } from '../../context/ContextProvider';
//   import Main from './main/Main';
//   import Messages from './messages/Messages';
//   import Requests from './requests/Requests';
//   import Rooms from './rooms/Rooms';
//   import Users from './users/Users';
  
  const drawerWidth = 240;
  
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));
  
  const ListItems= ({ open, setOpen }) => {
    // const {
      const { i18n,t } = useTranslation(["home","common","login"]);
    //   state: { currentUser },
    //   dispatch,
    // } = useValue();
   const history =useHistory();
    const [selectedLink, setSelectedLink] = useState('');
    const [openChangepassword,setOpenChangepassword]=useState(false)
    const [openPrivousTransactions,setOpenPrivousTransactions]=useState(false)
    const [openMyAccount,setOpenMyAccount]=useState(false)
    const handleClose=()=>{
      setOpenChangepassword(false)
      setOpenPrivousTransactions(false)
      setOpenMyAccount(false)
    }
    // const list = useMemo(
    //   () => [
    //     {
    //       title: 'My Account',
    //       icon: <Dashboard />,
    //       link: '/',
    //       component: <Transactions {...{ setSelectedLink, link: '' }} />,
    //     },
    //     {
    //       title: 'My Profile',
    //       icon: <Person />,
    //       link: 'users',
    //       component: <Transactions {...{ setSelectedLink, link: 'users' }} />,
    //     }
    //   ],
    //   []
    // );
  
    const decode= (token) => {
      const JWT_SECRET="tokensecret";
      const payload = jwt.verify(token, JWT_SECRET);
       return payload;
    }
    useEffect(() => {
      const token =localStorage.getItem('mobicashAuth');
      if (token) {
      const {name}=decode(token);
     
    }
   
    }, []);
  const handleHome=()=>{
    return history.push('/dashboard',{push:true})
  }
  const handleMyaccount=()=>{
    return history.push('/dashboard/my-account',{push:true})
  }
  const handleMyprofile=()=>{
    return history.push('/dashboard/my-profile',{push:true})
  }
    const handleLogout = () => {
      localStorage.removeItem('mobicashAuth');
      sessionStorage.removeItem('mobicash-auth')
     return history.push('/display',{push:true})
    };
    return (
      <>
<Dialog
        open={openMyAccount}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" color="gray" >
         My Account
          </Typography>
          <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
      <Account/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
<Dialog
        open={openChangepassword}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" color="gray" >
   {t("common:changepassword")}
          </Typography>
          <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
      <Changepassword/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openPrivousTransactions}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="100%"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title"
               style={{ overflow: "hidden" }}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", 
            },
          },
        }}
        >
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
         
          <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
   
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
       <Transactions/>
          </DialogContentText>
        </DialogContent>
      </Dialog>


      {/* ------------------------------------ */}
          <List>
          {/* {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                 onClick={() => history.push(item.link,{push:true})}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#F9842C"
                  }}
                 
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))} */}
            <Tooltip title={t("common:services")}>
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
               onClick={handleHome}
                // selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#F9842C"
                  }}
                 
                >
                  <Dashboard/>
                </ListItemIcon>
                <ListItemText
                  primary=  {t("common:services")}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            </Tooltip>
          
            <Tooltip title= {t("common:myaccount")}>
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
               onClick={handleMyaccount}
                // selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#F9842C"
                  }}
                 
                >
                  <WalletIcon/>
                </ListItemIcon>
                <ListItemText
                  primary= {t("common:myaccount")}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            </Tooltip>
           
            <Tooltip title={t("common:myprofile")} >
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              onClick={handleMyprofile}
                // selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#F9842C"
                  }}
                 
                >
                  <Person/>
                </ListItemIcon>
                <ListItemText
                  primary= {t("common:myprofile")}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            </Tooltip>
           
            <Tooltip title={t("common:preioustransaction")} >
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>setOpenPrivousTransactions(true)}
                // selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#F9842C"
                  }}
                 
                >
                  <ReceiptLongIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={t("common:preioustransaction")}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            </Tooltip>
            <Tooltip title={t("common:changepassword")}  >
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                 onClick={()=>setOpenChangepassword(true)}
                // selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#F9842C"
                  }}
                 
                >
                  <ChangeCircleIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={t("common:changepassword")}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            </Tooltip>
            
        </List>
        <Divider />
        <List>
        <Tooltip title={t("common:changelanguage")}  >
        <ListItem  disablePadding sx={{ display:{xs:"flex",sm:"none",md:"none"}}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                // onClick={()=>setOpenPrivousTransactions(true)}
                // selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#F9842C"
                  }}
                 
                >
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("common:changelanguage")}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
        </Tooltip>
        
        </List>
        {/* <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
          <Tooltip title={"name" || ''}>
            <Avatar
              src=""
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box> */}
        <Box sx={{ textAlign: 'center',display:{xs:"block",sm:"none",md:"none"} }}>
          {
            open==true?
            <>
            <Typography>Name</Typography>
            <Typography variant="body2">Mobicoretester2</Typography>
            <Typography variant="body2">mahame@gmail.com</Typography>
            </>:null
          }
          {/* {open && <Typography>Name</Typography>}
          <Typography variant="body2">Mobicoretester2</Typography>
          {open && (
            <Typography variant="body2">mahame@gmail.com</Typography>
          )} */}
          <Tooltip title="Logout"  >
            <IconButton
            sx={{
              color:"#F9842C"
            }}
             onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      {/* </Drawer> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <DrawerHeader />
        <Switch>
          {/* {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))} */}
        </Switch>
      </Box>
      </>
    );
  };
  
  export default ListItems;