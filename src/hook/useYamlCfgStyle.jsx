
import { conditionalStyle } from '../utility/style';
import {PARAGRAPH_STYLE,
        LIST_STYLE, LIST_ICON_STYLE, LIST_POINT_STYLE} from '../script/constant'
import { Box, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { memo } from 'react';

import IconComponent from '../components/IconComponent'
import {defaultTextControl, 
        ProgressBarWithLabel} from '../components/ProgressBarWithLabel';
import { grey } from '@mui/material/colors';

const useYamlCfgStyle = () => {

    // 1 - SubHeader Component
    const TextComponent = memo(({id, paragObj, refKey, index, defaultStyle = {}})=>{

        // Means there has a subheader
        if (refKey in paragObj)
        {
            const style = conditionalStyle(paragObj[refKey].style,
                                            paragObj[refKey].style); // .style already is a object of all styles

            return(
                <Typography key={`${id}-${refKey}-${index}`}
                    sx={{...defaultStyle,       // apply default style
                            ...style,           // then apply overwrite style
                        }}>

                    {paragObj[refKey].text}
                </Typography>);
        } 
        return <></>; 
    });

    // 2 - List Component
    const ListComponent = memo(({id, paragObj, index})=>{

        // Means this sub section is a list
        if ('list' in paragObj)
        {
            let listComponetList = [];

            const styleObj = paragObj.style || {};

            const style = conditionalStyle(styleObj, styleObj);

            const iconSize = conditionalStyle(styleObj.iconSize,
                                                {fontSize: styleObj.iconSize});

            const listObj = paragObj.list;

            const HeaderComponent = <TextComponent id={id} paragObj={listObj} refKey={'subheader'} index={index} defaultStyle={PARAGRAPH_STYLE}/>;

            listComponetList.push(

                <Box key={`${id}-list-${index}`} sx={{
                    ...LIST_STYLE,
                    ...style,
                    }}>

                    {HeaderComponent}

                    <List sx={{
                        width: "100%"
                    }} dense>
                        {
                            listObj.points.map((item, idx)=>{

                                let innerStyle = conditionalStyle(item.style, item.style);

                                const hrefLink = conditionalStyle(innerStyle.href, innerStyle.href, "");

                                const iconStyle = conditionalStyle(innerStyle.icon, innerStyle.icon);

                                const pointStyle = conditionalStyle(innerStyle.point, innerStyle.point);

                                let linkProps = {} // default not a link
                                if (hrefLink != "")
                                {
                                    linkProps = {component: 'a', href:hrefLink, target: "_blank"}
                                    innerStyle = {
                                        ...innerStyle,
                                        '&:hover' : {
                                            textDecoration: "underline",
                                            color : "#b867b0"
                                        },
                                        cursor: "pointer"
                                    }
                                }

                                return(    
                                    <ListItem key={`${id}-list-${index}-${idx}`}>
                                        <ListItemIcon
                                            sx={{
                                                alignSelf: 'flex-start',
                                                marginTop: '0.4rem'
                                            }}
                                        
                                        >

                                            {
                                                ('icon' in item) ?
                                                <IconComponent iconTag={item.icon} style={iconStyle}/>
                                                :
                                                <FiberManualRecordIcon sx={{
                                                    ...LIST_ICON_STYLE,
                                                    ...iconSize,
                                                    }}/>
                                            }
                                        </ListItemIcon>

                                        <Box sx={{width: '100%', height: '100%', ...pointStyle}}>
                                            {
                                                (item.point) ?
                                                <Typography
                                                    {...linkProps}
                                                    sx={{
                                                    ...LIST_POINT_STYLE,
                                                    ...innerStyle,
                                                    }}>
                                                    {item.point}
                                                </Typography> : null
                                            }

                                            {
                                                ('content' in item) ?
                                                <ContentComponent id={id} paragObj={item} index={index} /> : null
                                            }

                                            {
                                                ('bar' in item) ?
                                                <ProgressBarWithLabel 
                                                    value={item.bar.value} 
                                                    full={item.bar.full}
                                                    textControl={{
                                                        ...defaultTextControl,
                                                        isPercentageStyle: false
                                                    }}
                                                    componentStyle={{
                                                        width: '100%'
                                                    }}
                                                    textStyle={{
                                                        fontSize: '1.2rem',
                                                        color: grey
                                                    }}
                                                    
                                                    />
                                                : null
                                            }
                                        </Box>
                                        
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </Box>);

            return listComponetList;
        }
        return <></>;
    });


    // 3 - Content Component
    const ContentComponent = memo(({id, paragObj, index})=>{

        // Means there has a content
        if ('content' in paragObj)
        {
            let contentComponetList = [];

            const style = conditionalStyle(paragObj.content.style,
                                            paragObj.content.style);

            if ('valueGp' in paragObj.content)
            {
                contentComponetList.push(
    
                    <Typography key={`${id}-content-valueGp-${index}`}
                        sx={{
                            ...PARAGRAPH_STYLE,
                            ...style,
                        }}>
                    {
                        paragObj.content.valueGp.map((contentObj, idx)=>{         
    
                            const valueObj = contentObj['value'];
    
                            const innerStyle = conditionalStyle(valueObj.style,
                                                                valueObj.style);

                            return (
                                <span key={`${id}-parag-${index}-${idx}`} 
                                    style={{
                                        ...innerStyle,
                                        }}>
                                    
                                    {valueObj.text}
                                </span>);
                        })
                    }
                    </Typography>
                );
            }
            else if ('listGp' in paragObj.content)
            {
                const listGp = paragObj.content.listGp;

                listGp.forEach((listItem, idx)=>{

                    contentComponetList.push(
                        <ListComponent id={id} key={`${id}-ListCom-${index}-${idx}`} paragObj={listItem.value} index={idx}/>
                    );
                });
            }

            return contentComponetList.length ? contentComponetList : <></>;
        }
        return <></>;
    });

    return {
        TextComponent,
        ListComponent,
        ContentComponent

    };
}

export default useYamlCfgStyle