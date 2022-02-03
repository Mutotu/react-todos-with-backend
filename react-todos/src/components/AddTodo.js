import { useState, useEffect } from "react";

const AddTodos = (props) => {
  const [add, setAdd] = useState("");

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          value={props.addTodo}
          placeholder='add todos'
          onChange={(e) => {
            props.setAddTodo(e.target.value);
          }}
        />
        <button
          onClick={() => {
            props.setAddTodo(props.addTodo);
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodos;
