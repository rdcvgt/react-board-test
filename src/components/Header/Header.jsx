import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts'
import { setAuthToken } from '../../utils'

const HeaderContainer = styled.div`
	height: 64px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2) ;
	padding: 0 32px;
	box-sizing: border-box;
	backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(255,255,255,0.7);
`
const Brand = styled.div`
	font-size: 24px;
	font-weight: 700;
`

const NavbarList = styled.div`
	display: flex;
	align-items:center;
	height: 64px;
`
const Nav = styled(Link) `
	display: flex;
	justify-content: center;
	align-items:center;
	height: 64px;
	width: 100px;
	box-sizing: border-box;
	cursor: pointer;
	color: black;
	text-decoration: none;

	&:hover{
		background-color: rgba(0, 0, 0, 0.1);
	}

	${props =>
		props.$active && `
		background-color: rgba(0, 0, 0, 0.1);
	`}
`

const LeftContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items:center;

	${NavbarList} {
		margin-left: 16px;
	}
`

export default function Header() {
	const location = useLocation()
	const navigate = useNavigate()
	const { user, setUser } = useContext(AuthContext)
	const handleLogout = () => {
		setAuthToken(null)
		setUser(null)
		if (location.path !== '/') {
			navigate('/')
		}
	}
	return (
		<HeaderContainer>
			<LeftContainer>
				<Brand>第一個部落格</Brand>
				<NavbarList>
					<Nav to="/" $active={location.pathname === '/'} >首頁</Nav>
					{user && <Nav to="/new-post" $active={location.pathname === '/new-post'}>發佈文章</Nav>}
				</NavbarList>
			</LeftContainer>
			<div>
				<NavbarList>
					{user && <Nav onClick={handleLogout}>登出</Nav>}
					{!user && <Nav to="/login" $active={location.pathname === '/login'}>登入</Nav>}
				</NavbarList>
			</div>
		</HeaderContainer>
	)
}
