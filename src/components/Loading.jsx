import { Box, CircularProgress, Typography } from '@mui/material'
import {} from 'react'

import {INFO_COLOR, PARAGRAPH_BKGRD_COLOR} from '../script/constant'

const Loading = ({minHeight = 500, bkgrdColor = PARAGRAPH_BKGRD_COLOR}) => {
  return (
    <Box sx={{border: 'none',
        width : '100%',
        minHeight : minHeight,
        backgroundColor: bkgrdColor,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px'
            }}>
            <CircularProgress/>
            <Typography variant="h6" sx={{color: INFO_COLOR}}>Loading. . .</Typography>
        </Box>
    </Box>
  )
}

export default Loading