import { useState } from 'react';
import { addRepo } from '../../requests/requests';

const useAddRepo = () => {
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);

	const submitData = () => {
		addRepo(value)
			.then(() => {
				setValue('');
			})
			.catch((error) => {
				setError(error.response.data);
			});
	};
	return {
		value,
		setValue,
		submitData,
		error
	};
};

export default useAddRepo;
