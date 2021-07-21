import React, {Fragment} from "react";
import {useDispatch} from "react-redux";

export default function Todos  ({todos, onChangeTodoStatus, onTitleEdit }) {
    const dispatch  = useDispatch()

    const handleEdit = async (id) => {
        console.log(id)

    }


const  handleDelete = async (id) => {




    const onTodoDelete = async (id) => {

        const resp = await fetch(`http://localhost:8888/delete-todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json();
        dispatch({type: 'DELETE_TODOS', payload: data})


        console.log(data)
    }


    onTodoDelete(id)

}




    return (
        <div>
            {todos.map(todo => {
                return <Fragment key={todo.id}>
                    <div>{todo.title}</div>
                    <div>{todo.description}</div>
                    <div>{JSON.stringify(todo.completed)}</div>
                    <button onClick={() => onChangeTodoStatus(todo.completed, todo.id )}>Completed</button>
                    <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    <button onClick={() => onTitleEdit(todo.title, todo.id)}>Edit Title</button>
                    <hr/>


                </Fragment>
            })}
        </div>
    )
}