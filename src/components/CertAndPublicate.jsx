import {memo, useEffect, useState} from 'react'
import Loading from './Loading';

import { Box,
         Card, CardHeader, CardMedia, Grid, Stack, 
         Tab, 
         Tabs,
         Tooltip} from '@mui/material'

import yaml from 'js-yaml'
import certAndPublicateYamlFile from '../data/CertAndPublicate.yaml?raw'

import ContentContainer from './ContentContainer';

import imgLibrary from '../utility/ImgLibrary'
import { blue, grey, purple } from '@mui/material/colors';

const allCategoryKey = "All";

const CertAndPublicate = () => {
  
    const [section, setSection] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [category, setCategory] = useState(allCategoryKey);


    useEffect(()=>{
        const data = yaml.load(certAndPublicateYamlFile);

        if ('category' in data){
            data.category = [{cat: allCategoryKey}, ...data.category];
        };
        setSection(data);

        //console.log(data);

        setIsLoading(false);

    }, []);

    const handleTabChange = (e, selectCAT)=>{
        setCategory(selectCAT)
    }

    const handleGotoFile = ({linkObj})=>{

        let link = ""

        if ('id' in linkObj)
        {
            link = `https://drive.google.com/file/d/${import.meta.env[linkObj.id]}/preview`
        }
        else if ('href' in linkObj)
        {
            link = linkObj.href
        }

        if (link)
        {
            window.open(link, '_blank');
        }
    }

    const GridCards = memo(({id, sectionObj})=>{

        return (
            <Grid container 
                spacing={{xs: 2, md: 3}}
                columns={{xs: 4, sm: 8, md: 12}}
                sx={{
                    marginTop: '2rem'
                }}>
                
                {
                    sectionObj.certNpub.map((obj, index)=>{

                        
                        return ((obj.cnp.category === category || 
                                 category === allCategoryKey) ?
    
                            <Grid key={`${id}-gridcard-${index}`}
                                size={{ xs:2, sm: 4, md: 3}}>
    
                                <CardComponent id={id} compObj={obj.cnp} index={index}/>
    
                            </Grid> : null);
                            
                    })
                }
                            
            </Grid>
        );
    });

    const Content = ({id, sectionObj})=>{

        return (
    
           <>
            <Box sx={{width : '100%'}}>
                <Tabs
                    value={category}
                    onChange={handleTabChange}
                    //textColor= 'secondary'
                    // indicatorColor = 'secondary'
                    aria-label = "category tabs"
                    sx={{
                        "& .MuiTabs-indicator":{
                            backgroundColor: purple[300]
                        },
                    }}
                >
                    {
                        sectionObj.category.map((itemObj, index)=>(
                            <Tab key={`tab-${index}`} value={itemObj.cat} label={itemObj.cat} 
                            sx={{
                                fontSize: '1.1rem',
                                color: grey[500],
                                "&.Mui-selected":{
                                    color: purple[200]
                                },
                                "&:hover":{
                                    color: grey[200]
                                },
                                marginLeft: '0px',
                                marginRight: '1.2rem'
                            }}/>
                        ))
                    }

                </Tabs>

                <GridCards id={id} sectionObj={sectionObj} />

            </Box>
           </>
        );
    }

    

    const CardComponent = memo(({id, compObj, index})=>{

        const width = 400;

        return (
            <Tooltip title="click to document URL / reference">
                <Card key={`${id}-cert-${index}`}
                    sx={{
                        maxWidth: `${width}px`,
                        backgroundColor: blue[100],
                        transition: 'transform 0.3s ease-in-out',
                        "&:hover":{
                            transform: 'scale(1.05)',
                            cursor: 'pointer'
                        },

                    }}
                    onClick={()=>handleGotoFile({linkObj : compObj.link})}
                >
                    <CardHeader
                        title={compObj.name}
                        subheader={`${compObj.date}\n${compObj.by}`}
                        sx={{
                            '& .MuiCardHeader-subheader':{
                                whiteSpace: 'pre-line',
                                marginTop: '0.5rem'
                            }
                        }}
                    />
                    <CardMedia
                        component= "img"
                        image= {imgLibrary[compObj.link.img]}
                        alt="N/A"
                        onContextMenu={(e)=>e.preventDefault()} // disable right click control
                        sx={{
                            width:'100%',
                            height: 'auto',
                            objectFit: 'cover'
                        }}
                    />

                </Card>
            </Tooltip>
        );
    });
  
    return (
        <>
            {
                isLoading ?
                <Loading /> :

                <ContentContainer contentComponent={<Content id={'cnp'} sectionObj={section} />} title={section.title} />
            }
        </>
    );
}

export default CertAndPublicate