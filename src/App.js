import logo from './logo.svg';
import './App.css';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
//Create Form component
const CreateTodoForm = ({onSubmit}) => {

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');


  const handleSubmit =  (e) => {
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

// const Todos = () => {
//
// }


function App() {
  const store = useSelector(store => store)

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
        body: JSON.stringify({title, description})
    })

    const data = await resp.json();

    console.log(data, 'onTodoCreate')
}

  return (
    <div className="App">
        <CreateTodoForm onSubmit={onTodoCreate}/>
    </div>
  );
}

export default App;
