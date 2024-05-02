import { Divider, ListItemButton, ListItemIcon } from "@mui/material";
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../styles/appbar";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../styles/theme";
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Box} from "@mui/material";
export default function Actions({ matches }) {

  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;

  return (
    <Component>
      <MyList type="row">
        {/* <Divider orientation="vertical" flexItem /> */}
        <ListItemButton
          sx={{
            justifyContent: "center",
            
          }}
        >
           <Box  
           sx={{
            minWidth: 100 ,
            display:{xs:"none",sm:"none",md:"block"},
            justifyContent: "center",
            color: matches && Colors.secondary,
          }}
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
          <option value={30}>Francais</option>
        </NativeSelect>
      </FormControl>
        </Box>
          
        </ListItemButton>
        {/* <Divider orientation="vertical" flexItem /> */}
        {/* <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <PersonIcon />
          </ListItemIcon>
        </ListItemButton> */}
        {/* <Divider orientation="vertical" flexItem /> */}
      </MyList>
    </Component>
  );
}
