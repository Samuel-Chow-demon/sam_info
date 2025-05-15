
import {useEffect, useState} from 'react'
import {INFO_COLOR, PARAGRAPH_BKGRD_COLOR, PARAGRAPH_STYLE} from '../script/constant'

import aboutYamlFile from '../data/About.yaml?raw'
import yaml from 'js-yaml'
import Loading from './Loading';

import DisplayAllBadge from '../threeFiber/group/DisplayAllBadge';
import useYamlCfgStyle from '../hook/useYamlCfgStyle';

import ContentContainer from './ContentContainer';

const About = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [section, setSection] = useState([]);

    const {
        TextComponent,
        ListComponent,
        ContentComponent
    } = useYamlCfgStyle();

    useEffect(()=>{
        const data = yaml.load(aboutYamlFile);

        setSection(data);
        setIsLoading(false);

    }, []);

    const Content = ()=>{

        return(

            <>
                {
                    section.paragraph.map((paragObj, index)=>{

                        const allComponents = [];

                        allComponents.push(<TextComponent id={'About'} key={`SubHeaderCom-${index}`} paragObj={paragObj} refKey={'subheader'} index={index} defaultStyle={PARAGRAPH_STYLE}/>);

                        allComponents.push(<ContentComponent id={'About'} key={`ContentCom-${index}`} paragObj={paragObj} index={index}/>);
                        
                        allComponents.push(<ListComponent id={'About'} key={`ListCom-${index}`} paragObj={paragObj} index={index}/>);

                        return allComponents;
                    })
                }
                <DisplayAllBadge />
            </>
        );
    }

    return (
        <>
            {
                isLoading ?
                <Loading /> :
                
                <ContentContainer contentComponent={<Content />} title={section.title} />
            }
        </>
    )
}

export default About