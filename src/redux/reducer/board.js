const defaultBoardState = {
    mainBoard: [],
    currentPlayer: 'WHITE',
}

const boardReducer = (state = defaultBoardState, action) => {
    switch (action.type) {
        case 'UPDATE_BOARD':
            return {
                ...state,
                mainBoard: action.payload
            }
        case 'UPDATE_PLAYER':
            return {
                ...state,
                currentPlayer: action.payload,
            }
        default:
            return state;
    }
}

export default boardReducer;