import React from 'react';
import useRepoDetail from './useRepoDetail';
import styled from 'styled-components';
import Chart from '../../components/Chart';

const SBox = styled.div`
	margin: auto;
	margin-top: 50px;
	height: inherit;
`;

const RepoDetail = () => {
	const { data, repo } = useRepoDetail();

	return (
		<SBox>
			<Chart data={data} repo={repo} />
		</SBox>
	);
};

export default RepoDetail;
