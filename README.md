# useEffect

## Learning Objectives

At the end of this lesson, students will be able to:

- Understand the rough basics of the component lifecycle and its associated methods
- Explain the use case (what and why) of the `useEffect` hook
- Use `useEffect` to perform "side effects" in function components

## Intro

Once upon a time, in an internet far, far away, if you wanted to build stateful components in React, you had no choice but to use class components. Function components had no way to set or track state, and so they were strictly presentational - they sat around looking pretty, waiting for class components to do all the heavy lifting, before receiving data as props and putting that on the page.

This obviously worked, or else React wouldn't have lasted, but it quickly became clear that this wasn't exactly what you'd call _ideal_. Most developers find class components more complex to write and grasp than function components, function components are more concise than their class counterparts, and functions are just plain easier for tooling and testing than classes.

### A Brief Overview Of The Component Lifecycle (Or: Thank Your Lucky Stars It's Not Like This Anymore)

We're not going to go into much detail here, because we are fortunate enough to _not_ live once upon a time in an internet far, far away, but it's important to know the history. It's good to be able to talk about it in interviews, and to understand just how much better we have it now.

We already know that changing state in a component triggers a re-render, and that we can, in turn, trigger those state changes when our users interact with our UI. But sometimes we want to execute logic without needing to wait for a button to be clicked. Can you imagine needing to click a button before Facebook grabs your information from its server and builds out your feed? Of course not. That would be a terrible user experience.

Class components provide several lifecycle methods that you can use to control your application based on the state of the UI. They're a prepackaged part of every class component that are called at specific points in the rendering process. You can use them to perform actions based on what's happening on the DOM.

There are three types of component lifecycle methods:

