import { AppbarContainer, AppbarHeader } from "../styles/appbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
import { IconButton ,Box} from "@mui/material";
import { useUIContext } from "../../context/ui";

export default function AppbarMobile({ matches }) {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();
  return (
    <AppbarContainer>
       <Box
        component="img"
        sx={{
          height: 40,
          width: 50,
        }}
        alt="mobicash logo"
        src="../../Assets/images/img_144.png"
      />
      <AppbarHeader textAlign={"center"} variant="h4">
      <Box
        component="img"
        sx={{
     
          height: 80,
          width: 350,
          maxHeight: { xs: 60, md: 300 },
          maxWidth: { xs: 150, md: 350 },
          display:{xs:"",sm:"block"}
        }}
        alt="mobicash logo"
        src="../../Assets/images/mobibanker.png"
      />
        
      </AppbarHeader>
      <IconButton onClick={() => setShowSearchBox(true)}>
        <SearchIcon />
      </IconButton>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}
