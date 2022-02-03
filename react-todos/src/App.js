import { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import AddTodos from "./components/AddTodo";
import "./App.css";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [addTodo, setAddTodo] = useState("");

  const loadTodos = async () => {
    const baseUrl = `https://todos-1011.herokuapp.com/accounts/61a91fc2ccafe468f8605d2a/todos`;
    try {
      const response = await axios.get(baseUrl);
      setAllTodos(response.data.todos);
      // console.log(response);
      setFiltered(response.data.todos);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodos = async () => {
    const description = addTodo;
    console.log(description);
    try {
      return await axios.post(
        `https://todos-1011.herokuapp.com/accounts/61a91fc2ccafe468f8605d2a/todos`,
        {
          // account: "61a91fc2ccafe468f8605d2a",
          description: description,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filterTodos = () => {
    const filteredList = allTodos.filter((todo) => {
      return todo.description
        .toLowerCase()
        .includes(search.toLocaleLowerCase());
    });
    setFiltered(filteredList);
  };

  //useEffect requieres at least one callfunciton
  useEffect(() => {
    loadTodos();
    //incluce [] as second argument so that it only runs once and when change happens, useEffect gets triggered and rerenders
  }, []);

  useEffect(filterTodos, [search]);
  useEffect(() => {
    addTodos();
    console.log(addTodo);
  }, [addTodo]);
  return (
    <div className='App'>
      <h1>To Do List</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <TodoList allTodos={filtered} />
      <AddTodos addTodo={addTodo} setAddTodo={setAddTodo} />
    </div>
  );
}

export default App;
