import { useEffect, useRef } from 'react';
import fixDpi from '../helpers/fixDpi';
import {
    DRAWING_WIDTH,
    DRAWING_HEIGHT,
    DRAWING_OFFSET_LEFT,
    DRAWING_OFFSET_TOP
} from '../helpers/consts';

const BackgroundCanvas = () => {
    const backgroundCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

    useEffect(() => {
            const backgroundCtx = backgroundCanvasRef.current.getContext('2d');
            fixDpi(backgroundCanvasRef.current);
            backgroundCtx!.fillStyle = '#ffffff';
            backgroundCtx!.fillRect(0, 0, DRAWING_WIDTH, DRAWING_HEIGHT);
        }, []);

    return (
        <div>
            <canvas ref={backgroundCanvasRef} className="background" style={{ position: 'absolute', left: DRAWING_OFFSET_LEFT, top: DRAWING_OFFSET_TOP, width: DRAWING_WIDTH, height: DRAWING_HEIGHT}} />
        </div>
    );
};

export default BackgroundCanvas;