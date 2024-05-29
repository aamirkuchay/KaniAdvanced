// redux/Slice/ThemeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleThemeMode: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { toggleThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
