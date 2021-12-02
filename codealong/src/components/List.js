import TodoItem from "./TodoItem"

const List = ({todos, toggleCompletion}) => {
  
  const listItems = () => {
    return todos.map(todo => {
      return (
      <TodoItem 
      key={todo._id} 
      todo={todo}
      toggleCompletion={toggleCompletion}
      />
      )
    })
  }

  return (
    <ul>
      {listItems()}
    </ul>
  )
}

export default List;