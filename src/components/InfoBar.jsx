import Box from '@mui/material/Box';
import { alpha, Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import profilePic from '../assets/sam.png'

import {GRID_PADDING_VALUE_PX, INFO_COLOR} from '../script/constant'
import { memo } from 'react';

const tagList = ["Mechatronic Engineer", "Software Engineer / Developer", "Academic Researcher"];

const contactItemList = [
  {
    "icon": MailOutlineIcon,
    "content": "demondemontcchow @gmail.com",
    "href" : "https://mail.google.com/mail/?view=cm&fs=1&to=demondemontcchow@gmail.com"
  },
  {
    "icon": LocationOnIcon,
    "content": "Burnaby, Vancouver, B.C., Canada",
    "href" : null
  },
  {
    "icon": LinkedInIcon,
    "content" : "linkedin/SamuelChow",
    "href": "https://www.linkedin.com/in/samueltcchow/"
  },
  {
    "icon": GitHubIcon,
    "content": "github/SamuelChow",
    "href": "https://github.com/Samuel-Chow-demon"
  }
];

const InfoListItem = memo(({IconComponent, content, href, color, sizeScale = 1})=>{

    return (
      <ListItem sx={{
        width : "100%",
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0px',
        gap: '10px'
      }}>
        <ListItemAvatar sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2px',
          backgroundColor: alpha(grey[700], 0.5),
          width: 24 * sizeScale,
          height: 24 * sizeScale,
          borderRadius: "25%"
          // boxShadow: `
          //   0 0 6px 1px rgba(138, 43, 226, 0.7),   /* purple glow */
          //   0 0 8px 3px rgba(0, 191, 255, 0.5)     /* blue glow */
          // `
          
          }}>
          <IconComponent sx={{
            color: color,
            fontSize: 24 * sizeScale,
          }}/>
        </ListItemAvatar>

        <ListItemText 
          component = "a"
          href = {href}
          target = "_blank"
          // Not passing information and run javascript for cross browser checking
          rel = "noopener noreferrer"

          sx={{
            textDecoration: "none",
            '&:hover' : {
              textDecoration: "underline",
              cursor: "pointer"
            },
            color: color,
            fontSize: `${14 * sizeScale}px`,
            flexWrap: 'wrap'
            }}>
            {content}
        </ListItemText >
      </ListItem>
    );
  });

const InfoBar = () => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: 'max(300px, 100%)',
      minHeight: `max(100%, calc(100vh - ${GRID_PADDING_VALUE_PX * 2}px))`,
      boxSizing: 'border-box',
      margin: 0,
      padding: 3,
      borderRadius: 4,
      border: 1,
      borderColor: grey[800],
      backgroundColor: grey[900],
      opacity: 0.9
    }}>
      <Avatar 
        alt="pic"
        src={profilePic}
        sx={{
           width : '8rem',
           height: '8rem',
           marginTop: 5}}
        slotProps={{
          img:{fetchPriority: 'high'}
        }}
      />

      <Typography variant='h5' sx={{
        color: 'white',
        marginTop: '20px'
      }}
      
      >Samuel Chow</Typography>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: '10px',
        marginTop: '20px'
      }}>
        {
          tagList.map(item=>(
            <Chip key={item} label={item} sx={{
              color: grey[400],
              backgroundColor: grey[700]
            }}/>
          ))
        }
      
      </div>

      <List sx={{
        width: "100%",
        display:'flex',
        flexDirection:'column',
        backgroundColor: 'none',
        padding: '0px',
        gap: '20px',
        marginTop: '80px'
      }}>
        {
          contactItemList.map((item, key)=>(

            <InfoListItem key={key}
                          IconComponent={item.icon}
                          content={item.content}
                          href={item.href}
                          color={INFO_COLOR}/>

          ))
        }
      </List>
        
    </Box>
  )
}

export default memo(InfoBar);