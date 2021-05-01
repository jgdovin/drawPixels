import { useEffect, useRef } from 'react';
import fixDpi from './helpers/fixDpi';
export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

    useEffect(() => {
        fixDpi(canvasRef.current);
        const ctx = canvasRef.current.getContext('2d');
        ctx!.fillStyle = '#ffffff';
        ctx!.fillRect(20, 10, 2150, 555);
    }, []);

    return (
        <canvas ref={canvasRef} style={{width: '1600px', height: '600px'}} />
    );
};