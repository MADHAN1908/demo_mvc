import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import countryService from '../../services/countryServices';


// Async actions
export const fetchCountries = createAsyncThunk('countries/fetchAll', async (_,{rejectWithValue}) => {
try{
    return await countryService.getCountries();
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error fetching countries");
}
});

export const addCountry = createAsyncThunk('countries/add', async (country,{rejectWithValue}) => {
    try{
    const result = await countryService.addCountry(country);
    alert("Added Successfully");
    return result;
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error adding country");
}
});

export const deleteCountry = createAsyncThunk('countries/delete', async (id,{rejectWithValue}) => {
    try{
    const result = await countryService.deleteCountry(id);
    alert("Deleted Successfully");
    return id;
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error updating country");
}
});
export const updateCountry = createAsyncThunk('countries/update', async (country,{rejectWithValue}) => {
    try{
  const result = await countryService.updateCountry(country.id,country);
  alert("Updated Successfully");
  return result;
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error updating country");
}
});

// Slice
const countrySlice = createSlice({
    name: 'countries',
    initialState: {
        countrylist: [],
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
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countrylist = action.payload;
                state.loading = false;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addCountry.fulfilled, (state, action) => {
                state.countrylist.push(action.payload);
            })
            .addCase(addCountry.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteCountry.fulfilled, (state, action) => {
                state.countrylist = state.countrylist.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteCountry.rejected, (state, action) => {
                state.error =  action.payload;
            })
            .addCase(updateCountry.rejected, (state, action) => {
                state.error =  action.payload;
            })
            .addCase(updateCountry.fulfilled, (state, action) => {
              const index = state.countrylist.findIndex((item) => item.id === action.payload.id);
              if (index !== -1) {
                state.countrylist[index] = action.payload; 
                 }
          });
    },
});

export const { clearError } = countrySlice.actions;
export default countrySlice.reducer;