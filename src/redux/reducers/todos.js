const initialState = {
    todos: []
}

export const todosReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type){
        case 'ADD_TODOS' : {
            return {...state, todos: action.payload}
        }

        case 'NEW_ADD_TODOS' : {
            return {...state, todos: [...state.todos, action.payload]}
        }


        case 'DELETE_TODOS': {
            return {...state, todos: state.todos.filter(el => el.id !== action.payload.id)};
        }

        case 'UPDATE_TODOS_STATUS': {
           let find =  state.todos.find(value => value.id === action.payload.id)
           console.log(find)
            find.completed = action.payload.completed
            return {...state}
        }

        case 'EDIT_TITLE': {

        }

        default:
            return state
    }


}