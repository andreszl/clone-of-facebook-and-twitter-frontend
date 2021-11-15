import request from '../utils/request.util';

export async function query<T extends any>(query: string) : Promise<T> {
	return request({
		url: 'index/query',
		method: 'POST',
		body: { query },
	});
}
