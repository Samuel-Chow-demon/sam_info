import {useRef} from 'react'

const VideoPlayer = ({url, title, style={}}) => {

    const iframeRef = useRef(null);

    return (
        <div style={{
            width: '100%',
            paddingTop: '56.25%',
            position: 'relative',
            backgroundColor: 'blue',
            ...style}}>
            <iframe
                ref={iframeRef}
                src={url}
                allow="autoplay; fullscreen; picture-in-picture"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                }}
                title={title}
                allowFullScreen
            />
        </div>
    );
}

export default VideoPlayer