import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../../requests/requests';

const useLogin = () => {
	const navigation = useNavigate();
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);

	const submitEmail = () => {
		validateToken(value)
			.then((response) => {
				localStorage.setItem('token', value);

				navigation('/repos');
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

export default useLogin;
