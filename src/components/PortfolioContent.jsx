import { Avatar, Button, Card, CardHeader, Chip, Grid, Tooltip } from '@mui/material'
import {memo, useEffect, useState} from 'react'
import { PARAGRAPH_BKGRD_COLOR, PARAGRAPH_STYLE } from '../script/constant'
import { conditionalStyle } from '../utility/style'
import useYamlCfgStyle from '../hook/useYamlCfgStyle'
import { amber, blue, deepPurple, grey, purple} from '@mui/material/colors'
import IconComponent from './IconComponent'
import ReplyIcon from '@mui/icons-material/Reply';
import VideoPlayer from './VideoPlayer'
import CastIcon from '@mui/icons-material/Cast';
import DescriptionIcon from '@mui/icons-material/Description';

const PortfolioContent = ({id, compObj, setSelectedProj, index, style={}}) => {

    const imageObj = compObj.img;

    const imageStyle = conditionalStyle(imageObj.style, imageObj.style);

    const [linkHovered, setLinkHovered] = useState(false);
    const [deployLinkHovered, setDeployLinkHovered] = useState(false);

    const {
        TextComponent,
        ListComponent,
        ImgComponent,
        // ContentComponent
    } = useYamlCfgStyle();

    const iconStyle = {
        width: '2rem',
        height: '2rem',
        border: '1px solid #b6c6e0',
        borderRadius: '50%'
    };

    const chipStyle = {
        width: '100%',
        fontSize: '1.3rem',
        padding: '1rem',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        backgroundColor: grey[600],
        opacity: 0.8,
        '& .MuiChip-label': {
            paddingLeft: '0.5rem',
            paddingRight: '1rem',
            opacity: 0.8,
        },
        paddingY: '1.5rem'
    }

    const ChipComponent = memo(({label, iconTag, chipStyle})=>{
        return(
            <Chip
                label={label}
                avatar={
                        <IconComponent iconTag={iconTag} style={iconStyle}/>
                    }
                sx={chipStyle}
            />
        );
    });

     const ChipMUIComponent = memo(({label, iconMUI : IconMUI, chipStyle, iconStyle})=>{
        return(
            <Chip
                label={label}
                avatar={
                        <IconMUI style={iconStyle}/>
                    }
                sx={chipStyle}
            />
        );
    });

    const LangAndIDEComponent = memo(({compObj, chipStyle})=>{

        return (
        <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: '1.5rem'
                }}>
                {
                    "lang" in compObj ?
                    <ChipComponent label={"Language"} iconTag={compObj.lang.icon} chipStyle={chipStyle}/> : null
                }
                {
                    "lang2" in compObj ?
                    <ChipComponent label={"Language"} iconTag={compObj.lang2.icon} chipStyle={chipStyle}/> : null
                }
                {
                    "lib" in compObj ?
                    <ChipComponent label={"Library"} iconTag={compObj.lib.icon} chipStyle={chipStyle}/> : null
                }
                {
                    "lib2" in compObj ?
                    <ChipComponent label={"Library"} iconTag={compObj.lib2.icon} chipStyle={chipStyle}/> : null
                }
                {
                    "ide" in compObj ?
                    <ChipComponent label={"IDE"} iconTag={compObj.ide.icon} chipStyle={chipStyle}/> : null
                }
                {
                    "github" in compObj ?
                    <ChipComponent 
                    label={
                        <a 
                            href={compObj.github.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                                color: linkHovered ? blue[900] : deepPurple[900], 
                                textDecoration: 'underline',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                overflowWrap: 'anywhere',
                            }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={()=>setLinkHovered(true)}
                            onMouseLeave={()=>setLinkHovered(false)}
                        >
                            {compObj.github.text}
                        </a>
                    }
                    iconTag={'github'}
                    chipStyle={{...chipStyle,
                        paddingY: '2rem'
                    }}
                    /> : null
                }
            </div>
        );
    });

    const ChipContentComponent = memo(({compObj, chipStyle})=>{

        const chipContentStyle = conditionalStyle(compObj?.chipcontent?.style, compObj?.chipcontent?.style);

        const ChipIcon = compObj?.chipcontent?.isdeploy ? CastIcon : DescriptionIcon;

        const LabelComponent = ()=>{

            return(
                <>
                    {
                        compObj.chipcontent.link ?
                        <a 
                            href={compObj.chipcontent.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                                color: deployLinkHovered ? blue[900] : amber[500], 
                                textDecoration: 'underline',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                overflowWrap: 'anywhere',
                            }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={()=>setDeployLinkHovered(true)}
                            onMouseLeave={()=>setDeployLinkHovered(false)}
                        >
                            {compObj.chipcontent.text}
                        </a>
                        :
                        (compObj.chipcontent.text)
                    }
                </>
            )
        };

        return(
            <>
                {
                    "chipcontent" in compObj ?
                    <ChipMUIComponent 
                    label={
                        <LabelComponent />
                    }
                    iconMUI={ChipIcon}
                    chipStyle={{...chipStyle,
                        paddingY: '2rem',
                        ...chipContentStyle
                    }}
                    iconStyle={{
                        width: '2rem',
                        height: '2rem',
                        color: 'white',
                        marginRight: '0.1rem'
                    }}/>
                    : null
                }
            </>
        );

    });


    const handleGotoFile = ({linkObj})=>{

        if ("src" in linkObj)
        {
            window.open(linkObj.src, "_blank", "noopener, noreferrer");
        }
    }

    const GridImgCard = memo(({id, imgObj, index})=>{

         const HeaderComponent = <TextComponent id={id} paragObj={imgObj.img} refKey={'subheader'} index={index} defaultStyle={PARAGRAPH_STYLE}/>;

        return(
            <Tooltip title="click to document URL / reference">
                <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: '0.5rem'
                    }}
                    onClick={()=>handleGotoFile({linkObj: imgObj.img})}
                >
                    {HeaderComponent}
                    <ImgComponent imgObj={imgObj.img} />
                    
                </div>
            </Tooltip>
        );
    });

    const GridImages = memo(({id, compObj, index})=>{

        const HeaderComponent = <TextComponent id={id} paragObj={compObj.images} refKey={'subheader'} index={index} defaultStyle={PARAGRAPH_STYLE}/>;

        return (
            <> 
                {
                    ("images" in compObj) ?
                    <>
                        {HeaderComponent}

                        <Grid container
                            spacing={{xs: 1, sm: 2, md: 2}}
                            columns={{xs: 2, sm: 4, md: 6}}
                            sx={{
                                width: '100%',
                                // marginLeft: '5rem'
                            }}
                        >
                            {
                                compObj.images.imgList.map((imgObj, idx)=>(

                                    <Grid 
                                        item
                                        key={`${id}-Images-${index}-${idx}`} 
                                        // size={{xs:2, sm:2, md:3}}
                                        xs={2} // Take up 2 columns in xs breakpoint
                                        sm={2} // Take up 2 columns in sm breakpoint
                                        md={3} // Take up 3 columns in md breakpoint
                                    >
                                        <GridImgCard imgObj={imgObj}/>

                                    </Grid>
                                ))
                            }                        
                        </Grid>
                    </> : null
                }
            </>
        )
    });

    const VideoComponent = memo(({compObj})=>{

        const HeaderComponent = <TextComponent id={id} paragObj={compObj.video} refKey={'subheader'} index={index} defaultStyle={PARAGRAPH_STYLE}/>;

        return (
            <>
                {
                    ("video" in compObj) ?
                    <>
                        {HeaderComponent}
                        <VideoPlayer 
                            url={compObj.video.link}
                            title={compObj.title.text}
                        /> 
                    </> : null
                }     
            </>
        )
    });


    return (
    <Card variant="outlined" sx={{
        width: '100%',
        backgroundColor: PARAGRAPH_BKGRD_COLOR,
        borderRadius: '10px',
        padding: '10px',
        ...style
    }}>

        <CardHeader
            title={
                <TextComponent id={id} paragObj={compObj} refKey={'title'} index={0}/>
            }
            action={
                <Button variant='outlined' 
                        endIcon={<ReplyIcon />}
                        onClick={()=>{setSelectedProj(null)}}
                >
                    Back
                </Button>
            }
        />

        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '1rem',
            gap: '2rem'
        }}>
            <div style={{
                width: '25%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '2rem'
            }}>
                <img
                    src={compObj.img.src}
                    onContextMenu={(e)=>e.preventDefault()}
                    style={{
                        minWidth: '200px',
                        minHeight: '200px',
                        objectFit: 'contain',
                        borderRadius: '1.5rem',
                        ...imageStyle
                    }}
                >
                </img>

                <LangAndIDEComponent compObj={compObj} chipStyle={chipStyle} />
            </div>

            <div style={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center ',
                paddingRight: '1.5rem',
                gap: '1.5rem'
            }}>


                <ListComponent id={id} paragObj={compObj.description} index={index} />

                <ChipContentComponent compObj={compObj} chipStyle={chipStyle}/>
                
                <GridImages id={id} compObj={compObj} index={index} />

                <VideoComponent compObj={compObj} />

            </div>

        </div>

        
    </Card>
    )
}

export default PortfolioContent