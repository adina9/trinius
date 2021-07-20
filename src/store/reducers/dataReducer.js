const initialState = {
    data: [],
}
export function dataReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.data }
        default: return state
    }
}