import { Box, Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Chart from '../../components/Chart';
import useAllUserRepos from './useAllUserRepos';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';

const SBox = styled.div`
	height: 100%;
	margin: auto;
`;

const Spacer = styled.div`
	margin-top: ${(props) => (props.space ? props.space : '100px')};
`;

const BBox = styled.div`
	max-width: 400px;
	margin: auto;
`;

const AllUserRepos = () => {
	const { token, setToken, submitToken, data, renderCharts, backButton, error, start, setStart, end, setEnd } =
		useAllUserRepos();

	const searchBox = (
		<BBox>
			<Card variant='outlined' sx={{ padding: '10px' }}>
				<CardContent>
					<Typography sx={{ textAlign: 'center', marginBottom: '1em' }} variant='h5'>
						Repository by token
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
						<Button variant='contained' size='large' fullWidth onClick={submitToken}>
							Fetch
						</Button>
					</Box>
				</CardContent>
			</Card>
		</BBox>
	);
	console.log(`object`, data);

	const chart = (
		<SBox>
			{data.map((repo, i) => {
				return repo[0].length ? (
					<>
						{i !== 0 ? <Spacer /> : null}
						<Chart data={repo[0]} repo={repo[1]} />
					</>
				) : null;
			})}
			<Box marginRight={'auto'} marginTop={'2em'} width={'75%'}>
				<Button variant='contained' size='large' onClick={backButton}>
					Back
				</Button>
			</Box>
		</SBox>
	);

	return <>{renderCharts ? chart : searchBox}</>;
};

export default AllUserRepos;
