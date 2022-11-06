import './App.css';
import { TodoItem } from './todoitem'
import React, { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react'
import PropTypes from 'prop-types';

function writeTodosToLocalStorage(todos) {
	if (todos.length !== 0) {
		window.localStorage.setItem("todos", JSON.stringify(todos))
	}
}


function Test({ sty }) {
	console.log('test render')
	return <div style={sty}>test</div>
}

// const s = { color: 'red' }

function App() {
	const id = useRef(1)
	const [todos, setTodos] = useState(() => {
		let todoData = (window.localStorage.getItem("todos") || "")
		if (todoData) {
			todoData = JSON.parse(todoData)
			id.current = todoData[0].id + 1
		} else {
			todoData = []
		}
		return todoData
	})
	const [value, setValue] = useState("")


	useEffect(() => {
		writeTodosToLocalStorage(todos)
		//clean up function
		return () => {
		}
	}, [todos])

	const handleInputChange = (e) => {
		setValue(e.target.value)
	}

	const handleButtonClick = useCallback(() => {
		console.log(value)
		setTodos([{
			id: id.current, content: value
		}, ...todos])
		setValue('')
		id.current++
	}, [todos, value])

	const handleDeleteTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id))
	}

	const handleToggleIsDone = id => {
		setTodos(todos.map((todo) => {
			if (todo.id !== id) return todo
			return {
				...todo,
				isDone: !todo.isDone
			}
		})
		)
	}

	const sty = useMemo(() => {
		return {
			color: value ? 'red' : 'blue'
		}
	}, [value])

	return (
		<div className="App">
			<Test style={sty}></Test>
			<input type="text" placeholder='todo' value={value} onChange={handleInputChange} />
			<button onClick={handleButtonClick}>Add todo</button>
			{
				todos.map((todo) => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)
			}
		</div>
	);
}



export default App;

Test.proTypes = {
	sty: PropTypes.func
}