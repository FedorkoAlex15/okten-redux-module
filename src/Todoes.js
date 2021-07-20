import React, {Fragment} from "react";
import {useDispatch} from "react-redux";

export default function Todos  ({todos}) {
    const dispatch  = useDispatch()

const  handleDelete = async (id) => {
console.log(id)



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
                    <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    <hr/>


                </Fragment>
            })}
        </div>
    )
}