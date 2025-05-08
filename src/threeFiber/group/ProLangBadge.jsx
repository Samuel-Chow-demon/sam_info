import {useEffect, useState, useRef} from 'react'

import Badge from '../components/Badge';

import iconTexture from '../iconTexture'

const ProLangBadge = ({proLangList,
                      position=[0, 0, 0],
                      rotation=[0, 0, 0],
                      scale = 1,
                      radiusBottom = 11,
                      offset = 5,
                      textureRepeat = 1.1,
                      textureOffset = -0.05,
                      color = 0x573254}) => {

    const groupRef = useRef();

    useEffect(()=>{
        
    }, [])

    const AllLangComponents = ()=>{

        let componentList = [];

        proLangList.forEach((lang, index)=>{

            const texturePath = iconTexture[lang.text];
            if (texturePath)
            {
                componentList.push(
    
                    <Badge
                        key={index}
                        id={lang.text} 
                        radiusTop={radiusBottom * 0.9}
                        radiusBottom={radiusBottom}
                        height={5}
                        position={[index * (radiusBottom + offset), 0, 0]}
                        rotation={[Math.PI / 2, Math.PI / 2, 0]}
                        color={color}
                        texturePath={texturePath}
                        textureRepeat={textureRepeat}
                        textureOffset={textureOffset}
                        scale={0.5}
                        onGUI={false}
                    />
                );
            }
        });

        return componentList;
    }

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={rotation}
            scale={scale}
        >
            
            <AllLangComponents />
        </group>
    )
}

export default ProLangBadge