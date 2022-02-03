const TodoList = (props) => {
  const listItems = () => {
    return props.allTodos.map((todo) => {
      //   console.log(todo);
      return <li key={todo._id}>{todo.description}</li>;
    });
  };

  return (
    <>
      <ul>{listItems()}</ul>
    </>
  );
};

export default TodoList;
