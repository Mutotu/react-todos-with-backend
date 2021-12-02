const TodoItem = (props) => {
  const {todo, toggleCompletion} = props
  return (
    <li>
      {todo.description}
      <button onClick={() => toggleCompletion(todo)}>
        {
          todo.completed 
          ? 
          "Mark Incomplete"
          :
          "Mark Complete"
        }
      </button>
    </li>
  )
}

export default TodoItem;