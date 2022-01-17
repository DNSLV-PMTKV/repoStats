import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Authenticate from './pages/Authenticate/Authenticate';
import MyCharts from './pages/MyCharts/MyCharts';

const App = () => {
	return (
		<React.Fragment>
			<Layout>
				<Routes>
					<Route exact path='/' element={<Authenticate />} />
					<Route path='/charts' element={<MyCharts />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</Layout>
		</React.Fragment>
	);
};

export default App;
