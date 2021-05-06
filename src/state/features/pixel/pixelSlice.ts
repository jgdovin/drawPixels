import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Pixel } from './pixel';
const pixelAdapter = createEntityAdapter<Pixel>();

export const pixelSlice = createSlice({
    name: 'pixel',
    initialState: pixelAdapter.getInitialState(),
    reducers: {
        addPixel: pixelAdapter.addOne,
        removePixel: pixelAdapter.removeOne,
        clearPixels: pixelAdapter.removeAll
    }
});

export const { addPixel, removePixel, clearPixels } = pixelSlice.actions;
export const { selectAll: getAllPixels } = pixelAdapter.getSelectors<RootState>(state => state.pixel);
export default pixelSlice.reducer
