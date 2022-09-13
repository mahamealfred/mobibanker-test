import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TopNav from '../../components/topNav/TopNav';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Services from '../services/Services';
import Widget from '../../components/widget/Widget';

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



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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
    }),
);

export default function Home() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        margin: 10
    });
    const MobiLogoImg = styled(Box)(({ theme }) => ({
        marginLeft: 35,
    }))
    const MobiBankerImg = styled(Box)(({ theme }) => ({
        marginRight: 35,
    }))
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',}} >
                <CssBaseline />
                <AppBar position="fixed" open={open} elevation={1} sx={{ backgroundColor: 'white', display: 'flex' }} >
                    <StyledToolbar
                        sx={{ display: 'flex' }}
                    >
                        <MobiLogoImg>
                            <Box
                                sx={{ display: { xs: "block", sm: "none" } }}
                            >
                                <IconButton
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{
                                        marginRight: 5,
                                        ...(open && { display: 'none' }),

                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            <Box
                                sx={{ display: { xs: "none", sm: "block" } }}
                            >
                                <IconButton
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{
                                        marginRight: 5,
                                        ...(open && { display: 'none' }),

                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <img src="../../Assets/images/logo.png" alt="logo" height="40" width="150" margin="50px" />
                            </Box>
                        </MobiLogoImg>
                        < MobiBankerImg>
                            <Box
                                sx={{ minWidth: 100, display: { xs: "none", sm: "block" } }}
                            >
                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    </InputLabel>
                                    <NativeSelect
                                        defaultValue={10}
                                        inputProps={{
                                            name: 'age',
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        <option value={10}>Kinyarwanda</option>
                                        <option value={20}>English</option>
                                        <option value={30}>French</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box >
                            <Box
                                sx={{ minWidth: 100, display: { xs: "block", sm: "none" } }}
                            >
                                <img src="../../Assets/images/logo.png" alt="logo" height="40" width="150" margin="50px" />
                            </Box>

                        </MobiBankerImg>

                    </StyledToolbar>

                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <Typography variant="h6" noWrap component="div"  >
                            Mobibanker Menu
                        </Typography>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {['Chek Balance', 'Logs', 'Previous Transactions', 'Change Password'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['About Us', 'Get in Touch', 'Settings'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Grid container component="main" sx={{ height: '60vh', backgroundColor: 'primary' }}>
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square
                            sx={{
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <Services />
                        </Grid>
                        
                        <Grid item
                        // xs={false}
                        component={Paper} elevation={0} square
        xs={12}
        sm={4}
        md={7}
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      <Widget/>
        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>

    );
}
