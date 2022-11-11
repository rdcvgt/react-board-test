import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import PostPage from '../../pages/PostPage'
import Header from '../Header'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContext } from '../../contexts'
import { getMe } from '../../WebAPI'
import { getAuthToken } from '../../utils'
import UserPostPage from '../../pages/UserPostPage'


const Root = styled.div`
	padding-top: 64px;
`

export default function App() {
	const [user, setUser] = useState(null)
	useEffect(() => {
		if (getAuthToken()) {
			getMe().then(res => {
				if (res.ok) {
					setUser(res.data)
				}
			})
		}
	}, [])

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<Root>
				<Router>
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path='/post/:postId' element={<PostPage />} />
						<Route path='/new-post' element={<UserPostPage />} />
					</Routes>
				</Router>
			</Root>
		</AuthContext.Provider>
	)
}


