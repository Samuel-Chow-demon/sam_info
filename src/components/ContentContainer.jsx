import { memo } from 'react'

import { Card, CardContent, CardHeader,
  Typography} from '@mui/material';

import {INFO_COLOR, PARAGRAPH_BKGRD_COLOR} from '../script/constant'

const ContentContainer = ({contentComponent, title}) => {

  return (
    <Card variant="outlined" sx={{
      backgroundColor: PARAGRAPH_BKGRD_COLOR,
      borderRadius: '10px',
      padding: '10px',
    }}>

      <CardHeader
        title={
            <Typography sx={{
            color: INFO_COLOR,
            fontSize: "2rem"
            }}>
            {title}</Typography>
        }
      />

      <CardContent>

        {contentComponent}

      </CardContent>
    </Card>
  )
}

export default memo(ContentContainer);