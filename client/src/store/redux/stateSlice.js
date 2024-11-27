import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import stateService from '../../services/stateServices';

export const fetchStates = createAsyncThunk('states/fetchAll', async (_,{rejectWithValue}) => {
    try{
    return await stateService.getStates();
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error fetching countries");
}
});

export const addState = createAsyncThunk('states/add', async (state,{rejectWithValue}) => {
    try{
    const result = await stateService.addState(state);
    alert("State Added Successfully");
    return result;
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error fetching countries");
}
});

export const deleteState = createAsyncThunk('states/delete', async (id,{rejectWithValue}) => {
    try{
    await stateService.deleteState(id);
    alert("State Deleted Successfully");
    return id;
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error fetching countries");
}
});
export const updateState = createAsyncThunk('states/update', async (state,{rejectWithValue}) => {
  try{
    const result = await stateService.updateState(state.id,state);
    alert("State Updated Successfully");
    return result;
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error fetching countries");
}
});

const stateSlice = createSlice({
    name: 'states',
    initialState: {
        statelist: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError(state) {
            state.error = null; 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStates.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStates.fulfilled, (state, action) => {
                state.statelist = action.payload;
                state.loading = false;
            })
            .addCase(fetchStates.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addState.fulfilled, (state, action) => {
                state.statelist.push(action.payload);
            })
            .addCase(addState.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteState.fulfilled, (state, action) => {
                state.statelist = state.statelist.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteState.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateState.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateState.fulfilled, (state, action) => {
              const index = state.statelist.findIndex((item) => item.id === action.payload.id);
              if (index !== -1) {
                state.statelist[index] = action.payload; 
                }
          });
    },
});
export const { clearError } = stateSlice.actions;
export default stateSlice.reducer;