const fixDpi = (canvas: HTMLCanvasElement) => {
    const dpi: number = window.devicePixelRatio;

    const styleHeight: any = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
    const styleWidth: any = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);

    canvas.setAttribute('height', (dpi * styleHeight).toString());
    canvas.setAttribute('width', (dpi * styleWidth).toString());
};

export default fixDpi;