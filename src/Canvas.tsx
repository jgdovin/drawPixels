import { useEffect, useRef, useState } from 'react';
import fixDpi from './helpers/fixDpi';
export default function Canvas() {
    const backgroundCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const drawingCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const pixelSize = 25;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const width = 32;
    const height = 32;
    const drawingOffsetLeft = Math.round(canvasWidth / 2 - ((width * pixelSize) / 2));
    const drawingOffsetTop = Math.round(canvasHeight / 2 - ((height * pixelSize) / 2));
    const drawingWidth = pixelSize * width;
    const drawingHeight = pixelSize * height;

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
        backgroundCtx!.fillStyle = '#000000';
        backgroundCtx!.fillRect(0, 0, canvasWidth, canvasHeight);
        drawCtx!.fillStyle = '#ffffff';
        drawCtx!.fillRect(0, 0, width * pixelSize, height * pixelSize);
    }, [canvasHeight, canvasWidth]);

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
                if (!latestDragState.current && e.type !== 'click') { return; }
                const x = Math.floor((e.pageX - drawingOffsetLeft) / pixelSize);
                const y = Math.floor((e.pageY - drawingOffsetTop) / pixelSize);
                drawCtx!.fillStyle = '#000000';
                drawCtx!.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            }
        }

        drawingCanvasRef.current.addEventListener('mousedown', handleMouseDown);
        drawingCanvasRef.current.addEventListener('mouseup', handleMouseUp);
        drawingCanvasRef.current.addEventListener('mousemove', handleMouseMove);
        drawingCanvasRef.current.addEventListener('click', handleMouseMove);
    }, [drawingOffsetLeft, drawingOffsetTop, isDragging]);

    return (
        <div>
            <canvas ref={backgroundCanvasRef} className="background" style={{position: 'absolute', left: '0px', top: '0px', width: canvasWidth, height: canvasHeight}} />
            <canvas ref={drawingCanvasRef} className="draw" style={{position: 'absolute', left: drawingOffsetLeft, top: drawingOffsetTop, width: drawingWidth, height: drawingHeight}} />
        </div>
    );
};