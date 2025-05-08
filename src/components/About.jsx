import { autocompleteClasses, Box, Card, CardContent, CardHeader,
        List, ListItem, ListItemIcon,
        Typography} from '@mui/material';
import {useEffect, useState} from 'react'
import {INFO_COLOR, PARAGRAPH_COLOR, PARAGRAPH_BKGRD_COLOR,
        PARAGRAPH_STYLE} from '../script/constant'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { conditionalStyle } from '../utility/style';

import aboutYamlFile from '../data/About.yaml?raw'
import yaml from 'js-yaml'
import Loading from './Loading';

import DisplayAllBadge from '../threeFiber/group/DisplayAllBadge';


const About = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [section, setSection] = useState([]);

    useEffect(()=>{
        const data = yaml.load(aboutYamlFile);
        setSection(data);
        setIsLoading(false);
    }, [])

    return (
        <>
            {
                isLoading ?
                <Loading /> :
                
                <Card variant="outlined" sx={{
                    backgroundColor: PARAGRAPH_BKGRD_COLOR,
                    borderRadius: '10px',
                    padding: '10px',
                }}>

                    <CardHeader
                    title={
                        <Typography variant="h4" sx={{
                        color: INFO_COLOR
                        }}>
                        {section.title}</Typography>
                    }
                    />

                    <CardContent>
                    <>
                    {
                        section.paragraph.map((paragObj, index)=>{

                        const allComponents = [];

                            // Means is a subheader
                            if ('subheader' in paragObj)
                            {
                                const sizeStyle = conditionalStyle(paragObj.subheader.size,
                                                    {fontSize: paragObj.subheader.size}, {fontSize: "20px"});

                                const colorStyle = conditionalStyle(paragObj.subheader.color,
                                                    {color: paragObj.subheader.color});

                                const alignStyle = conditionalStyle(paragObj.subheader.align,
                                                        {textAlign: paragObj.subheader.align});

                                allComponents.push(
                                    <Typography key={`subheader-${index}`}
                                    sx={{...PARAGRAPH_STYLE,
                                            textIndent: 0,
                                            ...sizeStyle,
                                            ...colorStyle,
                                            ...alignStyle
                                        }}>
                                        {paragObj.subheader.text}
                                    </Typography>);
                            }  
                            
                            // check if is a paragraph
                            if ('content' in paragObj)
                            {
                                const style = paragObj.content.style || {};

                                const sizeStyle = conditionalStyle(style.size,
                                                    {fontSize: style.size}, {fontSize: "20px"});

                                const colorStyle = conditionalStyle(style.color,
                                                    {color: style.color});

                                const alignStyle = conditionalStyle(style.align,
                                                        {textAlign: style.align},
                                                        {textAlign: 'justify'});

                                const marginStyle = conditionalStyle(style.margin,
                                                            style.margin);  // margin is a group of object

                                allComponents.push(

                                    <Typography key={`content-${index}`}
                                        sx={{
                                            ...PARAGRAPH_STYLE,
                                            ...sizeStyle,
                                            ...colorStyle,
                                            ...alignStyle,
                                            ...marginStyle
                                        }}>
                                    {
                                        paragObj.content.valueGp.map((contentObj, idx)=>{         

                                            const valueObj = contentObj['value'];

                                            const innerSizeStyle = conditionalStyle(valueObj.size,
                                                                    {fontSize: valueObj.size}, {fontSize: "20px"});

                                            const innerColorStyle = conditionalStyle(valueObj.color,
                                                                    {color: valueObj.color});

                                            const innerAlignStyle = conditionalStyle(valueObj.align,
                                                                    {textAlign: valueObj.align});

                                           
                                            return (
                                                <span key={`parag-${index}-${idx}`} 
                                                    style={{
                                                        ...innerSizeStyle,
                                                        ...innerColorStyle,
                                                        ...innerAlignStyle
                                                        }}>
                                                    
                                                    {valueObj.text}
                                                </span>);
                                        })
                                    }
                                    </Typography>);
                            }
                            // Means this sub section is a list
                            else if ('list' in paragObj)
                            {
                                allComponents.push(
                                    <Box key={`list-${index}`} sx={{color: PARAGRAPH_COLOR, mb: '3em'}}>

                                        <List dense>
                                            {
                                                paragObj.list.map((item, idx)=>(
                                                    <ListItem key={idx}>
                                                    <ListItemIcon>
                                                        <FiberManualRecordIcon sx={{fontSize : '1rem', color: PARAGRAPH_COLOR}}/>
                                                    </ListItemIcon>

                                                    <Typography variant="h6" sx={{color: PARAGRAPH_COLOR}}>
                                                        {item.point}
                                                    </Typography>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Box>);
                            }
                            
                            //console.log(allComponents);
                            return allComponents;
                        })
                    }
                    </>

                    <DisplayAllBadge />
                            
                    </CardContent>

                </Card>
            }
        </>
    )
}

export default About