import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface User {
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly Email: string,
    readonly address1?: string,
    readonly city?: string,
    readonly zip?: string,
    readonly phone?: string,
    readonly jobTitle?: string,
    readonly reason?: string
}

export interface UsersState {
    readonly users: User[],
    readonly errorMessage: null | string
}

const initialState: UsersState = {
    users: [],
    errorMessage: null
};

export const createUser = createAsyncThunk<User, { data: any }, { rejectValue: { readonly errorMessage: string, readonly user: User } }>(
    'users/create',

    async (arg, thunkAPI) => {
        const user: User = arg.data;
        return await fetch(
            '/api/users/',
            {
                method: 'POST',
                body: JSON.stringify(user)
            })

            .then(response => {
                if (response.status === 201) {
                    return user;
                } else {
                    throw new Error(`Unexpected response from server (code ${response.status}).`);
                }
            })

            .catch(function (error) {
                console.error(error);
                return thunkAPI.rejectWithValue({ errorMessage: error.message, user: user });
            });
    }
);


export const listUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    'users/fetch',
    async (arg, thunkAPI) => {
        // return [
        //     { id: '1', firstName: 'firstName', lastName: 'lastName', Email: 'a@a.com', Phone: '123456789' },
            
        //     { id: '1', firstName: 'firstName', lastName: 'lastName', Email: 'a@a.com', Phone: '123456789' },
            
        //     { id: '1', firstName: 'firstName', lastName: 'lastName', Email: 'a@a.com', Phone: '123456789' },
            
        //     { id: '1', firstName: 'firstName', lastName: 'lastName', Email: 'a@a.com', Phone: '123456789' },
        // ];
        return await fetch(
            '/api/users/',
            {
                method: 'GET'
            })

            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Unexpected response from server (code ${response.status}).`);
                }
            })

            .catch(function (error) {
                console.error(error);
                return thunkAPI.rejectWithValue(error.message);
            });
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.unshift(action.payload);
                state.errorMessage = null;
            });

        builder
            .addCase(createUser.rejected, (state, action) => {
                if (action.payload !== undefined) {
                    state.users.unshift(action.payload.user);
                    state.errorMessage = action.payload.errorMessage;
                }
            });


        builder
            .addCase(listUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            });

        builder
            .addCase(listUsers.rejected, (state, action) => {
                state.errorMessage = action.payload ?? null;
            });
    },
});

export default usersSlice.reducer;
