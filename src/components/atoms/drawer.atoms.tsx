import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import {
	Drawer, Toolbar, List, Divider, IconButton, ListItem,
	ListItemIcon, ListItemText, Typography, Hidden, Button,
} from '@mui/material';

import { Link, useHistory } from 'react-router-dom';

import { Menu, ChevronLeft, ChevronRight } from '@mui/icons-material';

import { AppBar, DrawerHeader, drawerWidth } from '../../styles/react/drawer.styles';
import { menuItems } from '../../data';
import * as constants from '../../constants';

export const DrawerContent = ({ handleDrawerClose }: any) => {
	const history = useHistory();
	const theme = useTheme();

	return (
		<>
			<Hidden mdUp>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</DrawerHeader>
				<Divider />
			</Hidden>

			{
				menuItems.map((menuItem) => {
					return (
						<List
							key={menuItem.name}
							onClick={() => {
								menuItem.redirect ? history.push(constants.routes.posts.CREATE) : null;
							}}
						>
							<ListItem button>
								<ListItemIcon>
									<menuItem.icon />
								</ListItemIcon>
								<ListItemText primary={menuItem.name} />
							</ListItem>
						</List>
					);
				})
			}
		</>
	);
};

export const CustomDrawer = ({ open, type, handleDrawerClose }: any) => {
	return (
		<>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant={type}
				anchor="left"
				open={open}
			>
				<DrawerContent handleDrawerClose={handleDrawerClose} />
			</Drawer>
		</>
	);
};

export const CustomToolbar = ({ open, handleDrawerOpen }: any) => {
	const brand = 'Clone of Facebook and Twitter';
	return (
		<>
			<Hidden mdDown>
				<Toolbar className="w-100p">
					<div className="w-100p d-flex align-items-center justify-content-between">
						<Typography variant="subtitle1" noWrap component="div">
							<Link className="text-decoration-none text-white" to="/">{brand}</Link>
						</Typography>
						<div className="d-flex align-items-center">
							{
								menuItems.filter((i) => !i.onlyMobile).map((menuItem) => {
									return (
										<List key={menuItem.name}>
											<ListItem button>
												<ListItemIcon>
													<menuItem.icon color="secondary" />
												</ListItemIcon>
												<ListItemText primary={menuItem.name} />
											</ListItem>
										</List>
									);
								})
							}
						</div>
						<div>
							<Link className="text-decoration-none" to={constants.routes.posts.CREATE}>
								<Button color="secondary" variant="outlined">Publicar post</Button>
							</Link>
						</div>
					</div>
				</Toolbar>
			</Hidden>
			<Hidden mdUp>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<Menu />
					</IconButton>
					<Typography className="text-center w-100p ml-40-reverse" variant="h6" noWrap component="div">
						<Link className="text-decoration-none text-white" to="/">{brand}</Link>
					</Typography>
				</Toolbar>
			</Hidden>
		</>
	);
};

export const CustomAppBar = ({ open, handleDrawerOpen }: any) => {
	return (
		<>
			<Hidden mdDown>
				<AppBar
					key="appbar-1"
					position="fixed"
				>
					<CustomToolbar key="toolbar-1" handleDrawerOpen={handleDrawerOpen} />
				</AppBar>
			</Hidden>
			<Hidden mdUp>
				<AppBar key="appbar-2" position="fixed" open={open}>
					<CustomToolbar key="toolbar-2" handleDrawerOpen={handleDrawerOpen} />
				</AppBar>
			</Hidden>
		</>
	);
};
