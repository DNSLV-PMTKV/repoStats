import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderBar = styled.header`
	width: 100%;
	padding: 0.5em 1.5em;
	display: flex;
	height: 50px;
	position: fixed;
	align-items: center;
	background-color: #fff;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
	z-index: 1;
`;

const Heading = styled.h1`
	text-transform: uppercase;
	letter-spacing: 2px;
`;

const Logout = styled.h2`
	text-transform: uppercase;
	margin-left: auto;
	cursor: pointer;
	margin-right: 1.5em;
`;

const Header = () => {
	const navigation = useNavigate();
	return (
		<HeaderBar>
			<Heading>Repo Stats</Heading>
			{localStorage.getItem('token') ? (
				<Logout
					onClick={() => {
						localStorage.removeItem('token');
						navigation('/');
						window.location.reload(false);
					}}
				>
					Logout
				</Logout>
			) : null}
		</HeaderBar>
	);
};

export default Header;
