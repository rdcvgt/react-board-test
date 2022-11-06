import styled from 'styled-components'
import {
	MEDIA_QUERY_MD,
	MEDIA_QUERY_LG
} from './constants/breakpoints.js'
import PropTypes from 'prop-types';

const TodoItemWrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px; 
  border: 1px solid #000000;
`

const TodoContent = styled.div`
  color : ${props => props.theme.color.red_300};
  font-size: 20px;

  ${props => props.size === 'XL' && `
    font-size: 40px;
  `}

  ${props => props.$isDone && `
  text-decoration:line-through;
  `}
  
`
const TodoButtonWrapper = styled.div``

const Button = styled.button`
  padding: 4px;
  color : ${props => props.theme.color.red_200};

  ${MEDIA_QUERY_MD}{
    font-size: 20px;
  };


  ${MEDIA_QUERY_LG}{
    font-size: 30px;
  }
    

  &:hover{
    color:red;
  }
  
  & + &{
    margin-left: 4px;
  }
`

export function TodoItem({
	className,
	size,
	todo,
	handleDeleteTodo,
	handleToggleIsDone
}) {
	const handleTogglerClick = () => {
		handleToggleIsDone(todo.id)
	}

	const handleDeleteClick = () => {
		handleDeleteTodo(todo.id)
	}

	return (
		<TodoItemWrapper className={className} data-todo-id={todo.id}>
			<TodoContent $isDone={todo.isDone} size={size}>{todo.content}</TodoContent>
			<a href={window.encodeURIComponent(todo.content)}>click me </a>
			<TodoButtonWrapper>
				<Button onClick={handleTogglerClick}>{todo.isDone === true ? '未完成' : '已完成'}</Button>
				<Button onClick={handleDeleteClick}>刪除</Button>
			</TodoButtonWrapper>
		</TodoItemWrapper>
	)
}

TodoItem.propTypes = {
	className: PropTypes.string,
	size: PropTypes.string.isRequired,  //可以指定說一定要有這個 props 傳過來
	todo: PropTypes.shape({
		id: PropTypes.number,
		content: PropTypes.string,
		isDone: PropTypes.bool
	}),  //可以定義到 object 中一定包含什麼元素
	handleDeleteTodo: PropTypes.func, //function 適用簡寫 func
	handleToggleIsDone: PropTypes.func,
}