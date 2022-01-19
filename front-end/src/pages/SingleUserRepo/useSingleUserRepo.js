import moment from 'moment';
import { useState } from 'react';
import { fetchSingleUserRepo } from '../../requests/requests';

const useSingleUserRepo = () => {
	const [token, setToken] = useState('');
	const [repoId, setRepoId] = useState('');
	const [renderTable, setRenderTable] = useState(false);
	const [chartData, setChartData] = useState(null);
	const [repoName, setRepoName] = useState(null);
	const [error, setError] = useState(null);

	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);

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
		const s = start ? moment(start).format('YYYY-MM-DD') : null;
		const e = end ? moment(end).format('YYYY-MM-DD') : null;

		fetchSingleUserRepo(token, repoId, s, e)
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
		error,
		start,
		setStart,
		end,
		setEnd
	};
};

export default useSingleUserRepo;
