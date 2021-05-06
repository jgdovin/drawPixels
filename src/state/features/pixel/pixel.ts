export interface Pixel {
    /**
     * Unique ID of pixel built from pixel coords. <xy>
     */
    id: string,
    /**
     * X coordinate of pixel
     */
    x: number,
    /**
     * Y coordinate of pixel
     */
    y: number,
    /**
     * Hexadecimal representation of the color of the pixel.
     */
    color: string
}