import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactsIcon from '@mui/icons-material/Contacts';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WebAssetIcon from '@mui/icons-material/WebAsset';
export default function BottomNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Contact Us"
        value="recents"
        icon={<ContactsIcon sx={{color:"#F9842C"}} />}
      />
      <BottomNavigationAction
        label="About us"
        value="favorites"
        icon={<WebAssetIcon sx={{color:"#F9842C"}} />}
      />
      <BottomNavigationAction
        label="Videos"
        value="nearby"
        icon={<VideoLibraryIcon sx={{color:"#F9842C"}} />}
      />
      {/* <BottomNavigationAction label="T" value="folder" icon={<FolderIcon />} /> */}
    </BottomNavigation>
  );
}
