import {memo, useEffect, useRef, useState} from 'react'
import Loading from './Loading';

import { Box, Stepper, Step, StepContent, StepLabel, Button, Zoom } from '@mui/material'

import {PARAGRAPH_COLOR} from '../script/constant'

import yaml from 'js-yaml'
import educationYamlFile from '../data/Education.yaml?raw'
import useYamlCfgStyle from '../hook/useYamlCfgStyle';

import ContentContainer from './ContentContainer';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

import IconComponent from './IconComponent'
import ScrollButtonComponent from './ScrollButtonComponent';

const Education = () => {
  
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
        const data = yaml.load(educationYamlFile);
        setSection(data);
        setIsLoading(false);

    }, []);

    const storeStepLabelDOM = (index)=>(dom)=>{
        stepLabelDOM.current[index] = dom;
    }

    const Content = ()=>{

        return (
    
            <Stepper nonLinear 
            //activeStep={activeIdx} 
            orientation="vertical">

                {
                    section.education.map((item, index)=>{
     
                        return(
                            <EducationStepComponent key={`${item.school.name}-${index}`} id={'edu'} schoolObj={item.school} index={index} active={true}/>
                        );
                    })
                }        

            </Stepper>
        );
    }

    const MemoizedContentComponent = memo(ContentComponent);

    const EducationStepComponent = memo(({id, schoolObj, index, active})=>{

        const [showMore, setShowMore] = useState(false);

        useEffect(()=>{

            contentShowMoreObjRef.current[index] = {
                    showMore, setShowMore
                }
        }, []);

        const IconWrapper = ()=>(
            <IconComponent iconTag={schoolObj.icon}/>
        )

        return (
            <Step key = {schoolObj.name}
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
                        {schoolObj.name}
                </StepLabel>
                
                <StepContent
                >
                    <Box 
                        sx={{
                        width : '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: '5px'
                    }}>
                        {/* <button onClick={clickPrintPos}>Print</button> */}

                        <TextComponent id={id} paragObj={schoolObj} refKey={'program'} index={index}/>
                        <TextComponent id={id} paragObj={schoolObj} refKey={'grade'} index={index}/>
                        <TextComponent id={id} paragObj={schoolObj} refKey={'period'} index={index}/>

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
                                <MemoizedContentComponent id={id} key={`${id}-ContentCom-${index}`} paragObj={schoolObj} index={index}/>
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
                                      showMoreObjRef={contentShowMoreObjRef} />
                </>
            }
        </>
    );
}

export default memo(Education);