import * as React from 'react';
import { Box, Hidden, CssBaseline } from '@mui/material';
import { DrawerHeader, Main } from '../../styles/react/drawer.styles';
import { CustomAppBar, CustomDrawer } from '../../components/atoms/drawer.atoms';

interface Props {
	children?: JSX.Element;
}

export default ({ children }: Props) => {
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<CustomAppBar handleDrawerOpen={handleDrawerOpen} />
			<Hidden mdUp>
				<CustomDrawer open={open} handleDrawerClose={handleDrawerClose} type="persistent" />
			</Hidden>
			<Hidden mdDown>
				<Main open>
					<DrawerHeader />
					{children || null}
				</Main>
			</Hidden>
			<Hidden mdUp>
				<Main open={open}>
					<DrawerHeader />
					{children || null}
				</Main>
			</Hidden>
		</Box>
	);
};
