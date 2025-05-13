import { grey } from "@mui/material/colors";

const GRID_PADDING_VALUE_PX = 40;
const INFO_COLOR = 'rgb(226, 193, 131)';
const PARAGRAPH_COLOR = grey[500] ; //'rgb(180, 154, 105)';
const PARAGRAPH_BKGRD_COLOR = 'rgba(65, 57, 57, 0.5)';

const PARAGRAPH_STYLE = {
    color: PARAGRAPH_COLOR,
    mb: '2em',
    textAlign: 'justify',
    fontSize: "20px"
}

const LIST_STYLE = {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: PARAGRAPH_COLOR,
    fontSize: "20px"
}

const LIST_ICON_STYLE = {
    color: PARAGRAPH_COLOR,
    fontSize: "1rem"
}

const LIST_POINT_STYLE = {
    color: PARAGRAPH_COLOR,
    textAlign: 'justify',
    fontSize: "20px"
}


export{
    GRID_PADDING_VALUE_PX,
    INFO_COLOR,
    PARAGRAPH_COLOR,
    PARAGRAPH_BKGRD_COLOR,
    PARAGRAPH_STYLE, 
    LIST_STYLE, LIST_ICON_STYLE, LIST_POINT_STYLE
};