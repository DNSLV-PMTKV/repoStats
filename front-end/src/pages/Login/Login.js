import { Button, Card, CardContent, Divider, TextField, Typography, Box } from '@mui/material';

import React from 'react';
import styled from 'styled-components';
import useLogin from './useLogin';

const SBox = styled.div`
	max-width: 400px;
	margin: auto;
	margin-top: 100px;
`;

const Login = () => {
	const { value, setValue, submitEmail, error } = useLogin();

	return (
		<SBox>
			<Card variant='outlined' elevation={10} sx={{ padding: '10px' }}>
				<CardContent>
					<Typography sx={{ textAlign: 'center', marginBottom: '1em' }} variant='h5'>
						Login with token
					</Typography>
					<Divider sx={{ textAlign: 'center', marginBottom: '1em' }} />
					<TextField
						sx={{ width: '100%', marginBottom: '1em' }}
						id='outlined-basic'
						label='Token'
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
						<Button variant='contained' size='large' fullWidth onClick={submitEmail}>
							Login
						</Button>
					</Box>
				</CardContent>
			</Card>
		</SBox>
	);
};

export default Login;
