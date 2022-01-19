import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listRepos, deleteRepo } from '../../requests/requests';

export const useMyRepos = () => {
	const navigate = useNavigate();
	const [repos, setRepos] = useState('');

	const [deletePopup, setDeletePopup] = useState(false);
	const [selectedRepo, setSelectedRepo] = useState(null); // selected for deletion

	useEffect(() => {
		fetchRepos();
	}, []);

	const fetchRepos = () => {
		listRepos()
			.then((response) => {
				setRepos(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const openRepository = (id) => {
		navigate(`/repos/${id}`);
	};

	const openDeletePopup = (id) => {
		setSelectedRepo(id);
		setDeletePopup(true);
	};

	const closeDeletePopup = () => {
		setSelectedRepo(null);
		setDeletePopup(false);
	};

	const confirm = () => {
		deleteRepo(selectedRepo)
			.then(() => {
				window.location.reload(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return {
		repos,
		openRepository,
		deletePopup,
		openDeletePopup,
		closeDeletePopup,
		confirm
	};
};
