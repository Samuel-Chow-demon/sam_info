import { Box, Stepper, Step, StepButton, alpha } from '@mui/material'
import { grey } from '@mui/material/colors'
import {GRID_PADDING_VALUE_PX,
        INFO_COLOR, PARAGRAPH_BKGRD_COLOR,
        } from '../script/constant'
import {useEffect, useState} from 'react'

import categoryYamlFile from '../data/Category.yaml?raw'
import yaml from 'js-yaml'

import About from './About'
import Loading from './Loading'
import Education from './Education'

export const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [activeCat, setActiveCat] = useState(0);
  const [allCategory, setAllCategory] = useState([]);

  useEffect(()=>{
    const categories = yaml.load(categoryYamlFile);
    setAllCategory(categories);
    setIsLoading(false);
  }, [])

  const handleClickCat = (index) => () => {
    setActiveCat(index);
  };

  const CategoryContent = ()=>{

    switch (activeCat)
    {
      case 0:
        return <About />;
       
      case 1:
        return <Education />
      default:
        return <></>;
    }
  }

  useEffect(()=>{

  }, [])

  return (
    <>
      {
        isLoading ?
        <Loading />:

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            minHeight: `max(100%, calc(100vh - ${GRID_PADDING_VALUE_PX * 2}px))`,
            boxSizing: 'border-box',
            margin: 0,
            padding: 5,
            borderRadius: 4,
            border: 1,
            borderColor: grey[800],
            backgroundColor: alpha(grey[900], 0.9),
            gap: '50px'
          }}>

          <Stepper nonLinear alternativeLabel  activeStep={activeCat} sx={{
            width: '100%',
            '& .MuiStepConnector-line': {
              borderColor: grey[500],       // default line color
              borderTopWidth: 2,            // thickness of the line
              borderBottomWidth: 2,            // thickness of the line
              borderRadius: 4,
              height: 8,
            },
            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line':{
                backgroundImage: 'linear-gradient(to right, blue, purple)'
            },
            '& .MuiStepLabel-label': {
                color: alpha(grey[600], 0.7),
                fontSize: '18px',
                '&.Mui-active': {
                  color: INFO_COLOR,
                }
              },
            '& .MuiStepIcon-text':{
                display: 'none'
              },
            '& .MuiSvgIcon-root':{
                fontSize: '2rem'
              }
          }}>
            {
              allCategory.category.map((obj, index) => (
                <Step key={obj.title}>
                  <StepButton color="inherit" onClick={handleClickCat(index)}>
                    {obj.title}
                  </StepButton>
                </Step>
              ))
            }
          </Stepper>
              
          <Box sx={{
            minWidth : 850,
          }}>

            <CategoryContent />
      
          </Box>
        </Box>
      }
    </>
  )
}