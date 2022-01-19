import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddRepo from './pages/AddRepo/AddRepo';
import AllUserRepos from './pages/AllUserRepos/AllUserRepos';
import Authenticate from './pages/Authenticate/Authenticate';
import Login from './pages/Login/Login';
import MyRepos from './pages/MyRepos/MyRepos';
import RepoDetail from './pages/RepoDetail/RepoDetail';
import SingleUserRepo from './pages/SingleUserRepo/SingleUserRepo';

const App = () => {
	return (
		<React.Fragment>
			<Layout>
				<Routes>
					<Route exact path='/' element={<Authenticate />} />
					<Route exact path='/login' element={<Login />} />
					<Route path='/add-repo' element={<AddRepo />} />
					<Route path='/repos' element={<MyRepos />} />
					<Route path='/repos/:repoId' element={<RepoDetail />} />
					<Route exact path='/single-repo' element={<SingleUserRepo />} />
					<Route exact path='/all-repos' element={<AllUserRepos />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</Layout>
		</React.Fragment>
	);
};

export default App;
