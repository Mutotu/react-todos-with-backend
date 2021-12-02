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

We already know that changing state in a component triggers a re-render, and that we can, in turn, trigger those state changes when our users interact with our UI. But sometimes we want to execute logic without needing to wait for a button to be clicked. Can you imagine needing to click a button before Facebook grabs your information from its server and built out your feed? Of course not. That would be a terrible user experience.

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

## Sprint 1 (We Do)

## Sprint 2 (You Do)

<!-- Maybe add a hungry for more, with an overview of other built-in hooks and maybe making custom hooks? -->