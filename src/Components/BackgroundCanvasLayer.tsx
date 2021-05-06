import { useEffect, useRef } from 'react';
import fixDpi from '../helpers/fixDpi';
import {
    DRAWING_WIDTH,
    DRAWING_HEIGHT,
    DRAWING_OFFSET_LEFT,
    DRAWING_OFFSET_TOP,
    PIXEL_SIZE
} from '../helpers/consts';

import './Canvas.css';

const BackgroundCanvas = () => {
    const backgroundCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

    useEffect(() => {
            const backgroundCtx = backgroundCanvasRef.current.getContext('2d');
            fixDpi(backgroundCanvasRef.current);
            const backgroundSize = 16 * PIXEL_SIZE;
            
            for (let i = 0; i < Math.ceil(DRAWING_WIDTH / backgroundSize); i++) {
                for (let j = 0; j < Math.ceil(DRAWING_HEIGHT / backgroundSize); j++) {
                    if ((i%2 === 0 && j%2 === 0) || (i%2 !== 0 && j%2 !== 0)) {
                        backgroundCtx!.fillStyle = '#494949';
                    } else {
                        backgroundCtx!.fillStyle = '#cacaca';
                    }
                    backgroundCtx!.fillRect(i * backgroundSize, j * backgroundSize, backgroundSize, backgroundSize);

                }
            }
            // backgroundCtx!.fillStyle = '#ffffff';
            // backgroundCtx!.fillRect(0, 0, DRAWING_WIDTH, DRAWING_HEIGHT);
        }, []);

    return (
        <div>
            <canvas ref={backgroundCanvasRef} className="canvas background" style={{ position: 'absolute', left: DRAWING_OFFSET_LEFT, top: DRAWING_OFFSET_TOP, width: DRAWING_WIDTH, height: DRAWING_HEIGHT}} />
        </div>
    );
};

export default BackgroundCanvas;