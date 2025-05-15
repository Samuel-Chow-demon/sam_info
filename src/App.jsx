import { useState } from 'react'
import { InfoBar } from './components/InfoBar'
import { Box, Grid, Paper } from '@mui/material'
import { Dashboard } from './components/Dashboard'
import {GRID_PADDING_VALUE_PX} from './script/constant.js'
import bgImage from './assets/bg-3.jpg'

function App() {
  
  return (
    <>
      <Box 
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <Grid container spacing={{sm:3, md:3, lg:6}} sx={{
          padding: `${GRID_PADDING_VALUE_PX}px`
        }}>
          <Grid size={{xs:12, md:3, lg:3}}>
            <InfoBar />
          </Grid>
          <Grid size={{xs:12, md:9, lg:9}}>
            <Dashboard/>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default App
