import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import styled from 'styled-components';

const Wrapper = styled.div`
	@media (min-width: 700px) {
		display: flex;
		top: 64px;
		position: relative;
		height: calc(100% - 64px);
		width: 100%;
		flex: auto;
		flex-direction: column;
	}
`;
const Main = styled.main`
	position: fixed;
	height: calc(100% - 185px);
	width: calc(100% - 220px);
	padding: 2em;
	overflow-y: hidden;
	@media (min-width: 700px) {
		flex: 1;
		margin-left: 260px;
		height: calc(100% - 64px);
		width: calc(100% - 260px - 4em);
	}
`;

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<Header />
			<Wrapper>
				<Navigation />
				<Main>{children}</Main>
			</Wrapper>
		</React.Fragment>
	);
};

export default Layout;
