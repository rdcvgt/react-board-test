import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const API_Endpoint = 'https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc'

const Page = styled.div`
	width : 400px;
	margin: 0 auto;
`
const Title = styled.h1`
	color: #333;
`

const MessageForm = styled.form`
	margin-top: 16px;
`

const MessageTextArea = styled.textarea`
	display: block;
	width: 100%;
`


const SubmitBtn = styled.button`
	margin-top:8px;
`

const MessageList = styled.div`
	margin-top:16px;
`

const MessageContainer = styled.div`
	border: 1px solid black;
	padding: 8px 16px;
	border-radius: 8px;
	word-wrap:break-word;

	& + &{
		margin-top:8px;
	}
`
const MessageHead = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 5px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`

const MessageAuthor = styled.div`
	color: rgba(23, 78, 55, 0.3)
	font-size: 14px;
`

const MessageTime = styled.div``

const MessageBody = styled.div`
	margin-top: 16px;
	font-size: 16px;
`

const ErrMessage = styled.div`
	margin-top: 16px;
	color: red;
`

const Loading = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	font-size: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
`

function Message({ author, time, children }) {
	return (
		<MessageContainer>
			<MessageHead>
				<MessageAuthor>{author}</MessageAuthor>
				<MessageTime>{time}</MessageTime>
			</MessageHead>
			<MessageBody>{children}</MessageBody>
		</MessageContainer>
	)
}

Message.propTypes = {
	author: PropTypes.string,
	time: PropTypes.string,
	children: PropTypes.node,
}

function App() {
	const [messages, setMessages] = useState(null)
	const [messageApiError, setMessageApiError] = useState(null)
	const [value, setValue] = useState("")
	const [postMessageError, setPostMessageError] = useState()
	const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false)

	const fetchMessages = () => {
		return fetch(API_Endpoint)
			.then(res => res.json())
			.then(data => {
				setMessages(data)
			})
			.catch(err => {
				setMessageApiError(err)
			})
	}

	const handleTextareaChange = (e) => {
		setValue(e.target.value)
	}

	const handleTextareaFocus = () => {
		setPostMessageError(null)
	}

	const handleSubmitChange = (e) => {
		e.preventDefault();
		if (isLoadingPostMessage) {
			return
		}
		setIsLoadingPostMessage(true)
		fetch('https://student-json-api.lidemy.me/comments', {
			method: 'POST',
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				nickname: "finley",
				body: value,
			}),
		})
			.then(res => res.json())

			.then(data => {
				setIsLoadingPostMessage(false)
				if (data.ok === 0) {
					setPostMessageError(data.message)
					return
				}
				setValue("")
				fetchMessages()
			}).catch(err => {
				setIsLoadingPostMessage(false)
				setPostMessageError(err.message)
			})
	}
	useEffect(() => {
		fetchMessages()
	}, [])

	return (
		<Page>
			{isLoadingPostMessage && <Loading>Loading...</Loading>}
			<Title>留言板</Title>
			<MessageForm onSubmit={handleSubmitChange}>
				<MessageTextArea
					value={value}
					onChange={handleTextareaChange}
					onFocus={handleTextareaFocus}
					rows={10}
				/>
				<SubmitBtn>送出留言</SubmitBtn>
				{postMessageError && (
					<ErrMessage>
						something went wrong. {postMessageError.toString()}
					</ErrMessage>
				)}
			</MessageForm>
			{messageApiError && (
				<ErrMessage>
					something went wrong. {messageApiError.toString()}
				</ErrMessage>
			)}
			{messages && messages.length === 0 && <div>No message</div>}
			<MessageList>
				{messages &&
					messages.map(messages => (
						<Message
							key={messages.id}
							author={messages.nickname}
							time={new Date(messages.createdAt).toLocaleString()}>
							{messages.body}
						</Message>
					))}

			</MessageList>
		</Page>

	)
}



export default App;
