import { useEffect, useRef, useState } from 'react';
import fixDpi from './helpers/fixDpi';
import {
    PIXEL_SIZE,
    DRAWING_WIDTH,
    DRAWING_HEIGHT,
    VIEWPORT_WIDTH,
    VIEWPORT_HEIGHT,
    DRAWING_OFFSET_LEFT,
    DRAWING_OFFSET_TOP
} from './helpers/consts';

export default function Canvas() {
    const backgroundCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const drawingCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const activeCellCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    

    const [isDragging, setIsDragging] = useState(false);
    const latestDragState = useRef(isDragging);

    const [activeCell, setActiveCell] = useState('');

    useEffect(() => {
        const activeCellCtx = activeCellCanvasRef.current.getContext('2d');
        activeCellCtx?.clearRect(0, 0, DRAWING_HEIGHT, DRAWING_WIDTH);
        if (activeCell.length <= 0) { return; }
        fixDpi(activeCellCanvasRef.current);
        const [x, y] = activeCell.split(',');
        activeCellCtx!.fillStyle = '#000000';
        activeCellCtx!.fillRect(parseInt(x) * PIXEL_SIZE, parseInt(y) * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }, [activeCell]);

    useEffect(() => {
        latestDragState.current = isDragging;
    }, [isDragging])

    useEffect(() => {
        const backgroundCtx = backgroundCanvasRef.current.getContext('2d');
        fixDpi(backgroundCanvasRef.current);
        const drawCtx = drawingCanvasRef.current.getContext('2d');
        fixDpi(drawingCanvasRef.current);
        backgroundCtx!.fillStyle = '#000000';
        backgroundCtx!.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        drawCtx!.fillStyle = '#ffffff';
        drawCtx!.fillRect(0, 0, DRAWING_WIDTH, DRAWING_HEIGHT);
    }, []);

    useEffect(() => {
        const drawCtx = drawingCanvasRef.current.getContext('2d');
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
                console.log('left');
                setActiveCell('');
            }
        }

        drawingCanvasRef.current.addEventListener('mousedown', handleMouseDown);
        drawingCanvasRef.current.addEventListener('mouseup', handleMouseUp);
        drawingCanvasRef.current.addEventListener('mousemove', handleMouseMove);
        drawingCanvasRef.current.addEventListener('click', handleMouseMove);
        drawingCanvasRef.current.addEventListener('mouseleave', handleMouseLeave);
    }, [isDragging]);

    return (
        <div>
            <canvas ref={backgroundCanvasRef} className="background" style={{position: 'absolute', left: '0px', top: '0px', width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT}} />
            <canvas ref={drawingCanvasRef} className="draw" style={{cursor: 'none', position: 'absolute', left: DRAWING_OFFSET_LEFT, top: DRAWING_OFFSET_TOP, width: DRAWING_WIDTH, height: DRAWING_HEIGHT}} />
            <canvas ref={activeCellCanvasRef} className="activeCell" style={{pointerEvents: 'none', position: 'absolute', left: DRAWING_OFFSET_LEFT, top: DRAWING_OFFSET_TOP, width: DRAWING_WIDTH, height: DRAWING_HEIGHT}} />
        </div>
    );
};