import iconTexture from '../utility/iconTexture';

const IconComponent = ({iconTag})=>{
        return(
            <img 
                src={iconTexture[iconTag]}
                style={{
                    width: '4rem',
                    height: '4rem',

                    objectFit: 'contain',
                    backgroundColor: "white",
                    borderRadius: '0.5rem'
                }}
            >    
            </img>
        )
    }

export default IconComponent;