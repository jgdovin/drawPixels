import { useState } from 'react';
import ActivePixelLayer from './Components/ActivePixelLayer';
import Grid from '@material-ui/core/Grid';

import DrawingCanvasLayer from './Components/DrawingCanvasLayer';
import BackgroundCanvasLayer from './Components/BackgroundCanvasLayer';

const Canvas = (props: { activeTool: string; }) => {
    const { activeTool } = props;
    const [activeCell, setActiveCell] = useState('');

    return (
        <Grid style={{height: '100vh'}} item xs={10}>
            <BackgroundCanvasLayer />
            <DrawingCanvasLayer activeTool={activeTool} setActiveCell={setActiveCell} />
            <ActivePixelLayer activeCell={activeCell} />
        </Grid>

    );
};

export default Canvas;