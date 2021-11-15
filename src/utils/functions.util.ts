import React from 'react';
import * as interfaces from '../interfaces';
import * as utils from '../utils/validations.util';

export const handleOnChange = async (
	value: any,
	setError: React.Dispatch<React.SetStateAction<any>>,
	options: interfaces.validations.IOptions,
	alias?: string,
) => {
	try {
		await utils.validate([
			{
				name: 'campo',
				alias: alias || 'campo',
				payload: value,
				options,
			},
		]);
		setError('');
	} catch (error) {
		if (error instanceof interfaces.validations.ValidationError) {
			setError(error.message);
		}
	}
};
