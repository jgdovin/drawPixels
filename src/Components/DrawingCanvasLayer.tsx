import { useEffect, useRef, useState } from 'react';
import fixDpi from '../helpers/fixDpi';
import {
    PIXEL_SIZE,
    DRAWING_WIDTH,
    DRAWING_HEIGHT,
    VIEWPORT_WIDTH,
    VIEWPORT_HEIGHT,
    DRAWING_OFFSET_LEFT,
    DRAWING_OFFSET_TOP,
    SECONDARY_COLOR
} from '../helpers/consts';

const DrawingCanvas = (props: { setActiveCell: Function; }) => {
    const { setActiveCell } = props;
    const backgroundCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const drawingCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    
    const [isDragging, setIsDragging] = useState(false);
    const latestDragState = useRef(isDragging);

    useEffect(() => {
        latestDragState.current = isDragging;
    }, [isDragging])

    useEffect(() => {
        const backgroundCtx = backgroundCanvasRef.current.getContext('2d');
        fixDpi(backgroundCanvasRef.current);
        const drawCtx = drawingCanvasRef.current.getContext('2d');
        fixDpi(drawingCanvasRef.current);
        backgroundCtx!.fillStyle = SECONDARY_COLOR;
        backgroundCtx!.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        drawCtx!.fillStyle = '#ffffff';
        drawCtx!.fillRect(0, 0, DRAWING_WIDTH, DRAWING_HEIGHT);

        const handleMouseDown = {
            handleEvent(e: any) {
                setIsDragging(true);
            }
        }
        const handleMouseUp = {
            handleEvent(e: any) {
                setIsDragging(false);
            }
        }
        const handleMouseMove = {
            handleEvent(e: any) {
                const x = Math.floor((e.pageX - DRAWING_OFFSET_LEFT) / PIXEL_SIZE);
                const y = Math.floor((e.pageY - DRAWING_OFFSET_TOP) / PIXEL_SIZE);
                setActiveCell(`${x},${y}`);
                if (!latestDragState.current && e.type !== 'click') { return; }
                drawCtx!.fillStyle = '#000000';
                drawCtx!.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
            }
        }
        const handleMouseLeave = {
            handleEvent(e: any) {
                setActiveCell('');
            }
        }

        drawingCanvasRef.current.addEventListener('mousedown', handleMouseDown);
        drawingCanvasRef.current.addEventListener('mouseup', handleMouseUp);
        drawingCanvasRef.current.addEventListener('mousemove', handleMouseMove);
        drawingCanvasRef.current.addEventListener('click', handleMouseMove);
        drawingCanvasRef.current.addEventListener('mouseleave', handleMouseLeave);
    }, [setActiveCell]);

    return (
        <canvas ref={drawingCanvasRef} className="draw" style={{cursor: 'none', position: 'absolute', left: DRAWING_OFFSET_LEFT, top: DRAWING_OFFSET_TOP, width: DRAWING_WIDTH, height: DRAWING_HEIGHT}} />
    );
};

export default DrawingCanvas;