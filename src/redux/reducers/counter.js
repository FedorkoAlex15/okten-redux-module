const initialState = {
    value: 0
}

export const counterReducer = (state = initialState, action) => {
    switch (action.type){
        case 'INC' : {
            return {...state, value: this.state.value + 1}
        }

        default:
            return state

    }
}