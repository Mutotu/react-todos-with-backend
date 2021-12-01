const List = ({todos}) => {
  
  const listItems = () => {
    return todos.map((todo) => {
      return (
        <li key={todo._id}>
          {todo.description}
        </li>
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