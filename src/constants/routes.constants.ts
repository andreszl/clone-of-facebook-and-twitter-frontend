/* eslint-disable no-unused-vars */

export namespace routes {
	export enum posts {
		LIST = '/',
		CREATE = '/crear-publicacion',
		EDIT = '/editar-publicacion',
		SHOW = '/publicacion',
	}

	export enum comments {
		CREATE = '/crear-comentario',
	}
}

export default routes;
