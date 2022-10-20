import React, {useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FaSearch, FaRegHeart, FaRegUserCircle } from 'react-icons/fa';
import LanguageIcon from '@mui/icons-material/Language';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import {
  flexBetweenCenter,
  justifyCenter,
  fullWidthFlex,
} from '../styles/theme';
const footerMenu = [
  { id: 1, text: 'Change Language', icon: <LanguageIcon size={18} sx={{color:"#F9842C"}}/> },
  // { id: 2, text: 'Wishlist', icon: <FaRegHeart size={18} /> },
  // { id: 3, text: 'Login', icon: <FaRegUserCircle size={18} /> },
];

const FooterMenu = () => {
  const [ setLanguage] = React.useState('');
  const { i18n, t } = useTranslation(["common"]);

	useEffect(() => {
		if (localStorage.getItem("i18nextLng")?.length > 2) {
			i18next.changeLanguage("en");
		}
	}, []);

	const handleLanguageChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
      <Stack>
        {footerMenu.map((item) => {
          return (
            <Button key={item.id}>
              <Stack
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                direction="column"
                spacing={1}
              >
                {/* {item.icon} */}
                <Stack>
            <Paper sx={justifyCenter}>
              <Button sx={{ minWidth: 100 }}>
                <Box sx={{ ...justifyCenter, mr: 1 }}>
                  <LanguageIcon size={20} sx={{color:"#F9842C"}} />
                </Box>
                <FormControl>
                  <NativeSelect
                  defaultValue="en"
                  value={localStorage.getItem("i18nextLng")}
                  onChange={handleLanguageChange}
                  >
                    
              <option value="ki">Kinyarwanda</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
                  </NativeSelect>
                </FormControl>
              </Button>
            </Paper>
          </Stack>
              </Stack>
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default FooterMenu;
