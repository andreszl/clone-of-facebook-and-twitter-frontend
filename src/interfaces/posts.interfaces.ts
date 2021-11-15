export namespace posts {
	export interface IPost {
		_id: string,
		title : string,
		email: string,
		description: string,
		likes: string[],
		dislikes: string[],
		comments?: number,
		timestamp : {
			created_at : string,
			updated_at : string,
		}
	}

	export interface ICreate {
		title : string,
		email: string,
		description: string,
	}

	export interface IReducer {
		records: IPost[],
		date: string,
		skip: number,
		limit: number,
	}

	export const initialState: IReducer = {
		records: [],
		date: String(new Date()),
		skip: 0,
		limit: 10,
	};
}
