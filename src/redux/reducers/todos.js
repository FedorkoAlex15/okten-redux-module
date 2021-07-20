const initialState = {
    todos: []
}

export const todosReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_TODOS' : {
            return {...state, todos: action.payload}
        }

        case 'NEW_ADD_TODOS' : {
            return {...state, todos: [...state.todos, action.payload]}
        }

        case 'DELETE_TODOS': {
            return {...state, todos: [...state.todos, action.payload]}

        }

        default:
            return state
    }
}