import React, {Fragment} from "react";
import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {todosReducer} from "./redux/reducers/todos";
//Create Form component
const CreateTodoForm = ({onSubmit}) => {

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');


  const handleSubmit = async (e) => {
     e.preventDefault()


    onSubmit(title, description)
      console.log(`Title : ${title}, Description: ${description}`)
  }

  return(
      <form onSubmit={handleSubmit}>
        <input type="text"  value={title}  onChange={({target: {value}}) => setTitle(value)}   placeholder={'todo title'}/>
        <input type="text" value={description} onChange={({target: {value}}) => setDescription(value) }  placeholder={'todo description'}/>
        <button type={'submit'}> create todo</button>
      </form>
  )
  
}

const Todos = ({todos}) => {


    return(
        <div>
            {todos.map(todo => {
                return <Fragment key={todo.id}>
                    <div>{todo.title}</div>
                    <div>{todo.description}</div>
                    <div>Created At: {new Date(todo.createdAt)}</div>


                </Fragment>
            })}
        </div>
    )
}


function App() {
  const { todos } = useSelector(store => store.todosReducer)
    const dispatch = useDispatch()

    console.log(todos, 'todos')

  const fetchTodos = async () => {
    const resp = await fetch('http://localhost:8888/get-todos')
    const data = await  resp.json();


  }


  useEffect(() => {
    fetchTodos();
  }, [])


const onTodoCreate = async (title, description) => {
    const resp = await fetch('http://localhost:8888/create-todo', {
        method: 'POST',
        body: JSON.stringify({title, description}),
        headers: {
            'Content-Type' : 'application/json'
        }
    })

    const data = await resp.json();

    console.log(data, 'onTodoCreate')
}

  return (
    <div className="App">
        <CreateTodoForm onSubmit={onTodoCreate}/>
        <Todos todos={todos}/>
    </div>
  );
}

export default App;
