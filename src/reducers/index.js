import { createSlice, configureStore } from '@reduxjs/toolkit'

const currentDataSlice = createSlice({
  name: 'currentData',
  initialState: {
    value: null,
  },
  reducers: {
    save: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },

})

const { actions, reducer } = currentDataSlice;

export const { save } = actions;
export default reducer;