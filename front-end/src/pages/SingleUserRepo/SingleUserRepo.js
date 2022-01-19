import { Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';
import Chart from '../../components/Chart';
import useSingleUserRepo from './useSingleUserRepo';

import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';

const SBox = styled.div`
	height: inherit;
	margin: auto;
	margin-top: 100px;
`;

const BBox = styled.div`
	max-width: 400px;
	margin: auto;
	margin-top: 100px;
`;

const Spacer = styled.div`
	margin-top: ${(props) => (props.space ? props.space : '100px')};
`;

const SingleUserRepo = () => {
	const {
		token,
		repoId,
		setToken,
		setRepoId,
		submitData,
		renderTable,
		chartData,
		repoName,
		backButton,
		error,
		start,
		end,
		setStart,
		setEnd
	} = useSingleUserRepo();

	const searchBox = (
		<BBox>
			<Card variant='outlined' elevation={10} sx={{ padding: '10px' }}>
				<CardContent>
					<Typography sx={{ textAlign: 'center', marginBottom: '1em' }} variant='h5'>
						Get single user repository
					</Typography>
					<Divider sx={{ textAlign: 'center', marginBottom: '1em' }} />
					<TextField
						sx={{ width: '100%', marginBottom: '1em' }}
						id='outlined-basic'
						label='Token'
						variant='outlined'
						value={token}
						onChange={(e) => setToken(e.target.value)}
					/>
					<TextField
						sx={{ width: '100%', marginBottom: '1em' }}
						id='outlined-basic'
						label='Repository ID'
						variant='outlined'
						value={repoId}
						onChange={(e) => setRepoId(e.target.value)}
					/>
					<LocalizationProvider dateAdapter={DateAdapter}>
						<DatePicker
							label='start'
							value={start}
							onChange={(newValue) => {
								setStart(newValue);
							}}
							renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
						/>
						<Spacer space='1em' />
						<DatePicker
							label='end'
							value={end}
							onChange={(newValue) => {
								setEnd(newValue);
							}}
							renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
						/>
						<Spacer space='1em' />
					</LocalizationProvider>
					{error ? (
						<Box sx={{ marginBottom: '1em' }}>
							<Typography color='red' variant='body'>
								{error.error}
							</Typography>
						</Box>
					) : null}
					<Box marginLeft={'auto'} marginRight={'auto'} width={'75%'}>
						<Button variant='contained' size='large' fullWidth onClick={submitData}>
							Fetch
						</Button>
					</Box>
				</CardContent>
			</Card>
		</BBox>
	);

	const chart = (
		<SBox>
			<Chart data={chartData} repo={repoName} />
			<Box marginRight={'auto'} marginTop={'2em'} width={'75%'}>
				<Button variant='contained' size='large' onClick={backButton}>
					Back
				</Button>
			</Box>
		</SBox>
	);

	return <>{renderTable ? chart : searchBox}</>;
};

export default SingleUserRepo;
