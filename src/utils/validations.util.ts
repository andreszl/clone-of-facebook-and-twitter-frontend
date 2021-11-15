import _, { isEmpty } from 'lodash';

import * as interfaces from '../interfaces'; // eslint-disable-line no-unused-vars
import utils from './index';

export function required(field: interfaces.validations.IValidateField) {
	const error: interfaces.validations.IvalidationError = {
		field: field.name,
		message: (field.options.required && field.options.required.customErrorMessage) || `El campo ${field.alias} es requerido*`,
		type: 'required',
	};

	if (field.options.required) {
		if (typeof field.payload === 'string' && (isEmpty(field.payload) || field.payload === 'seleccionar' || field.payload.trim() === '')) {
			throw new interfaces.validations.ValidationError(error);
		}

		if (typeof field.payload === 'number' && field.payload < 0) {
			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function isEmail(field: interfaces.validations.IValidateField) {
	if (field.options.isEmail) {
		if (field.payload.toString().search(new RegExp(utils.regex.VALID_EMAIL))) {
			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.isEmail.customErrorMessage || `El campo ${field.alias} es invalido*`,
				type: 'isEmail',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function noSpaces(field: interfaces.validations.IValidateField) {
	if (field.options.noSpaces) {
		if (field.payload.toString().indexOf(' ') >= 0) {
			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.noSpaces.customErrorMessage || `El campo ${field.alias} es invalido*`,
				type: 'noSpaces',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function minLength(field: interfaces.validations.IValidateField) {
	if (
		field.options.minLength
		&& field.options.minLength.value
		&& field.payload.length < field.options.minLength.value
	) {

		const error: interfaces.validations.IvalidationError = {
			field: field.name,
			message: field.options.minLength.customErrorMessage
				|| `El campo ${field.alias} debe tener un minimo de ${field.options.minLength.value} caracteres*`,
			type: 'minLength',
		};

		throw new interfaces.validations.ValidationError(error);
	}
}

export function maxLength(field: interfaces.validations.IValidateField) {
	if (
		field.options.maxLength
		&& field.options.maxLength.value
		&& field.payload.length > field.options.maxLength.value
	) {

		const error: interfaces.validations.IvalidationError = {
			field: field.name,
			message: field.options.maxLength.customErrorMessage
				|| `El campo ${field.alias} debe tener un máximo de ${field.options.maxLength.value} caracteres*`,
			type: 'maxLength',
		};

		throw new interfaces.validations.ValidationError(error);
	}
}

export function minQuantity(field: interfaces.validations.IValidateField) {
	if (field.options.minQuantity) {
		const parsed = parseInt(
			field.payload,
			10,
		); // eslint-disable-line no-restricted-globals
		if (isNaN(parsed)) { // eslint-disable-line no-restricted-globals
			throw new interfaces.validations.ValidationError({
				field: field.name,
				message: field.options.minQuantity.customErrorMessage
					|| `El campo ${field.alias} debe ser un campo numérico*`,
				type: 'minQuantity',
			});
		} else if (field.options.minQuantity.value && parsed < field.options.minQuantity.value) {
			throw new interfaces.validations.ValidationError({
				field: field.name,
				message: field.options.minQuantity.customErrorMessage
					|| `El campo ${field.alias} debe ser mayor a ${field.options.minQuantity.value}*`,
				type: 'minQuantity',
			});
		}
	}
}

export function onlyLetters(field: interfaces.validations.IValidateField) {
	if (field.options.onlyLetters) {
		if (field.payload.toString().search(utils.regex.ONLY_LETTERS)) {

			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.onlyLetters.customErrorMessage
					|| `El campo ${field.alias} solo acepta letras*`,
				type: 'onlyLetters',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function onlyLettersAndNumbers(field: interfaces.validations.IValidateField) {
	if (field.options.onlyLettersAndNumbers) {
		if (field.payload.toString().search(utils.regex.ONLY_LETTERS_AND_NUMBERS)) {

			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.onlyLettersAndNumbers.customErrorMessage
					|| `El campo ${field.alias} solo acepta caracteres alfanuméricos y guiones*`,
				type: 'onlyLettersAndNumbers',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function onlyLettersAndDashes(field: interfaces.validations.IValidateField) {
	if (field.options.onlyLettersAndDashes) {
		if (field.payload.toString().search(utils.regex.ONLY_LETTERS_AND_DASHES)) {

			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.onlyLettersAndDashes.customErrorMessage
					|| `El campo ${field.alias} solo acepta caracteres alfanuméricos y guiones*`,
				type: 'onlyLettersAndDashes',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function onlyNumberAndDashes(field: interfaces.validations.IValidateField) {
	if (field.options.onlyNumberAndDashes) {
		if (field.payload.toString().search(utils.regex.ONLY_NUMBERS_AND_DASHES)) {

			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.onlyNumberAndDashes.customErrorMessage
					|| `El campo ${field.alias} solo acepta caracteres numericos y guiones*`,
				type: 'onlyNumberAndDashes',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function onlyDashesOnMiddle(field: interfaces.validations.IValidateField) {
	if (field.options.onlyDashesOnMiddle) {
		if (field.payload.toString().search(utils.regex.ONLY_DASH_ON_MIDDLE)) {

			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.onlyDashesOnMiddle.customErrorMessage
					|| `El campo ${field.alias} solo acepta guiones en medio de dos letras*`,
				type: 'onlyDashesOnMiddle',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function justADash(field: interfaces.validations.IValidateField) {
	if (field.options.justADash) {
		let dashes = 0;
		for (let i = 0; i < field.payload.toString().length; i++) {
			if (field.payload.toString().charAt(i) === '-') {
				dashes++;
			}
		}
		if (dashes > 1) {
			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.justADash.customErrorMessage
					|| `El campo ${field.alias} acepta un solo guion*`,
				type: 'justADash',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function onlyNumbers(field: interfaces.validations.IValidateField) {
	if (field.options.onlyNumbers) {
		if (field.payload.toString().search(utils.regex.ONLY_NUMBERS)) {
			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.onlyNumbers.customErrorMessage
					|| `El campo ${field.alias} solo acepta numeros*`,
				type: 'onlyNumbers',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function onlyIntegers(field: interfaces.validations.IValidateField) {
	if (field.options.onlyIntegers) {
		if (field.payload.toString().search(utils.regex.ONLY_INTEGERS)) {
			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.onlyIntegers.customErrorMessage
					|| `El campo ${field.alias} solo acepta números*`,
				type: 'onlyIntegers',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function onlyNumbersWithOrWithoutDecimals(field: interfaces.validations.IValidateField) {
	if (field.options.onlyNumbersWithOrWithoutDecimals) {
		if (field.payload.toString().search(utils.regex.ONLY_NUMBERS_WITH_OR_WITHOUT_DECIMALS)) {
			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.onlyNumbersWithOrWithoutDecimals.customErrorMessage
					|| `El campo ${field.alias} solo acepta numeros con decimales*`,
				type: 'onlyNumbersWithOrWithoutDecimals',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function greaterThan(field: interfaces.validations.IValidateField) {
	if (
		field.options.greaterThan
		&& field.options.greaterThan.value
		&& field.options.greaterThan.value >= (Number)(field.payload)
	) {
		const error: interfaces.validations.IvalidationError = {
			field: field.name,
			message: field.options.greaterThan.customErrorMessage
				|| `El campo ${field.alias} debe terner un valor superior a ${field.options.greaterThan} pesos*`,
			type: 'greaterThan',
		};

		throw new interfaces.validations.ValidationError(error);
	}
}

export function confirmPassword(field: interfaces.validations.IValidateField) {
	if (field.options.confirmPassword && field.options.confirmPassword.value !== field.payload) {
		const error: interfaces.validations.IvalidationError = {
			field: field.name,
			message: field.options.confirmPassword.customErrorMessage
				|| 'Las contraseñas no coinciden*',
			type: 'confirmPassword',
		};

		throw new interfaces.validations.ValidationError(error);
	}
}

export function onlyImages(field: interfaces.validations.IValidateField) {
	const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

	if (field.options.onlyImages) {
		Array.from(field.payload).map((file: any) => {
			if (isEmpty(validTypes.find((type) => type === file.type))) {

				const error: interfaces.validations.IvalidationError = {
					field: field.name,
					message: (field.options.onlyImages && field.options.onlyImages.customErrorMessage)
						|| 'Solo se aceptan imagenes*',
					type: 'onlyImages',
				};

				throw new interfaces.validations.ValidationError(error);
			}
		});
	}
}

export function onlyVideos(field: interfaces.validations.IValidateField) {
	const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
	if (field.options.onlyVideos) {
		Array.from(field.payload).map((file: any) => {
			if (isEmpty(validTypes.find((type) => type === file.type))) {

				const error: interfaces.validations.IvalidationError = {
					field: field.name,
					message: (field.options.onlyVideos && field.options.onlyVideos.customErrorMessage)
						|| 'Solo se aceptan videos*',
					type: 'onlyVideos',
				};

				throw new interfaces.validations.ValidationError(error);
			}
		});
	}
}

export function isAdult(field: interfaces.validations.IValidateField) {
	if (field.options.isAdult) {
		const today = new Date();
		const birthDate = field.payload;
		let age = today.getFullYear() - birthDate.getFullYear();
		const month = today.getMonth() - birthDate.getMonth();
		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age -= 1;
		}
		if (age < 18) {
			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.isAdult.customErrorMessage
					|| 'Debes que se mayor de edad*',
				type: 'isAdult',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}
export function isNotEqual(field: interfaces.validations.IValidateField) {
	if (field.options.isNotEqual) {
		if (field.payload === field.options.isNotEqual.value) {
			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: field.options.isNotEqual.customErrorMessage
					|| `El campo ${field.alias} debe ser diferente a la contraseña actual*`,
				type: 'isNotEqual',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export function isAlphaNumWithoutSpaces(field: interfaces.validations.IValidateField) {
	if (field.options.isAlphaNumWithoutSpaces) {
		if (field.payload.match(/[^A-Za-z0-9]+/g)) {
			const error: interfaces.validations.IvalidationError = {
				field: field.name,
				message: (field.options.isNotEqual && field.options.isNotEqual.customErrorMessage)
					|| `El campo ${field.alias} no puede contener espacios*`,
				type: 'isNotEqual',
			};

			throw new interfaces.validations.ValidationError(error);
		}
	}
}

export const validate: interfaces.validations.IValidate = async (
	fields, firstField = null, limit = null,
) => {
	let count = 0;

	let sortedFields: interfaces.validations.IValidateField[] = [];
	const successValidations: interfaces.validations.ISuccessValidation[] = [];

	if (firstField != null) {
		sortedFields = _.sortBy(fields, (field) => {
			return field.name === firstField ? 0 : 1;
		});
	} else {
		sortedFields = fields;
	}

	if (limit != null) {
		sortedFields = [];

		if (firstField != null) {
			let limitFieldsCounts = 0;
			do {
				sortedFields.push(_.sortBy(fields, (field) => {
					return field.name === firstField ? 0 : 1;
				})[limitFieldsCounts]);

				limitFieldsCounts++;
			} while (limitFieldsCounts < limit);
		} else {
			sortedFields = [fields[0]];
		}
	}

	do {
		let optionCount = 0;
		const options: string[] = Object.getOwnPropertyNames(sortedFields[count].options);
		const data: any = null;

		do {

			switch (options[optionCount]) {
				case 'required': required(sortedFields[count]); break;
				case 'isEmail': isEmail(sortedFields[count]); break;
				case 'onlyNumbers': onlyNumbers(sortedFields[count]); break;
				case 'onlyIntegers': onlyIntegers(sortedFields[count]); break;
				case 'minQuantity': minQuantity(sortedFields[count]); break;
				case 'minLength': minLength(sortedFields[count]); break;
				case 'maxLength': maxLength(sortedFields[count]); break;
				case 'onlyLetters': onlyLetters(sortedFields[count]); break;
				case 'onlyLettersAndNumbers': onlyLettersAndNumbers(sortedFields[count]); break;
				case 'onlyLettersAndDashes': onlyLettersAndDashes(sortedFields[count]); break;
				case 'onlyNumberAndDashes': onlyNumberAndDashes(sortedFields[count]); break;
				case 'onlyDashesOnMiddle': onlyDashesOnMiddle(sortedFields[count]); break;
				case 'justADash': justADash(sortedFields[count]); break;
				case 'confirmPassword': confirmPassword(sortedFields[count]); break;
				case 'isAdult': isAdult(sortedFields[count]); break;
				case 'onlyImages': onlyImages(sortedFields[count]); break;
				case 'onlyVideos': onlyVideos(sortedFields[count]); break;
				case 'onlyNumbersWithOrWithoutDecimals': onlyNumbersWithOrWithoutDecimals(sortedFields[count]); break;
				case 'greaterThan': greaterThan(sortedFields[count]); break;
				case 'isNotEqual': isNotEqual(sortedFields[count]); break;
				case 'isAlphaNumWithoutSpaces': isAlphaNumWithoutSpaces(sortedFields[count]); break;
				case 'noSpaces': noSpaces(sortedFields[count]); break;
				default: null;
			}

			successValidations.push({
				field: sortedFields[count].name,
				type: options[optionCount],
				data,
			});

			optionCount++;

		} while (optionCount < options.length);

		count++;

	} while (count < sortedFields.length);

	return successValidations;
};
