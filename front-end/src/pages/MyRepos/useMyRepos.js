import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listRepos } from '../../requests/requests';

export const useMyRepos = () => {
	const navigate = useNavigate();
	const [repos, setRepos] = useState('');

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

	return {
		repos,
		openRepository
	};
};
