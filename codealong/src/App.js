import './App.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { baseUrl } from './constants';

import List from './components/List';
import Searchbar from './components/Searchbar';

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadTodos = async () => {
    try {
      const response = await axios.get(baseUrl);
      setAllTodos(response.data.todos);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTodos();
  }, [])

  useEffect(() => {
    const filteredList = allTodos.filter(todo => {
      return todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    })
    setFilteredTodos(searchTerm ? filteredList : []);
  }, [searchTerm, allTodos])

  const toggleCompletion = async (todo) => {
    try {
      todo.completed = !todo.completed;
      await axios.put(`${baseUrl}/${todo._id}`, todo);
      loadTodos();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <List todos={searchTerm ? filteredTodos : allTodos} toggleCompletion={toggleCompletion} />
    </div>
  );
}

export default App;
