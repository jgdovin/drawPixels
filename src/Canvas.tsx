import { useEffect, useRef, useState } from 'react';
import ActivePixelLayer from './Components/ActivePixelLayer';
import DrawingCanvasLayer from './Components/DrawingCanvasLayer';
import fixDpi from './helpers/fixDpi';
import {
    VIEWPORT_WIDTH,
    VIEWPORT_HEIGHT,
    SECONDARY_COLOR
} from './helpers/consts';

export default function Canvas() {
    const backgroundCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    
    const [activeCell, setActiveCell] = useState('');

    useEffect(() => {
        const backgroundCtx = backgroundCanvasRef.current.getContext('2d');
        fixDpi(backgroundCanvasRef.current);
        backgroundCtx!.fillStyle = SECONDARY_COLOR;
        backgroundCtx!.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    }, []);

    return (
        <div>
            <canvas ref={backgroundCanvasRef} className="background" style={{position: 'absolute', left: '0px', top: '0px', width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT}} />
            <DrawingCanvasLayer setActiveCell={setActiveCell} />
            <ActivePixelLayer activeCell={activeCell} />
        </div>
    );
};