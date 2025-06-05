import {useState, useEffect, memo, useRef} from 'react'

import yaml from 'js-yaml'
import portfolioYamlFile from '../data/Portfolio.yaml?raw'

import ContentContainer from './ContentContainer';

import { blue, grey, purple } from '@mui/material/colors';
import { Box, Card, CardHeader, CardMedia, Grid, Icon, Stack, Tab, Tabs, Tooltip } from '@mui/material';
import { conditionalStyle } from '../utility/style';
import IconComponent from './IconComponent';
import Loading from './Loading';

import PortfolioContent from './PortfolioContent';

const allCategoryKey = "All";

const Portfolio = () => {
    
    const [section, setSection] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [category, setCategory] = useState(allCategoryKey);

    const [selectedProj, setSelectedProj] = useState(null);
    
    useEffect(()=>{
        const data = yaml.load(portfolioYamlFile);

        if ('category' in data){
            data.category = [{cat: allCategoryKey}, ...data.category];
        };
        setSection(data);

        console.log(data);

        setIsLoading(false);

    }, []);

    const handleTabChange = (e, selectCAT)=>{
        setCategory(selectCAT);
    }

    const handleGotoPortfolio = (projectName)=>{
        setSelectedProj(projectName)
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
                    sectionObj.projNapp.map((obj, index)=>{

                        
                        return ((obj.pna.category === category || 
                                 category === allCategoryKey) ?
    
                            <Grid key={`${id}-gridcard-${index}`}
                                size={{ xs:2, sm: 4, md: 4}}>
    
                                <CardComponent id={id} compObj={obj.pna} index={index}/>
    
                            </Grid> : null);
                            
                    })
                }
                            
            </Grid>
        );
    });

    const CardComponent = memo(({id, compObj, index})=>{

        const width = 400;

        const imgObj = "img" in compObj ? compObj.img : null;
        const langObj = "lang" in compObj ? compObj.lang : null;
        const lang2Obj = "lang2" in compObj ? compObj.lang2 : null;
        const ideObj = "ide" in compObj ? compObj.ide : null;
        const libObj = "lib" in compObj ? compObj.lib : null;
        const lib2Obj = "lib" in compObj ? compObj.lib2 : null;

        const displayIcon = (langObj || lang2Obj || 
                            ideObj || 
                            libObj || lib2Obj);

        const cardMediaStyle = conditionalStyle(imgObj.style, imgObj.style);
        const cardIconStyle = conditionalStyle(compObj?.icon?.style, compObj?.icon?.style);

        const [iconPos, setIconPos] = useState({
            top: 0,
            right: 0
        });

        const iconStyle = {
            width: '3rem',
            height: '3rem',
            border: '1px solid #b6c6e0',
            borderRadius: '50%'
        };

        const cardMediaRef = useRef();
        const iconStackRef = useRef();
        const iconStackScale = useRef();

        useEffect(()=>{
            if (cardMediaRef.current &&
                iconStackRef.current)
            {
                iconStackScale.current = (cardMediaRef.current.offsetWidth / iconStackRef.current.offsetHeight) * 0.16;

                const top = cardMediaRef.current.offsetTop - 
                                iconStackRef.current.offsetHeight / 2;
                const right = (iconStackScale.current) * 9;

                setIconPos({
                    top,
                    right 
                });
            }
        }, [cardMediaRef.current, iconStackRef.current]);

        return (
            <Tooltip title="open portfolio description">
                <Card key={`${id}-cert-${index}`}
                    sx={{
                        position: 'relative',
                        maxWidth: `${width}px`,
                        height: `auto`,
                        backgroundColor: purple[100],
                        borderRadius: '2rem',
                        transition: 'transform 0.3s ease-in-out',
                        "&:hover":{
                            transform: 'scale(1.05)',
                            cursor: 'pointer'
                        },

                    }}
                    onClick={()=>handleGotoPortfolio(compObj.name)}
                >
                    <CardHeader
                        title={compObj.name}
                        // subheader={`${compObj.date}\n${compObj.by}`}
                        sx={{
                            '& .MuiCardHeader-subheader':{
                                whiteSpace: 'pre-line',
                                marginTop: '0.5rem',
                            },
                            marginBottom: '0.5rem'
                        }}
                    />
                    <CardMedia
                        ref={cardMediaRef}
                        component= "img"
                        image= {imgObj.src}
                        alt="N/A"
                        onContextMenu={(e)=>e.preventDefault()} // disable right click control
                        sx={{
                            width:'100%',
                            height: 'auto',
                            objectFit: 'cover',
                            ...cardMediaStyle,
                        }}
                    />

                    {
                        displayIcon ?
                        <Stack
                            ref={iconStackRef} 
                            direction={'row'}
                            padding={0}
                            margin={0} 
                            spacing={2} 
                            sx={{
                            position: 'absolute',
                            top: iconPos.top,
                            right: iconPos.right,
                            scale: iconStackScale.current,
                            ...cardIconStyle
                        }}>
                            
                            {
                                (langObj) ?
                                <IconComponent iconTag={langObj.icon} style={iconStyle}/> : null
                            }

                            {
                                (lang2Obj) ?
                                <IconComponent iconTag={lang2Obj.icon} style={iconStyle}/> : null
                            }

                            {
                                (libObj) ?
                                <IconComponent iconTag={libObj.icon} style={iconStyle}/> : null
                            }

                            {
                                (lib2Obj) ?
                                <IconComponent iconTag={lib2Obj.icon} style={iconStyle}/> : null
                            }

                            {
                                (ideObj) ?
                                <IconComponent iconTag={ideObj.icon} style={iconStyle}/> : null
                            }

                        </Stack> : null
                    }

                </Card>
            </Tooltip>
        );
    });

    const Content = ({id, sectionObj})=>{

        const TabsComponent = ({objList})=>{

            return (
                <Tabs
                    value={category}
                    onChange={handleTabChange}
                    aria-label = "category tabs"
                    sx={{
                        "& .MuiTabs-indicator":{
                            backgroundColor: purple[300],
                            display: 'none'
                        },
                        marginBottom: '1rem',
                        "& .MuiTabs-flexContainer": {
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }
                    }}
                >
                    {
                        objList.map((itemObj, index)=>(
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
                                marginRight: '1rem'
                            }}/>
                        ))
                    }

                </Tabs>
            );
        }

        return (
    
            <Box
                sx={{width : '100%'}}>
                
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TabsComponent objList={sectionObj.category}/>
                </div>
                <GridCards id={id} sectionObj={sectionObj} />

            </Box>
        );
    }
    
    return (
        <>
            {
                isLoading ?
                <Loading /> :

                (
                    selectedProj ?
                    <PortfolioContent id={selectedProj} 
                                      compObj={section.page[selectedProj]} 
                                      setSelectedProj={setSelectedProj}
                                      index={0} />
                    :
                    <ContentContainer 
                    contentComponent={<Content id={'pna'} 
                    sectionObj={section} />} 
                    title={section.title} 
                    />
                )
            }
        </>
    );
}

export default Portfolio;