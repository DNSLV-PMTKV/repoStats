import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
	padding: 1em;
	background: #eee;
	@media (max-width: 700px) {
		padding-top: 80px;
	}
	@media (min-width: 700px) {
		position: fixed;
		width: 220px;
		height: calc(100% - 64px);
		overflow-y: hidden;
	}
`;
const NavList = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	line-height: 2;
	a {
		text-decoration: none;
		font-weight: bold;
		font-size: 1em;
		color: #333;
	}
	a:visited {
		color: #333;
	}
	a:hover,
	a:focus {
		color: #0077cc;
	}
`;
const Navigation = () => {
	const authenticated = localStorage.getItem('token');

	return (
		<Nav>
			<NavList>
				{authenticated ? (
					<>
						<li>
							<Link to='/repos'>My Repos</Link>
						</li>
						<li>
							<Link to='/add-repo'>Add Repo</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to='/'>Create Account</Link>
						</li>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/single-repo'>Single user repository</Link>
						</li>
						<li>
							<Link to='/all-repos'>All user repositories</Link>
						</li>
					</>
				)}
			</NavList>
		</Nav>
	);
};
export default Navigation;
