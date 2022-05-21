import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSingleBoard, deleteColumn, updateTask } from './actionCreators';
import { BoardItem } from '../../types/Entities/Board';

interface StateTypeBoard {
  item: BoardItem;
  loading: boolean;
  error: boolean;
}

const initialState: StateTypeBoard = {
  item: {} as BoardItem,
  loading: false,
  error: false,
};

export const boardSlice = createSlice({
  name: 'boardSLice',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSingleBoard.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchSingleBoard.fulfilled.type]: (
      state: StateTypeBoard,
      action: PayloadAction<BoardItem>
    ) => {
      state.loading = false;
      state.item = action.payload;
    },
    [fetchSingleBoard.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.item = {} as BoardItem;
    },
    [deleteColumn.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteColumn.fulfilled.type]: (state: StateTypeBoard, action: PayloadAction<BoardItem>) => {
      state.loading = false;
      if (state.item) {
        state.item = action.payload;
      }
    },
    [deleteColumn.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateTask.pending.type]: (state) => {
      state.loading = true;
    },
    [updateTask.fulfilled.type]: (state: StateTypeBoard) => {
      state.loading = false;
    },
    [updateTask.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default boardSlice.reducer;
