# useEffect

`useEffect` is a key React tool that lets us run whatever code we want when one of our components is first loaded, or undergoes a state change. We will use it in two main ways today: to load data from a backend, and to filter our search results when the user types in a searchbar.

## Setting up our backend

We will be working with a pre-made backend today. It can be found at `https://todos-1011.herokuapp.com/`. Here is a summary of its available routes:

|VERB|ROUTE|EFFECT|
|----|-----|------|
|`GET` | `/` | Confirms that the app is working  |
|`POST`|`/accounts` | Makes you your own account (so that your todos don't get mixed up with your classmates). Save the key that you get in the response!   |
|`GET`| `/accounts/:key/todos`  | Lists all todos associated with your account |
|`POST`| `/accounts/:key/todos`  | Creates a new todo using the `"description"` from the request body. `"completed"` gets set to false. |
|`PUT`| `/accounts/:key/todos/:id`  | Updates the specified todo according to the body of the request   |
|`PUT`| `/accounts/:key/todos/reset`  | Sets all your todos to `completed: false`  |
|`DELETE`| `/accounts/:key/todos/:id` | Deletes the specified todo |

Use postman to create an account. The key that you get back will effectively become part of your base url for this project. Note that your account comes pre-seeded with some todos.

## Goal 1: Load backend data

- `yarn add axios`
- write a function loadTodos to load todos into state
- useEffect with loadTodos, look at our state in inspector
- put a log into loadTodos, see that it is looping
- put [] into useEffect to stop the loop
- pass our todos state into a TodoList component that displays them
- use db id as key

## Goal 2: Filtering our todos

- create a search bar
- get the search bar wired up as a controlled input in App.js, look at its piece of state in inspector
- move the search bar into a separate component
- need new piece of state for filtered todos, this will get passed into list
- make a filterTodos function, we will wire it up to the search bar next
- wire filterTodos up to the search bar with useEffect
- this useEffect must depend on the searchTerm
- note that the filteredTodos state changes in inspector
- pass filteredTodos (instead of todos) into TodoList
- setFilteredTodos to all todos on load

## Goal 3 (stretch): Marking todos as done

- give each todo a button
- onClick, make a PUT request
- upgrade detour: put baseUrl into a constant file
- after button is clicked, need to reload todos in top-level component
- define a function in top level component that handles this, and pass it into TodoList as a prop
- it should be really similar to the initial load, can we reuse a function here?
- call the reloadTodos function after the put is finished
- might want to order by id to avoid shuffling the todos
- improvement: use a shouldReloadTodos state in top level

## Goal 4 (stretch): implement stretch from last night's todos HW

- create a new todo: when the form is submitted, it should POST to the backend, then reload todos
- sort by done/not done, either in 1 list or 2 lists
