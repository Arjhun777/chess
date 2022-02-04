export const CHESS_BOARD_SIZE_X = 8;
export const CHESS_BOARD_SIZE_Y = 8;

export const DEFAULT_POSITION = ['ROOK', 'KNIGHT', 'BISHOP', 'KING', 'QUEEN', 'BISHOP', 'KNIGHT', 'ROOK'];

export const CHESS_PIECE_DESCRIPTION = {
    PAWN: {
        name: 'PAWN',
        moment: ['VERTICAL', 'DIAGONAL'],
    },
    ROOK: {
        name: 'ROOK',
        moment: ['VERTICAL', "HORIZONTAL"],
    },
    KING: {
        name: 'KING',
        moment: ['VERTICAL', 'HORIZONTAL'],
    },
    QUEEN: {
        name: 'QUEEN',
        moment: ['VERTICAL', 'DIAGONAL', 'HORIZONTAL'],
    },
    BISHOP: {
        name: 'BISHOP',
        moment: ['DIAGONAL'],
    },
    KNIGHT: {
        name: 'KNIGHT',
        moment: ['LSHAPE'],
    },
};