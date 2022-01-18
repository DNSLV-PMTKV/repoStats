import { useState } from 'react';
import { createUser } from '../../requests/requests';

const useAuthenticate = () => {
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);

	const validateEmail = () => {
		const regex = /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,5}$/;

		if (!regex.test(value)) {
			setError({ error: 'Enter valid email.' });
			return false;
		}
		return true;
	};

	const submitEmail = () => {
		if (!validateEmail()) {
			return;
		}

		createUser(value)
			.then((response) => {
				localStorage.setItem('token', response.data.token);

				window.location.reload(false);
			})
			.catch((error) => {
				setError(error.response.data);
			});
	};
	return {
		value,
		setValue,
		submitEmail,
		error
	};
};

export default useAuthenticate;
