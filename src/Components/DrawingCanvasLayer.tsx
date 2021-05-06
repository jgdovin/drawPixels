import { useEffect, useRef, useState } from 'react';
import fixDpi from '../helpers/fixDpi';
import {
    PIXEL_SIZE,
    DRAWING_WIDTH,
    DRAWING_HEIGHT,
    DRAWING_OFFSET_LEFT,
    DRAWING_OFFSET_TOP
} from '../helpers/consts';
import store from '../state/store';
import { addPixel, getAllPixels, removePixel } from '../state/features/pixel/pixelSlice';
import { useSelector } from 'react-redux';
import './Canvas.css';

const DrawingCanvas = (props: { activeTool: string; setActiveCell: Function; }) => {
    const { activeTool, setActiveCell } = props;
    const drawingCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    
    const [isDragging, setIsDragging] = useState(false);
    const latestDragState = useRef(isDragging);
    const activeToolRef = useRef(activeTool);
    const pixels = useSelector(getAllPixels);

    useEffect(() => {
        // console.log(pixels);
    }, [pixels])

    useEffect(() => {
        latestDragState.current = isDragging;
    }, [isDragging])

    useEffect(() => {
        activeToolRef.current = activeTool;
    }, [activeTool])

    useEffect(() => {
        const drawCtx = drawingCanvasRef.current.getContext('2d');
        fixDpi(drawingCanvasRef.current);

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
                // console.log(x, y);

                const currentTool = activeToolRef.current;
                if (currentTool === 'PENCIL') {
                    store.dispatch(addPixel({id: `${x}_${y}`, x, y, color: '#000000'}));
                    drawCtx!.fillStyle = '#000000';
                    drawCtx!.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
                }
                if (currentTool === 'ERASER') {
                    store.dispatch(removePixel(`${x}_${y}`));
                    drawCtx!.clearRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
                }
                
            }
        }
        const handleMouseLeave = {
            handleEvent(e: any) {
                setActiveCell('');
                setIsDragging(false);
            }
        }

        drawingCanvasRef.current.addEventListener('mousedown', handleMouseDown);
        drawingCanvasRef.current.addEventListener('mouseup', handleMouseUp);
        drawingCanvasRef.current.addEventListener('mousemove', handleMouseMove);
        drawingCanvasRef.current.addEventListener('click', handleMouseMove);
        drawingCanvasRef.current.addEventListener('mouseleave', handleMouseLeave);
    }, [setActiveCell]);

    return (
        <div>
            <canvas ref={drawingCanvasRef} className="canvas draw" style={{cursor: 'crosshair', position: 'absolute', left: DRAWING_OFFSET_LEFT, top: DRAWING_OFFSET_TOP, width: DRAWING_WIDTH, height: DRAWING_HEIGHT}} />
        </div>
    );
};

export default DrawingCanvas;