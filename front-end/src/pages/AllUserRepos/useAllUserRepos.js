import moment from 'moment';
import { useState } from 'react';
import { fetchAllUserRepos } from '../../requests/requests';

const useAllUserRepos = () => {
	const [token, setToken] = useState('');
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);
	const [renderCharts, setRenderCharts] = useState(false);

	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);

	const convertData = (responseData) => {
		const result = [];
		responseData.forEach((view) => {
			const countData = [];
			view.views.forEach((viewData) => {
				countData.push({
					name: new Date(viewData.timestamp).toLocaleDateString(),
					count: viewData.count,
					unique: viewData.unique
				});
			});

			result.push([countData, view.url]);
		});

		return result;
	};

	const submitToken = () => {
		const s = start ? moment(start).format('YYYY-MM-DD') : null;
		const e = end ? moment(end).format('YYYY-MM-DD') : null;

		fetchAllUserRepos(token, s, e)
			.then((response) => {
				setRenderCharts(true);
				setData(convertData(response.data));
			})
			.catch((error) => {
				setError(error);
			});
	};

	const backButton = () => {
		setRenderCharts(false);
	};

	return {
		token,
		setToken,
		error,
		submitToken,
		data,
		renderCharts,
		backButton,
		start,
		setStart,
		end,
		setEnd
	};
};

export default useAllUserRepos;
