import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMyRepos } from './useMyRepos';
import Dialog from '@mui/material/Dialog';

const MyRepos = () => {
	const { repos, openRepository, deletePopup, openDeletePopup, closeDeletePopup, confirm } = useMyRepos();
	return (
		<>
			<Dialog open={deletePopup} onClose={closeDeletePopup}>
				<DialogTitle>Confirm</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this repository?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={confirm}>Yes</Button>
					<Button onClick={closeDeletePopup} autoFocus>
						No
					</Button>
				</DialogActions>
			</Dialog>

			<List>
				{repos &&
					repos.map((repo) => {
						return (
							<ListItem
								disablePadding
								key={repo.id}
								secondaryAction={
									<IconButton edge='end' aria-label='delete' onClick={() => openDeletePopup(repo.id)}>
										<DeleteIcon />
									</IconButton>
								}
							>
								<ListItemButton onClick={() => openRepository(repo.id)}>
									<ListItemIcon>
										<GitHubIcon />
									</ListItemIcon>
									<ListItemText primary={repo.url} />
								</ListItemButton>
							</ListItem>
						);
					})}
			</List>
		</>
	);
};

export default MyRepos;
