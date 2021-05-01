import { useEffect, useRef } from 'react';
import { DRAWING_WIDTH, DRAWING_HEIGHT, DRAWING_OFFSET_LEFT, DRAWING_OFFSET_TOP, PIXEL_SIZE } from '../helpers/consts';
import fixDpi from '../helpers/fixDpi';

const ActivePixelLayer = (props: { activeCell: string; }) => {
    const activeCellCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const { activeCell } = props;

    useEffect(() => {
        const activeCellCtx = activeCellCanvasRef.current.getContext('2d');
        activeCellCtx?.clearRect(0, 0, DRAWING_HEIGHT, DRAWING_WIDTH);
        if (activeCell.length <= 0) { return; }
        fixDpi(activeCellCanvasRef.current);
        const [x, y] = activeCell.split(',');
        activeCellCtx!.fillStyle = '#000000';
        activeCellCtx!.fillRect(parseInt(x) * PIXEL_SIZE, parseInt(y) * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }, [activeCell]);

    return (
        <canvas ref={activeCellCanvasRef} className="activeCell" style={{pointerEvents: 'none', position: 'absolute', left: DRAWING_OFFSET_LEFT, top: DRAWING_OFFSET_TOP, width: DRAWING_WIDTH, height: DRAWING_HEIGHT}} />
    );
};

export default ActivePixelLayer;