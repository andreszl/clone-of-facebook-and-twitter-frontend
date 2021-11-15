/* eslint-disable no-unused-vars */
export namespace validations {
	export interface IOptions {
		required?: OptionType;
		isEmail?: OptionType;
		onlyNumbers?: OptionType;
		onlyNumbersWithOrWithoutDecimals?: OptionType;
		minLength?: OptionType<number>;
		minQuantity?: OptionType<number>;
		maxLength?: OptionType<number>;
		onlyLetters?: OptionType;
		confirmPassword?: OptionType<string>;
		isAdult?: OptionType;
		onlyImages?: OptionType;
		onlyVideos?: OptionType;
		greaterThan?: OptionType<number>;
		isNotEqual?: OptionType<string>;
		isCorrectGuide?: OptionType<{ validateDeliveryDate?: OptionType }>;
		iSExistUser?: OptionType;
		conversation?: OptionType<'IS_PREV_FINISHED' | 'IS_PREV_ACTIVE'>[];
		isFirstChar?: OptionType<string>;
		hasCorrectPrefix?: OptionType<string[]>;
		onlyIntegers?: OptionType;
		onlyLettersAndNumbers?: OptionType;
		onlyLettersAndDashes?: OptionType;
		onlyDashesOnMiddle?: OptionType;
		justADash?: OptionType;
		isAlphaNumWithoutSpaces?: OptionType;
		onlyNumberAndDashes?: OptionType;
		noSpaces?: OptionType;
	}

	export interface OptionType<type = true> {
		value?: type;
		customErrorMessage?: string;
	}

	export interface IMessage {
		option: 'required' | 'isEmail' | 'onlyNumbers' | 'onlyIntegers' | 'onlyNumbersWithOrWithoutDecimals' | 'minLength' | 'maxLength' | 'onlyLetters' | 'onlyLettersAndNumbers' | 'confirmPassword' | 'isAdult' | 'onlyImages' | 'onlyVideos' | 'greaterThan' | 'isNotEqual' | 'isExistGuide' | 'iSExistUser' | 'customMessage' | 'isCorrectGuide' | 'minQuantity',
		payload: string,
	}

	export interface IValidateField<Payload = any> {
		name: string,
		alias: string,
		payload: Payload,
		options: IOptions,
		customMessage?: IMessage[],
	}

	export interface IValidate {
		(
			fields: IValidateField[],
			firstField?: string | null,
			limit?: number|null,
		): Promise<ISuccessValidation[]>;
	}

	export interface ISuccessValidation {
		field: string,
		type: string,
		data: any | null,
	}

	export interface IvalidationError {
		field: string,
		message: string,
		type: string,
	}

	export class ValidationError {
		public field: string;
		public message: string;
		public type: string;

		constructor(error: IvalidationError) {
			this.field = error.field;
			this.type = error.type;
			this.message = error.message;
		}
	}
}

export default validations;
