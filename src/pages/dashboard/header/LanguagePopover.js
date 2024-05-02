import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'ki',
    label: 'Kinyarwanda',
    icon: '/assets/icons/ic_flag_ki.png',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/ic_flag_fr.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { i18n,t } = useTranslation(["home","common","login"]);
  const [open, setOpen] = useState(null);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };
  const handleLanguageChange = (e) => {
		i18n.changeLanguage(e);
    setOpen(null);
	};

  return (
    <>


  <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        {LANGS.map((option) => (
          localStorage.getItem("i18nextLng")===option.value?
          <img  src={option.icon} alt={option.label} />:null
        ))}
      
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} defaultValue={LANGS[0].value}  selected={option.value === LANGS[0].value}  
            value={localStorage.getItem("i18nextLng")}
            onClick={(e)=>{
              
              handleLanguageChange(option.value)
            }}
            // onChange={(e)=>{handleLanguageChange(option.value)}}
            >
          
                <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
            
            
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
