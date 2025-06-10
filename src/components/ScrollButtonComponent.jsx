import {memo, useEffect, useRef, useState} from 'react'
import ScrollButton from './ScrollButton';

const rootDom = document.getElementById('root');

const ScrollButtonComponent = ({stepLabelDomRef}) => {

    const [scrollButtonTop, setScrollButtonTop] = useState(window.innerHeight / 2);
    const scrollButtonRef = useRef(null);

    const activeLabelIdx = useRef(-1);
    const activeLabelIdxDiff = useRef(0);

    const [displayScrollButton, setDisplayScrollButton] = useState('none');

    useEffect(()=>{

        if (scrollButtonRef.current)
        {
            const topPos = (window.innerHeight - scrollButtonRef.current.offsetHeight) / 2;
            setScrollButtonTop(topPos);
        }

    }, [scrollButtonRef.current]);

    useEffect(()=>{

        if (!rootDom)
        {
            return;
        }

        const handleScrollY = ()=>{

            activeLabelIdx.current = -1;

            const entries = Object.values(stepLabelDomRef.current);

            let minIndex = -1;
            let minValue = -1;

            // Find all the label position to the pointer difference
            for (let i = 0; i < entries.length; i++)
            {
                const dom = entries[i];

                const diff = rootDom.scrollTop - dom.offsetTop;

                //console.log(`${i} - diff ${diff}`);

                if (diff >= 0 && (minValue < 0 || diff < minValue))
                {
                    minValue = diff;
                    minIndex = i;
                }
            }

            if (minValue >= 0)
            {
                activeLabelIdx.current = minIndex;
                activeLabelIdxDiff.current = minValue;
            }

            setDisplayScrollButton((activeLabelIdx.current >= 0) ? 'block' : 'none');
        };

        rootDom.addEventListener('scroll', handleScrollY);

        return ()=>{
            rootDom.removeEventListener('scroll', handleScrollY);
        }

    }, []);

    const customScrollIntoView = (element) =>{

        if (element)
        {
            const top = element.offsetTop;

            rootDom.scrollTo({
                top : top,
                behavior: 'smooth'
            });
        }
    }

    const scrollUpClick = ()=>{

        if (activeLabelIdx.current >= 0)
        {
            const offset = (activeLabelIdxDiff.current <= 1) ? 1 : 0;

            customScrollIntoView(stepLabelDomRef.current[activeLabelIdx.current - offset]);

            // Cannot direct use scrollIntoView since it would affect the iframe at the parent app
            // stepLabelDomRef.current[activeLabelIdx.current - offset]?.scrollIntoView({
            //     behavior: 'smooth',
            //     block: 'start',
            //     inline: 'nearest'
            // });

            window.parent.postMessage('invalidate-scene', '*');
        }
    }

    const scrollDownClick = ()=>{

        if (activeLabelIdx.current >= -1)
        {
             customScrollIntoView(stepLabelDomRef.current[activeLabelIdx.current + 1]);

            // Cannot direct use scrollIntoView since it would affect the iframe at the parent app
            // stepLabelDomRef.current[activeLabelIdx.current + 1]?.scrollIntoView({
            //     behavior: 'smooth',
            //     block: 'start',
            //     inline: 'nearest'
            // });
            window.parent.postMessage('invalidate-scene', '*');
        }
    }

    return(
        <div style={{
            position: 'absolute',
            zIndex: 99,
            top: scrollButtonTop,
            left: window.innerWidth * 0.9,
            display: displayScrollButton
        }}>
            <ScrollButton ref={scrollButtonRef}
                        upOnClick={scrollUpClick}
                        downOnClick={scrollDownClick}/>
        </div>
    );
}

export default memo(ScrollButtonComponent);