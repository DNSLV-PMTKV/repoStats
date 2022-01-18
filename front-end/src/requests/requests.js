import axios from 'axios';

export const createUser = (value) => {
	return axios.post('http://127.0.0.1:8000/api/users/create', { email: value });
};

export const addRepo = (value) => {
	const token = localStorage.getItem('token');
	const headers = {
		'X-API-TOKEN': `${token}`
	};
	return axios.post('http://127.0.0.1:8000/api/repos/create', { url: value }, { headers: headers });
};

export const listRepos = () => {
	const token = localStorage.getItem('token');
	const headers = {
		'X-API-TOKEN': `${token}`
	};
	return axios.get('http://127.0.0.1:8000/api/repos', { headers: headers });
};

export const detailRepo = (id) => {
	const token = localStorage.getItem('token');
	const headers = {
		'X-API-TOKEN': `${token}`
	};
	return axios.get(`http://127.0.0.1:8000/api/repos/${id}`, { headers: headers });
};

export const validateToken = (token) => {
	return axios.post('http://127.0.0.1:8000/api/users/token-check', { token: token });
};

export const fetchSingleUserRepo = (token, repoId) => {
	return axios.get(`http://127.0.0.1:8000/api/users/${token}/repos/${repoId}`);
};
