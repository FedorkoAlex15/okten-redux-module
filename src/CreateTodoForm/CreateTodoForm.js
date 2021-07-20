import React, {useState} from "react";
 export default function CreateTodoForm  ({onTodoCreate, onTodoEdit}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()


        onTodoCreate(title, description)

    }



    return(
        <form onSubmit={handleSubmit}>
            <input type="text"  value={title}  onChange={({target: {value}}) => setTitle(value)}   placeholder={'todo title'}/>
            <input type="text" value={description} onChange={({target: {value}}) => setDescription(value) }  placeholder={'todo description'}/>
            <button type={'submit'}> create todo</button>
        </form>
    )

}

