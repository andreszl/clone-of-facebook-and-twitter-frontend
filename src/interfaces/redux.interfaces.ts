/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-unused-vars */
import { store } from '../index';

export namespace redux {
	export interface IStringMap<T> {
		[key: string]: T
	}

	export type IAnyFunction = (...args: any[]) => any;
	export type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>;

	export type Store = ReturnType<typeof store.getState>;

	export type IGetState = typeof store.getState;
	export type IDistpatch = typeof store.dispatch;
}

export default redux;
