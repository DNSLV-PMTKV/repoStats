import { Button, Card, CardContent, Divider, TextField, Typography, Box } from '@mui/material';

import React from 'react';
import styled from 'styled-components';
import useAddRepo from './useAddRepo';

const SBox = styled.div`
	max-width: 400px;
	margin: auto;
	margin-top: 100px;
`;

const AddRepo = () => {
	const { value, setValue, submitData, error } = useAddRepo();
	return (
		<SBox>
			<Card variant='outlined' sx={{ padding: '10px' }}>
				<CardContent>
					<Typography sx={{ textAlign: 'center', marginBottom: '1em' }} variant='h5'>
						Add repository
					</Typography>
					<Divider sx={{ textAlign: 'center', marginBottom: '1em' }} />
					<TextField
						sx={{ width: '100%', marginBottom: '1em' }}
						id='outlined-basic'
						label='Repository url'
						variant='outlined'
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					{error ? (
						<Box sx={{ marginBottom: '1em' }}>
							<Typography color='red' variant='body'>
								{error.error}
							</Typography>
						</Box>
					) : null}
					<Box marginLeft={'auto'} marginRight={'auto'} width={'75%'}>
						<Button variant='contained' size='large' fullWidth onClick={submitData}>
							Add
						</Button>
					</Box>
				</CardContent>
			</Card>
		</SBox>
	);
};

export default AddRepo;
