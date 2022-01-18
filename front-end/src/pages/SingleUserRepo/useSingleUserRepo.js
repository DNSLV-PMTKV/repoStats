import { useState } from 'react';
import { fetchSingleUserRepo } from '../../requests/requests';

const useSingleUserRepo = () => {
	const [token, setToken] = useState('');
	const [repoId, setRepoId] = useState('');
	const [renderTable, setRenderTable] = useState(false);
	const [chartData, setChartData] = useState(null);
	const [repoName, setRepoName] = useState(null);
	const [error, setError] = useState(null);

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

	const submitData = () => {
		fetchSingleUserRepo(token, repoId)
			.then((response) => {
				setRenderTable(true);
				setChartData(convertData(response.data));
				setRepoName(response.data.url);
				console.log(response.data);
			})
			.catch((error) => {
				setError(error.response.data);
			});
	};

	const backButton = () => {
		setRenderTable(false);
	};

	return {
		token,
		setToken,
		repoId,
		setRepoId,
		submitData,
		renderTable,
		chartData,
		repoName,
		backButton,
		error
	};
};

export default useSingleUserRepo;
