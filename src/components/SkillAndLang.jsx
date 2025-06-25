import {useState, useEffect, memo} from 'react'
import Loading from './Loading';

import yaml from 'js-yaml'
import skillYamlFile from '../data/SkillsAndLang.yaml?raw'
import useYamlCfgStyle from '../hook/useYamlCfgStyle';

import ContentContainer from './ContentContainer';

const SkillAndLang = () => {

    const [section, setSection] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);

    const {
        //TextComponent,
        // ListComponent,
        ContentComponent
    } = useYamlCfgStyle();
    
    useEffect(()=>{
        const data = yaml.load(skillYamlFile);
        
        setSection(data);
        setIsLoading(false);

    }, []);

    const Content = ()=>{
    
        return(
            <ContentComponent id={'Skill'} key={`ContentCom`} paragObj={section} index={0}/>
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
    );
}

export default memo(SkillAndLang);