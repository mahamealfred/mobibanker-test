import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  AppbarActionIcons,
  AppbarContainer,
  AppbarHeader,
  MyList,
} from "../styles/appbar";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Actions from "./actions";
import { useUIContext } from "../../context/ui";

export default function AppbarDesktop({ matches }) {
  
  const { setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer >
        <Box
        component="img"
        sx={{
          height: 80,
          width: 250,
          marginLeft:8,
          maxHeight: { xs: 60, md: 300 },
          maxWidth: { xs: 150, md: 300 },
          display:{xs:"none",sm:"block"}
        }}
        alt="mobicash logo"
        src="../../Assets/images/logo.png"
      />
            <Box
            
          sx={{
            display:{xs:"block",sm:"none"}
          }}
        >
        <img src="../../Assets/images/img_144.png" alt="logo" height="40" width="50" margin="50px"/>
        </Box>
      <MyList type="row">
      <Box
        component="img"
        sx={{
          height: 80,
          width: 300,
          maxHeight: { xs: 60, md: 300 },
          maxWidth: { xs: 150, md: 300 },
          display:{xs:"none",sm:"block"}
        }}
        alt="mobicash logo"
        src="../../Assets/images/mobibanker.png"
      />
          </MyList>
       <Actions matches={matches} />   
    </AppbarContainer>
  );
}
