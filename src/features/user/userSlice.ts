import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface IUser {
	value: string;
}

const initialState: IUser = {
	value: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export const { setCurrentUser } = userSlice.actions;
export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;
