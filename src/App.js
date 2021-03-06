import React, {Fragment} from "react";
import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {todosReducer} from "./redux/reducers/todos";
import CreateTodoForm from "./CreateTodoForm/CreateTodoForm";
import Todos from "./Todos/Todoes";

//Create Form component


function App() {
    const {todos} = useSelector(store => store.todosReducer)
    const dispatch = useDispatch()
    const [updatedTitle, setUpdatedTitle] = useState('')
    const [updatedDescription, setUpdateDescription] = useState('')
    const [formFlag, setFormFlag] = useState(false)



    const fetchTodos = async () => {
        const resp = await fetch('http://localhost:8888/get-todos')
        const data = await resp.json();

        dispatch({type: 'ADD_TODOS', payload: data})

    }


    console.log(todos)

    useEffect(() => {
        fetchTodos();
    }, [])


    const onTodoCreate = async (title, description) => {
        const resp = await fetch('http://localhost:8888/create-todo', {
            method: 'POST',
            body: JSON.stringify({title, description}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await resp.json();
        dispatch({type: 'NEW_ADD_TODOS', payload: data})
        console.log(data, 'onTodoCreate')
    }

    const onChangeTodoStatus = async (completed, id) => {
        console.log(completed)

        const resp = await fetch(`http://localhost:8888/update-todo/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({completed: !completed}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await resp.json();
        dispatch({type: 'UPDATE_TODOS_STATUS', payload: data})
    }


    const onTitleEdit = async (title, description, id) => {

        console.log(id)
        const resp = await fetch(`http://localhost:8888/update-todo/${id}`, {
            method: 'PATCH',
             body: JSON.stringify({title: title, description: description}),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        const data = await resp.json()
        dispatch({type: 'EDIT', payload: data})

        console.log(`Data with updated title and description ${JSON.stringify(data)}`)
    }


    console.log(todos)


    return (
        <div>
            <CreateTodoForm onTodoCreate={onTodoCreate}/>
            <Todos todos={todos} onChangeTodoStatus={onChangeTodoStatus} onTitleEdit={onTitleEdit}
                   updatedTitle={updatedTitle} updateDescription={updatedDescription}/>

            {formFlag && <form action="#">
                <input type="text" value={updatedTitle} onChange={({target: {value}}) => setUpdatedTitle(value)}/>
                <input type="text" value={updatedDescription} onChange={({target: {value}}) => setUpdateDescription(value)}/>
            </form>}
            <button onClick={() => setFormFlag(!formFlag)}>New Title and description</button>

        </div>
    );
}

export default App;
