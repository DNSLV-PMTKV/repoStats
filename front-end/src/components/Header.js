import React from 'react';
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

const Header = () => {
	return (
		<HeaderBar>
			<Heading>Repo Stats</Heading>
		</HeaderBar>
	);
};

export default Header;
