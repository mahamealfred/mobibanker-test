import * as React from 'react';
import Link from '@mui/material/Link';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
const Widget = () => {
  const { t } = useTranslation(["home","common","login"]);
  const archives = [
    {
      url: "/",
      value:`${t("common:agentbusinessrules")}`
    },
    {
      url: "/",
      value: `${t("common:aml/cft")}`
    },
    {
      url: "/",
      value: `${t("common:mobiscansanctionlist")}`
    },
    {
      url: "/",
      value:`${t("common:trainings")}`
    },
    {
      url: "/",
      value: `${t("common:bnr/regulation")}`
    },
    {
      url: "/faq",
      value: `FAQs`
    }
  ]
  const agentSupportArchives = [
    {
      url: "https://support.mobicash.rw/",
      value: `${t("common:supportticket")}`
    },
    {
      url: "/",
      value: `${t("common:livechat")}`
    },
    {
      url: "/",
      value: `${t("common:message")}`
    },
    {
      url: "https://mobiyellow.com/",
      value: `${t("common:videos")}`
    },
    {
      url: "/",
      value: `${t("common:address")}`
    }
  ]
  return (
    <Box
      sx={{
        my: 8,
        mx: {xs:1,sm:2,md:12},
        height:"auto",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" fontWeight={100} mt={1}>
        {/* <img src="../../Assets/images/mobibanker.png" alt="logo" height="100" width="350" /> */}
      </Typography>
      <List sx={{
        width: '100%',
        maxWidth: 360,
        // bgcolor: 'background.paper'
        backgroundColor: 'transparent',

      }}>
        <ListItem alignItems="flex-start"
        >
          <ListItemAvatar
            sx={{ padding: '0 10px' }}
          >
            {/* <Avatar alt="Remy Sharp" src="" /> */}
            <img src="../../Assets/images/knowledge.png" alt="logo" height="120" width="100" margin="50px" />
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
                      {t("common:knowledgebase")}
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
                    <Link display="block" href={archive.url} key={archive.value}
                 
                    >
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
            sx={{ padding: '0 10px' }}
          >
            {/* <Avatar alt="Agent Support" src="" /> */}
            <img src="../../Assets/images/support.png" alt="logo" height="120" width="100" margin="50px" />
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
                  {t("common:agentsupport")}
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
                    {agentSupportArchives.map((archive) => (
                    <Link display="block" href={archive.url} key={archive.value}
                    >
                      -{archive.value}
                    </Link>
                  ))}
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