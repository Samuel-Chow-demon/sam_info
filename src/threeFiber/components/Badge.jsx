import {useEffect, useRef, useState} from 'react'

import {useLoader, useFrame} from '@react-three/fiber'
import {Color, CylinderGeometry, DoubleSide, FrontSide, TextureLoader,
        ClampToEdgeWrapping, LinearFilter
} from 'three'

//import useGuiControl from '../UI/useGuiControl'

const Badge = ({id,
                radiusTop, radiusBottom,
                height,
                radialSeg = 16, heightSeg = 1,
                openEnded = false,
                thetaLength = Math.PI * 2,
                position=[0, 0, 0],
                rotation = [1, 0, 0],
                color = 0x78705b,
                texturePath = "",
                scale = 1,
                dimmer = 1,
                textureRepeat = 1.1,
                textureOffset = -0.05,
                onGUI = true}) => 
{
    const [params, setParams] = useState({radiusTop, radiusBottom, height,
        radialSeg, heightSeg, openEnded, thetaLength});

    const [geometry, setGeometry] = useState(new CylinderGeometry(radiusTop, radiusBottom, height,
                                                radialSeg, heightSeg, openEnded, 0, thetaLength));

    const texture = texturePath ? useLoader(TextureLoader, texturePath) : null;

    useEffect(() => {
        if (texture) {
            texture.wrapS = ClampToEdgeWrapping;
            texture.wrapT = ClampToEdgeWrapping;
            texture.repeat.set(textureRepeat, textureRepeat);
            texture.offset.set(textureOffset, textureOffset);

            texture.minFilter = LinearFilter;
            texture.generateMipmaps = false;

            texture.needsUpdate = false;
        }
    }, [texture, textureRepeat, textureOffset]);

    const meshRef = useRef();

    const getRandomDouble = (min, max)=>{
        return Math.random() * (max - min) + min;
    }

    const randomRotationX = getRandomDouble(0.005, 0.01);

    useEffect(()=>{

        return()=>{
            meshRef.current?.geometry?.dispose?.();
            meshRef.current?.material?.dispose?.();
            
        }
    }, []);

    useFrame(() => {
        if (meshRef.current) {
          meshRef.current.rotation.x += randomRotationX;
        }
      });

    // const {gui, 
    //         geoFolderRef,
    //         setAddGeoFolderCallBack} = useGuiControl({id: id, 
    //                                             meshRef: meshRef,
    //                                             onGUI: onGUI,
    //                                             isUniformScale: true
    //                                             });

    // useEffect(()=>{
    
    //     if (onGUI)
    //     {
    //         if (gui && geoFolderRef)
    //         {
    //             setAddGeoFolderCallBack(()=>{
    //                 const geoFolder = gui.addFolder(`${id} - Geo`);
    //                 geoFolder.add(params, 'radiusTop', 0.1, 50).step(0.01).onChange(val=>setParams(prev=>({...prev, radiusTop: val})));
    //                 geoFolder.add(params, 'radiusBottom', 0.1, 50).step(0.01).onChange(val=>setParams(prev=>({...prev, radiusBottom: val})));
    //                 geoFolder.add(params, 'height', 0.1, 50).step(0.01).onChange(val=>setParams(prev=>({...prev, height: val})));
    //                 geoFolder.add(params, 'radialSeg', 1, 64).step(1).onChange(val=>setParams(prev=>({...prev, radialSeg: val})));
    //                 geoFolder.add(params, 'thetaLength', 0, Math.PI * 2).step(0.01).onChange(val=>setParams(prev=>({...prev, thetaLength: val})));
    //                 geoFolder.open();
    //                 geoFolderRef.current = geoFolder;
    //             });
    //         }
    //     }
    //     else
    //     {
    //         setAddGeoFolderCallBack(null);
    //     }
    
    // }, [gui, geoFolderRef, onGUI]);

    useEffect(()=>{

        setParams({radiusTop, radiusBottom, height,
                radialSeg, heightSeg, openEnded, thetaLength});

    }, [radiusTop, radiusBottom, height,
        radialSeg, heightSeg, openEnded, thetaLength]);

    useEffect(()=>{

        if (meshRef.current)
        {
            const { radiusTop, radiusBottom, height, radialSeg, heightSeg, openEnded, thetaLength } = params;

            const newGeometry = new CylinderGeometry(radiusTop, radiusBottom, height,
                radialSeg, heightSeg, openEnded, 0, thetaLength);
            
            meshRef.current.geometry.dispose();
            meshRef.current.geometry = newGeometry;

            setGeometry(newGeometry);
        }

    }, [params.radiusTop, params.radiusBottom, params.height,
        params.radialSeg, params.heightSeg, params.openEnded, params.thetaLength]);


    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            position = {position}
            rotation = {rotation}
            scale = {scale}
        >
            {
                texturePath ?
                <>
                    <meshStandardMaterial
                        attach="material-0"     // side
                        roughness = {1}
                        metalness = {0}
                        side={FrontSide}
                        color={new Color(color).multiplyScalar(dimmer ?? 1)}
                    />
                    <meshStandardMaterial
                        attach="material-1"     // top
                        map = {texture} 
                        roughness = {1}
                        metalness = {0}
                        side={FrontSide}
                        color={new Color().setScalar(dimmer)}
                    />
                    <meshStandardMaterial
                        attach="material-2"         // bottom
                        map = {texture} 
                        roughness = {1}
                        metalness = {0}
                        side={FrontSide}
                        color={new Color().setScalar(dimmer)}
                    /> 
                </> :
                <meshLambertMaterial 
                    color={new Color(color).multiplyScalar(dimmer ?? 1)}
                    side={DoubleSide}
                />
            }
        </mesh>
    )
}

export default Badge