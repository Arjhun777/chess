import { store } from '../index';

export const pawnPosition = (mainBoard, x, y, column) => {
    const pawnPositions = [];
    const currentPlayer = store.getState().board.currentPlayer;
    const moments = mainBoard[x][y]?.piece?.[currentPlayer].moment;
    moments.forEach(moment => {
        if (moment.condition ? eval(moment.condition) : true)
            pawnPositions.push({ x: eval(moment.x), y: eval(moment.y) });
    });
    return pawnPositions;
}