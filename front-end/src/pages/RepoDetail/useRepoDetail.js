import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { detailRepo } from '../../requests/requests';

const useRepoDetail = () => {
	const params = useParams();
	const [data, setData] = useState(null);
	const [repo, setRepo] = useState('');

	useEffect(() => {
		fetchRepoData();
	}, []);

	const convertData = (responseData) => {
		const countData = [];
		responseData.views.forEach((view) => {
			countData.push({
				name: new Date(view.timestamp).toLocaleDateString(),
				count: view.count,
				unique: view.unique
			});
		});
		return countData;
	};

	const fetchRepoData = () => {
		detailRepo(params.repoId)
			.then((response) => {
				setData(convertData(response.data));
				setRepo(response.data.url);
			})
			.catch((error) => console.log(error));
	};

	return {
		data,
		repo,
		fetchRepoData
	};
};

export default useRepoDetail;
