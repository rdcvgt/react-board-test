import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getPosts } from '../../WebAPI'  //1. 引入檔案
import { Link } from "react-router-dom";


const Root = styled.div`
	width: 80%;
	margin: 0 auto;
`

const PostContainer = styled.div`
	border-bottom: 1px solid rgba(0, 12, 34, 0.2);
	padding: 16px;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
`

const PostTitle = styled(Link) `
	font-size: 18px;
	color: #333;
	text-decoration: none;
`
const PostDate = styled.div`
	color:rgba(0,0,0,0.8);
`


function Post({ post }) {   //5.建立 Post 文章區
	return (
		<PostContainer>
			<PostTitle to={`/post/${post.id}`} >{post.title}</PostTitle>
			<PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
		</PostContainer>
	)
}

Post.propTypes = {    //6. 傳入的屬性，需建立屬性型態設定 ESLint
	post: PropTypes.object
}

export default function App() {
	const [posts, setPosts] = useState([])   //2. 建立 posts 的 state

	useEffect(() => {   //3. 使用 useEffect ，呼叫函式撈取資料，並傳入 posts 的 state
		getPosts().then(posts => setPosts(posts))
	}, [])  //僅在初次 render 時執行

	return (
		<Root>
			{posts.map(post => (  //4. 使用 map 遍歷 posts並且回傳 Post component
				<Post post={post} key={post.id} />   //傳入 post 屬性，POST 爲文章區切版
			))}
		</Root>

	)
}


