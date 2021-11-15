import { Person, Chat, PostAdd, PeopleAlt } from '@mui/icons-material';

import * as constants from '../constants';

export default [
	{
		name: 'Mi perfil',
		icon: Person,
	},
	{
		name: 'Mensajes',
		icon: Chat,
	},
	{
		name: 'Grupos',
		icon: PeopleAlt,
	},
	{
		name: 'Publicar post',
		icon: PostAdd,
		onlyMobile: true,
		redirect: constants.routes.posts.CREATE as string,
	},
];
