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
  import { useMemo, useState } from 'react';
  import { Route, Switch } from 'react-router-dom';
  import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Person } from '@mui/icons-material';
import Transactions from '../transactions/Transactions';
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
    //   state: { currentUser },
    //   dispatch,
    // } = useValue();
  
    const [selectedLink, setSelectedLink] = useState('');
  
    const list = useMemo(
      () => [
        {
          title: 'My account',
          icon: <Dashboard />,
          link: '',
          component: <Transactions {...{ setSelectedLink, link: '' }} />,
        },
        {
          title: 'My profile',
          icon: <Person />,
          link: 'users',
          component: <Transactions {...{ setSelectedLink, link: 'users' }} />,
        },
        {
          title: 'Change password',
          icon: <ChangeCircleIcon  />,
          link: 'rooms',
          component: <Transactions {...{ setSelectedLink, link: 'rooms' }} />,
        }
      ],
      []
    );
  
    // const navigate = useNavigate();
  
    const handleLogout = () => {
    //   dispatch({ type: 'UPDATE_USER', payload: null });
    //   navigate('/');
    };
    return (
      <>
          <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                // onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
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
          ))}
        </List>
        <Divider />
        {/* <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
          <Tooltip title={currentUser?.name || ''}>
            <Avatar
              src={currentUser?.photoURL}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          {open && <Typography>{currentUser?.name}</Typography>}
          <Typography variant="body2">{currentUser?.role || 'role'}</Typography>
          {open && (
            <Typography variant="body2">{currentUser?.email}</Typography>
          )}
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box> */}
      {/* </Drawer> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Switch>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
        </Switch>
      </Box>
      </>
    );
  };
  
  export default ListItems;