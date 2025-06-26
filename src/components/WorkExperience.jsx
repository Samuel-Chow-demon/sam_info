import {memo, useEffect, useRef, useState} from 'react'
import Loading from './Loading';

import { Box, Stepper, Step, StepContent, StepLabel,
         Button, Zoom, Stack } from '@mui/material'

import {PARAGRAPH_COLOR} from '../script/constant'

import workExpYamlFile from '../data/WorkExp.yaml?raw'
import useYamlCfgStyle from '../hook/useYamlCfgStyle';

import ContentContainer from './ContentContainer';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

import IconComponent from './IconComponent'
import ScrollButtonComponent from './ScrollButtonComponent';
import { getYamlData } from '../utility/yamlDataCenter';

const WorkExperience = () => {
  
    const [section, setSection] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const contentShowMoreObjRef = useRef({});
    const stepLabelDOM = useRef({});
    
    const {
        TextComponent,
        // ListComponent,
        ContentComponent
    } = useYamlCfgStyle();

    useEffect(()=>{
        const data = getYamlData(workExpYamlFile); 
        setSection(data);
        setIsLoading(false);

    }, []);

    const storeStepLabelDOM = (index)=>(dom)=>{
        stepLabelDOM.current[index] = dom;
    }

    const Content = memo(()=>{

        return (
    
            <Stepper nonLinear 
            // activeStep={activeIdx} 
            orientation="vertical">

                {
                    section.workexp.map((item, index)=>{

                        return(
                            <WorkExpStepComponent key={`${item.company.name}-${index}`} id={'company'} compObj={item.company} index={index} active={true}/>
                        );
                    })
                }        

            </Stepper>
        );
    });

    const MemoizedContentComponent = memo(ContentComponent);

    const WorkExpStepComponent = memo(({id, compObj, index, active})=>{

        const [showMore, setShowMore] = useState(false);

        const IconWrapper = ()=>(
            <IconComponent iconTag={compObj.icon}/>
        )

         useEffect(()=>{
        
            contentShowMoreObjRef.current[index] = {
                    showMore, setShowMore
                }
        }, []);

        return (
            <Step key = {compObj.name}
                    active = {active ? "true" : "false"}
                    completed={"false"}
                    error={"false"}
            >
                <StepLabel 
                    ref={storeStepLabelDOM(index)}
                    slots={{
                        stepIcon: IconWrapper
                    }}
                    sx={{
                        "& .MuiStepLabel-label":{
                            fontSize: "24px",
                            color: '#c4ad7a',
                            marginLeft: '1rem'
                        },
                        "&. MuiSvgIcon-root":{
                            fontSize: "24px",
                            color: PARAGRAPH_COLOR,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }}>
                        {compObj.name}
                </StepLabel>
                
                <StepContent>
                    <Box sx={{
                        width : '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: '5px'
                    }}>
                        <Stack 
                            direction="row"
                            spacing={2}
                            sx={{
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <TextComponent id={id} paragObj={compObj} refKey={'title'} index={index}/>
                            <TextComponent id={id} paragObj={compObj} refKey={'period'} index={index}/>

                        </Stack>

                        <TextComponent id={id} paragObj={compObj} refKey={'mode'} index={index}/>
                        <TextComponent id={id} paragObj={compObj} refKey={'location'} index={index}/>

                        <Button sx={{
                                '&:hover':{
                                    color: '#b867b0'
                                },
                                marginLeft: '4rem',
                                fontSize: '1rem'
                            }}
                            endIcon={showMore ? <ExpandLessOutlinedIcon/>: <ExpandCircleDownOutlinedIcon/>}
                            onClick={()=>setShowMore(prev=>!prev)} 
                        >
                            {showMore ? "hide" : "show more"}
                        </Button>

                        <Zoom
                            in={showMore} 
                            mountOnEnter
                            unmountOnExit
                            timeout={{enter: 300, exit: 300}}                
                        >
                            <div>
                                <MemoizedContentComponent id={id} key={`${id}-ContentCom-${index}`} paragObj={compObj} index={index}/>
                            </div>
                        </Zoom>

                    </Box>

                </StepContent>
                
            </Step>
        )

    });
  
    return (
        <>
            {
                isLoading ?
                <Loading /> :

                <>
                    <ScrollButtonComponent stepLabelDomRef={stepLabelDOM}/>
                    <ContentContainer contentComponent={<Content />} title={section.title} 
                                    showMoreObjRef={contentShowMoreObjRef}/>
                </>
            }
        </>
    );
}

export default memo(WorkExperience);