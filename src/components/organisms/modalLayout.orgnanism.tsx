/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { SwipeableDrawer, IconButton } from '@mui/material';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ChevronLeft } from '@mui/icons-material';
import * as constants from '../../constants';

interface Props extends RouteComponentProps {
	children?: JSX.Element;
}

export default withRouter((props: Props) => {
	const { history, children } = props;
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setOpen(true);
		}, 1);
	}, []);

	return (
		<SwipeableDrawer
			anchor="bottom"
			open={open}
			ModalProps={{
				keepMounted: true,
			}}
			onClose={() => history.push(constants.routes.posts.LIST)}
			onOpen={() => setOpen(true)}
		>
			<AppBar>
				<Toolbar>
					<Typography variant="h6" component="div">
						<Link className="text-decoration-none" to={constants.routes.posts.LIST}>
							<IconButton>
								<ChevronLeft fontSize="large" color="secondary" />
							</IconButton>
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
			<div className="vh-100 bg-overlay custom-scrollbar">
				<br />
				<br />
				<br />
				<div className="w-100p d-flex justify-content-center">
					<div className="w-100p max-width-800 p-12">
						{children}
					</div>
				</div>
			</div>
		</SwipeableDrawer>
	);
});
