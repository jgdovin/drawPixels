import { configureStore } from '@reduxjs/toolkit';
import pixelReducer from './features/pixel/pixelSlice';


const store = configureStore({
    reducer: {
        pixel: pixelReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;