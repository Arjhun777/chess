import { store } from "../.."

export const updateBoard = (board) => {
    store.dispatch({
        type: 'UPDATE_BOARD',
        payload: board,
    });
};

export const updatePlayer = (player) => {
    store.dispatch({
        type: 'UPDATE_PLAYER',
        payload: player,
    });
}