import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';
import { useMyRepos } from './useMyRepos';

const MyRepos = () => {
	const { repos, openRepository } = useMyRepos();
	return (
		<List>
			{repos &&
				repos.map((repo) => {
					return (
						<ListItem disablePadding key={repo.id}>
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
	);
};

export default MyRepos;
