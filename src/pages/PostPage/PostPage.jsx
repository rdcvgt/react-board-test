import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getPosts } from '../../WebAPI'  //1. 引入檔案
import { useParams } from "react-router-dom";


const PostContainer = styled.div`
	width: 600px;
	margin: 50px auto;
	
`

const PostTitle = styled.h1`
	padding-bottom: 10px;
	border-bottom: 1px solid #ccc;
`

const PostBody = styled.div`
	line-height: 2em;
`



function PostArea({ post }) {

	return (
		<PostContainer>
			<PostTitle>{post.title}</PostTitle>
			<PostBody>{post.body}</PostBody>
		</PostContainer>
	)
}

PostPage.propTypes = {      //根據最終export 出去的function 來寫 propTypes
	post: PropTypes.object
}

export default function PostPage() {
	let { postId } = useParams()
	let postIdNum = Number(postId)  //網址抓下來的參數爲字串型態
	const [post, setPost] = useState([])

	useEffect(() => {
		getPosts().then(posts => {    //使用 filter，回傳值爲 id 比對相同的文章，輸出爲陣列
			return posts.filter((post) => (post.id === postIdNum))
		})
			.then(post => setPost(post[0]))   //在存入 state 之前就要先把格式處理好
			.catch(err => console.log(err))
	}, [postIdNum])

	return (
		<PostArea post={post}></PostArea>  //傳入 post state（爲物件型態）
	)
}