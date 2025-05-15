import { IconButton, Stack } from '@mui/material'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { blue, grey } from '@mui/material/colors';
import { forwardRef } from 'react';

const ScrollButton = forwardRef(({upOnClick=()=>{},
                                  downOnClick=()=>{},
                                  hideUpIcon = false,
                                  hideDownIcon = false,
                                  iconStyle={}}, ref) => {

    const defaultIconBkgrdStyle = {

        opacity: 0.5,
        backgroundColor: grey[600],
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '&:hover':{
            opacity: 0.3,
            backgroundColor: blue[600]
        },
        ...iconStyle
    };

    const defaultIconStyle = {
            opacity: 0.8,
            color: grey[900],
            fontSize: '2.5rem',
            '&:hover':{
                color: grey[300]
            }
        };


    return (
        <Stack direction={'column'} spacing={4}
            ref={ref} 
            sx={{
                padding:0,
                margin:0
            }}
        >
            <IconButton aria-label="scrollUp"
                onClick={upOnClick}
                sx={{
                    ...defaultIconBkgrdStyle,
                    display: hideUpIcon ? 'none' : 'flex'
                }}
            >
                <ArrowDropUpIcon 
                    sx={defaultIconStyle}
                />
            </IconButton>

            <IconButton aria-label="scrollUp"
                onClick={downOnClick}
                sx={{
                    ...defaultIconBkgrdStyle,
                    display: hideDownIcon ? 'none' : 'flex'
                }}
            >
                <ArrowDropDownIcon 
                    sx={defaultIconStyle}
                />
            </IconButton>

        </Stack>
    )
});

export default ScrollButton;