/* eslint-disable no-unused-vars */
export namespace request {
	export interface IConfiguration<Body = {}> {
		method?: string,
		host?: string,
		url: string,
		headers?: any,
		body?: Body,
	}
}

export default request;
