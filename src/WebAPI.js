import { getAuthToken } from './utils'

const Base_URL = 'https://student-json-api.lidemy.me'

export const getPosts = () => {
	return fetch(`${Base_URL}/posts?_sort=createdAt&_order=desc`).then(res => res.json())
}

export function login(username, password) {
	return fetch(`${Base_URL}/login`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			username,
			password
		})
	})
		.then(res => res.json())
}

export function getMe() {
	const token = getAuthToken()
	return fetch(`${Base_URL}/me`, {
		headers: {
			'authorization': `Bearer ${token}`
		}
	}).then(res => res.json())
}

export function userPost(title, body) {
	const token = getAuthToken()
	return fetch(`${Base_URL}/posts`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'authorization': `Bearer ${token}`
		},
		body: JSON.stringify({
			title,
			body
		})
	})
		.then(res => res.json())
}