import {useEffect, useState, Suspense, lazy, useRef} from 'react'

import { Canvas } from '@react-three/fiber';

import yaml from 'js-yaml'
import proLang from '../../data/ProgLang.yaml?raw'
import Loading from '../../components/Loading'

const ProLangBadge = lazy(()=>import('./ProLangBadge'));

const DisplayAllBadge = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [allLanguages, setAllLanguages] = useState([]);

    const canvasRef = useRef();

    useEffect(()=>{

        const canvas = canvasRef.current;

        const allLang = yaml.load(proLang);
        setAllLanguages(allLang);
        setIsLoading(false);

        return ()=>{
            if (canvas && canvas.renderer)
            {
                canvas.renderer.dispose();
            }
        };

    }, [])

    return (
        <>
            {
                isLoading ?
                <Loading /> :

                // <Suspense fallback={<div>Loading 3D badges...</div>}>
                    <Canvas
                        ref={canvasRef}
                        // frameloop='demand'
                        onCreated={({ gl }) => {
                            gl.getContext().canvas.addEventListener('webglcontextlost', (e) => {
                            console.warn('WebGL context lost', e);
                            });
                        }}
                        gl={{ preserveDrawingBuffer: false }}
                        orthographic
                        camera={{
                            zoom: 5,
                            position: [0, 0, 20],
                            fov: 75,
                            near: 1,
                            far: 50
                        }}

                        style={{
                            width: '100%',
                            height: '350px'
                        }}
                    >
                        <ambientLight intensity={2}/>

                        <Suspense fallback={null}>
                            <ProLangBadge proLangList={allLanguages.ProgLang.language}
                            radiusBottom={15}
                            position={[-70, 10, 0]} 
                            color={0x91577e}
                            scale={0.8}/>

                            <ProLangBadge proLangList={allLanguages.ProgLang.db}
                            radiusBottom={15}
                            position={[50, 10, 0]} 
                            color={0x506178}
                            textureRepeat={1}
                            textureOffset={0}
                            scale={0.8}/>

                            <ProLangBadge proLangList={allLanguages.ProgLang.ide}
                            radiusBottom={15}
                            position={[-80, -10, 0]} 
                            color={0x77bda4}
                            textureRepeat={1.1}
                            textureOffset={-0.05}
                            scale={0.8}/>

                            <ProLangBadge proLangList={allLanguages.ProgLang.tool}
                            radiusBottom={15}
                            position={[32, -10, 0]} 
                            color={0xc9c573}
                            textureRepeat={1.15}
                            textureOffset={-0.08}
                            scale={0.8}/>

                            <ProLangBadge proLangList={allLanguages.ProgLang.package}
                            radiusBottom={15}
                            position={[-60, -29, 0]} 
                            color={0xbd9477}
                            textureRepeat={1.15}
                            textureOffset={-0.08}
                            scale={0.8}/>
                        </Suspense>
                        
                    </Canvas>
            }
        </>
    )
}

export default DisplayAllBadge