import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userServices';


export const fetchUsers = createAsyncThunk('users/fetchAll', async (_,{rejectWithValue}) => {
   try{
    return await userService.getUsers();
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error fetching users");
}
});

export const addUser = createAsyncThunk('users/add', async (user,{rejectWithValue}) => {
   try{
    const result = await userService.addUser(user);
    alert("Added Successfully");
    return result;
} catch (error) {
    alert(error.message);
    return rejectWithValue(error.message || "Error inserting user");
}
});

export const deleteUser = createAsyncThunk('users/delete', async (id,{rejectWithValue}) => {
    try{
    await userService.deleteUser(id);
    alert("Deleted Successfully");
    return id;
} catch (error) {
    return rejectWithValue(error.response.data.message || "Error deleting user ");
}
});
export const updateUser = createAsyncThunk('users/update', async (user,{rejectWithValue}) => {
//   for (let [key, value] of user.entries()) {
//     console.log(`${key}:`, value);
//   }
try{
  const result = await userService.updateUser(user);
  alert("Updated Successfully");
  console.log(result);
  return result;
} catch (error) {
    alert(error.message);
    return rejectWithValue(error.message || "Error updating user ");
}
});

// Slice
const userSlice = createSlice({
    name: 'users',
    initialState: {
        userlist: [],
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
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.userlist = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.userlist = state.userlist.filter((item) => item.id !== action.payload);
            })
        //     .addCase(addUser.fulfilled, (state, action) => {
        //         state.userlist.push(action.payload);
        //     })
        //     .addCase(updateUser.fulfilled, (state, action) => {
        //       const index = state.userlist.findIndex((item) => item.id === action.payload.id);
        //       if (index !== -1) {
        //         state.userlist[index] = action.payload; 
        //          }
        //   })
          ;
    },
});
export const { clearError } = userSlice.actions;
export default userSlice.reducer;