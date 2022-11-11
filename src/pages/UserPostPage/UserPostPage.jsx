import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { getMe, userPost } from '../../WebAPI'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts'

const ErrorMessage = styled.div`
	color: red;
`

export default function App() {
	const { setUser } = useContext(AuthContext)
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const [errorMessage, setErrorMessage] = useState()
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault();
		getMe().then(res => {
			if (res.ok !== 1) {
				navigate('/login')
			}
			setUser(res.data)

			setErrorMessage(null)
			if (!title || !body) {
				return setErrorMessage("欄位不得爲空")
			}
			userPost(title, body)
				.then(res => {
					console.log(res)
					if (res.ok === 0) {
						setErrorMessage(res.message)
					}
					navigate(`/post/${res.id}`)
				})

		}).catch(err => console.log(err))
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				title:{" "}
				<input value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			<div>
				body:{" "}
				<input type="textarea" value={body} onChange={(e) => setBody(e.target.value)} />
			</div>
			<button>發佈文章</button>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</form>

	)
}

