import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Dialog, DialogTitle, Box, DialogContent, Button, DialogActions, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { setCurrentUser, getUser } from '../../features/user/userSlice';
import * as utils from '../../utils/functions.util';

export default () => {
	const user = useAppSelector(getUser);
	const dispatch = useAppDispatch();

	const [open, setOpen] = useState(false);
	const [emailError, setEmailError] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		if (isEmpty(user.value)) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [user.value]);

	return (
		<Dialog
			open={open}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle id="alert-dialog-title">
				Iniciar sesión
			</DialogTitle>
			<DialogContent>
				<Box>
					<TextField
						className="w-100p mt-12"
						label="Correo electronico"
						placeholder="Correo electronico"
						onChange={(e) => {
							setEmail(e.target.value);
							utils.handleOnChange(
								e.target.value,
								setEmailError,
								{
									required: { value: true },
									isEmail: { value: true },
								},
								' ',
							);
						}}
						error={!isEmpty(emailError)}
					/>
					<span className="error">{emailError}</span>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					disabled={isEmpty(email) || !isEmpty(emailError)}
					autoFocus
					onClick={() => dispatch(setCurrentUser(email))}
					variant="contained"
					color="primary"
				>
					Iniciar sesión
				</Button>
			</DialogActions>
		</Dialog>
	);
};
