import { memo, useState } from 'react'

import { Card, CardContent, CardHeader,
  ToggleButton,
  ToggleButtonGroup,
  Typography} from '@mui/material';

import {INFO_COLOR, PARAGRAPH_BKGRD_COLOR} from '../script/constant'

import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { blue, grey } from '@mui/material/colors';

const showMoreKey = {
  NA : "N/A",
  EXPAND_ALL : "expandAll",
  COLLAPSE_ALL : "collapseAll"
}


const ContentContainer = ({contentComponent, title, showMoreObjRef={}}) => {

  const [showMoreOption, setShowMoreOption] = useState(showMoreKey.NA);

  const handleShowMoreSelection = (e, newSelection)=>{

    const currentSelection = newSelection ? newSelection : showMoreOption;

    handleShowMore(currentSelection);
    setShowMoreOption(currentSelection);
  }

  const handleShowMore = (showMoreOption)=>{

    // if object valid
    if (Object.keys(showMoreObjRef).length &&
        showMoreOption)
    {
      // obj = {showMore, setShowMore}
      Object.values(showMoreObjRef.current).forEach((obj)=>{
          obj.setShowMore(showMoreOption === showMoreKey.EXPAND_ALL);
      })
    }
  };

  const ActionComponent = ()=>{

    return(
      <>
        {
          Object.keys(showMoreObjRef).length ?

            <ToggleButtonGroup
                value={showMoreOption}
                exclusive
                onChange={handleShowMoreSelection}
                aria-label="show more option"
                sx={{
                  backgroundColor: grey[700],
                  marginRight: '1rem',
                  '& .MuiButtonBase-root':{
                    '&:hover':{
                      backgroundColor: blue[700]
                    }
                  }
                }}
              >
                <ToggleButton value={showMoreKey.EXPAND_ALL} aria-label="expand">
                  <UnfoldMoreIcon />
                </ToggleButton>
                <ToggleButton value={showMoreKey.COLLAPSE_ALL} aria-label="collapse">
                  <UnfoldLessIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            : null
        }
      </>
      );
  };

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
        action={
          <ActionComponent />
        }
      />

      <CardContent>

        {contentComponent}

      </CardContent>
    </Card>
  )
}

export default memo(ContentContainer);