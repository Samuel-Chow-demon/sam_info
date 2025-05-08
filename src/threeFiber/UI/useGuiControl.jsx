import { useEffect, useRef, useState } from 'react'
import gui from './GUI'

const useGuiControl = ({id, meshRef, onGUI, isUniformScale = true}) => {

    const geoFolderRef = useRef(null);
    const posFolderRef = useRef(null);
    const rotFolderRef = useRef(null);
    const scaleFolderRef = useRef(null);

    const [addGeoFolderCallback, setAddGeoFolderCallBack] = useState(null);

    const checkGUIFolderRefAndClear = ()=>{

        if (geoFolderRef.current)
        {
            geoFolderRef.current.destroy();
            geoFolderRef.current = null;
        } 
        if (posFolderRef.current)
        {
            posFolderRef.current.destroy();
            posFolderRef.current = null;
        }
        if (rotFolderRef.current)
        {
            rotFolderRef.current.destroy();
            rotFolderRef.current = null;
        }
        if (scaleFolderRef.current)
        {
            scaleFolderRef.current.destroy();
            scaleFolderRef.current = null;
        }
    }

    // For GUI Changes
    useEffect(()=>{

        if (onGUI && gui && meshRef)
        {
            checkGUIFolderRefAndClear();

            if (addGeoFolderCallback)
            {
                addGeoFolderCallback();
            }

            const posFolder = gui.addFolder(`${id} - Position`);
            posFolder.add(meshRef.current.position, 'x', -50, 50).step(0.01);
            posFolder.add(meshRef.current.position, 'y', -50, 50).step(0.01);
            posFolder.add(meshRef.current.position, 'z', -50, 50).step(0.01);
            posFolder.open();
            posFolderRef.current = posFolder;

            const rotFolder = gui.addFolder(`${id} - Rotation`);
            rotFolder.add(meshRef.current.rotation, 'x', 0, Math.PI * 2).step(0.01);
            rotFolder.add(meshRef.current.rotation, 'y', 0, Math.PI * 2).step(0.01);
            rotFolder.add(meshRef.current.rotation, 'z', 0, Math.PI * 2).step(0.01);
            rotFolder.open();
            rotFolderRef.current = rotFolder;

            const scaleFolder = gui.addFolder(`${id} - Scale`);

            if (isUniformScale)
            {
                const uniformScale = {uniform : meshRef.current.scale.x};
                scaleFolder.add(uniformScale, 'uniform', 0, 10).step(0.1).onChange((val)=>{
                    meshRef.current.scale.set([val, val, val]);
                })
            }
            else
            {
                scaleFolder.add(meshRef.current.scale, 'x', 0, 10).step(0.1);
                scaleFolder.add(meshRef.current.scale, 'y', 0, 10).step(0.1);
                scaleFolder.add(meshRef.current.scale, 'z', 0, 10).step(0.1);
            }

            scaleFolder.open();
            scaleFolderRef.current = scaleFolder;
        }

        return ()=>{
            checkGUIFolderRefAndClear();
        }

    }, [onGUI, gui, id, meshRef, addGeoFolderCallback]);

  return {
    gui,
    geoFolderRef,
    posFolderRef,
    rotFolderRef,
    scaleFolderRef,
    setAddGeoFolderCallBack
  }
}

export default useGuiControl