- **Mounting** - occurs when the component is initially mounted, in this order:
  
  - [`constructor`](https://reactjs.org/docs/react-component.html#constructor) 
  - [`getDerivedStateFromProps`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
  - [`render`](https://reactjs.org/docs/react-component.html#render)
  - [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount)

- **Updating** - occurs when a component is updated, in this order:

  - [`getDerivedStateFromProps`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
  - [`shouldComponentUpdate`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)
  - [`render`](https://reactjs.org/docs/react-component.html#render)
  - [`getSnapshotBeforeUpdate`](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)
  - [`componentDidUpdate`](https://reactjs.org/docs/react-component.html#componentdidupdate)

- **Unmounting** - occurs when the component is removed from DOM:

  - [`componentWillUnmount`](https://reactjs.org/docs/react-component.html#componentwillunmount)

If that seems like a lot, that's because it is! And it's not even all of them!! Check out an interactive flowchart that includes some less common lifecycle methods [here](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) if you feel like being stressed out.

### `useEffect` And Other Hooks

Starting with React version 16.8, the team added [hooks](https://reactjs.org/docs/hooks-intro.html) to the library, and there was much rejoicing. Instead of having a small village's worth of methods taking up computing power in your stateful components regardless of whether or not you even use them, the introduction of hooks allows us to have precise control over all the logic in our components, and when that logic executes.

It's better.

You're already familiar with `useState`, which does a lot of work to make function components just as, well, _functional_ as class components, but it doesn't quite get us all the way there. There are a handful of other hooks built in to React nowadays, but today we're just going to be focusing on `useEffect` - a heavy hitter that can be set up to take the place of _three_ different lifecycle methods, firing when the component mounts, when it undergoes a state change, and just before it unmounts.

## Set Up

- Fork and clone this repo
- Open the included boilerplate React application in VS Code
- Install dependencies
- Start your server

## Meet The Backend

You thought you were done with todos? You're never done with todos. But this time we'll be working with a pre-made backend, located at `https://todos-1011.herokuapp.com/`. Here is a summary of its available routes:

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

## Load Backend Data (We Do)

Now that we've got our accounts and our todos and the very vaguest idea of what `useEffect` does, let's mash these together. Go ahead and gut the boilerplate code in `App.js` and `App.css`, and then let's get started with writing a function that will handle our API call and just log the response to the console.

```JSX
import './App.css';
import axios from 'axios';

const baseUrl = `https://todos-1011.herokuapp.com/accounts/{YOUR_KEY_HERE}/todos`

function App() {

  const loadTodos = async () => {
    try {
      const response = await axios.get(baseUrl);
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <button onClick={loadTodos}>Load Todos</button>
    </div>
  )
}

export default App;
```

Okay, that's great and all, but we've already gone over the fact that using buttons to make API calls is less than ideal, to put it mildly. If only there was another way! If only that other way was the whole point of this lesson!

Let's make some changes:

```JSX
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

const baseUrl = `https://todos-1011.herokuapp.com/accounts/{YOUR_KEY_HERE}/todos`

function App() {

  const loadTodos = async () => {
    try {
      const response = await axios.get(baseUrl);
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTodos();
  })

  return (
    <div className="App">
      <h1>To Do List</h1>
    </div>
  )
}

export default App;
```

`useEffect` takes a callback function as its first and only _required_ argument. This can be either named or anonymous, but React gets fussy about async functions in `useEffect` - which is why we're calling our named asynchronous `loadTodos` function inside the hook's anonymous callback.

Save your component and open the dev tools in your browser, and you should see your array of todos printed to the console without requiring the hard, hard work of clicking a button.

From here it's a simple matter of shoving that data into state and moving on with our lives as usual, right?

Right?

No better way to find out than to try it!

```JSX
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = `https://todos-1011.herokuapp.com/accounts/{YOUR_KEY_HERE}/todos`

function App() {
  const [allTodos, setAllTodo] = useState([]);

  const loadTodos = async () => {
    try {
      const response = await axios.get(baseUrl);
      console.log("Saving todos to state");
      setAllTodos(response.data.todos);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTodos();
  })

  return (
    <div className="App">
      <h1>To Do List</h1>
    </div>
  )
}

export default App;
```

Oh god. Oh no. Somebody make it stop. Why won't it stop. What's happening.

**By default, `useEffect`'s callback function is going to be invoked after every render of the component.** And components rerender whenever they detect a state change. So the component mounts, renders, then makes the API call, sets state, re-renders, makes the API call, sets state, re-renders, makes the API call, over and over and over again, and we fall to our knees and thank any higher power we believe in that the API we're working with is free, or else this could get pricey.

So what do we do? This seems like a _major_ design flaw.

Fortunately, `useEffect` can accept a second argument, called a dependency array. It holds a list of dependencies - variables and/or object properties that causes the effect to run only if at least one of the dependencies change their value.

```JSX
useEffect(() => {
    loadTodos();
  }, [])
```

Providing an empty array, like you see here, will result in the effect only running after the initial render. We can safely set state within our effect without getting stuck in an infinite loop!

Now let's go ahead and put the information in state on the page. This will be very similar to your deliverable last night.

## Filter Todos (You Do)

Time for you to flex your new muscles! In breakout rooms, you'll be adding the ability to filter your todos. Your user should be able to type into an input, and only see todo items that contain their search term rendered on the page. This filter should happen automatically as they type, without requiring a button click.

<details>
  <summary>Need a hint?</summary>
  <ul>
    <li>Create a search bar</li>
    <li>Create a piece of state for managing your search term</li>
    <li>Create another piece of state for filtered todos</li>
    <li>Make a <code>filterTodos</code> function</li>
    <li>Connect <code>filterTodos</code> to the search bar with <code>useEffect</code> (requires search term in dependency array)</li>
    <li>Pass filtered todos (instead of all todos) to list component</li>
    <li><code>setFilteredTodos</code> to all todos on load</li>
  </ul>
</details>

## Make This App Actually Useful (Stretch) (You Do)

Not much point to a to do list if you can't mark items as complete, or add new tasks to your list.

- Create a form that allows your user to add a todo to the database
- Add a button to each todo item that, when clicked, updates its completion status to true in the database
- Display an indicator or change styling for completed todos to set them apart from tasks still to be finished
