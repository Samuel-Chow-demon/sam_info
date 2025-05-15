import { Box, LinearProgress, Typography } from '@mui/material'
import PropTypes from 'prop-types';

const transformedValue = (value, min, max)=>{
    return (value - min) * 100 / (max - min)
}

const defaultTextControl = {
    needText : true,
    isPercentageStyle : true    // false show the "value / full"  portion style
}

const ProgressBarWithLabel = ({value, full,
                                textControl=defaultTextControl,
                                componentStyle={},
                                barStyle={},
                                textStyle={}}) => 
{
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...componentStyle
            }}>
            <Box sx={{
                width: '100%',
                marginX: '2rem',
                ...barStyle
            }}>
                <LinearProgress variant="determinate" 
                    value={transformedValue(value, 0, full)}
                    sx={{
                        ...barStyle
                    }}
                />
            </Box>
            
            {
                (textControl.needText) ?
                <Box sx={{
                    minWidth: '10%',
                }}>
                    <Typography variant='body2' sx={{

                        color: 'text.secondary',
                        ...textStyle
                    }}>
                        {
                            (textControl.isPercentageStyle) ?
                            `${Math.round(transformedValue(value, 0, full))}%` :
                            `${value}/${full}`
                        }
                    </Typography>
                </Box> : null
            }
            
        </Box>
    )
}

ProgressBarWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export {defaultTextControl, ProgressBarWithLabel};