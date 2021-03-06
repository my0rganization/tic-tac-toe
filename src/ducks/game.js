import { Record, OrderedSet } from 'immutable'
import calculateWinner from '../utils/calculateWinner';

// Constants
export const moduleName = 'game';
export const SET_AND_CHANGE_PLAYER = `${moduleName}/SET_AND_CHANGE_PLAYER`;
export const DETERMINE_WINNER = `${moduleName}/DETERMINE_WINNER`;
export const RESTART_GAME = `${moduleName}/RESTART_GAME`;

// Reducer
const ReducerRecord = Record({
    squares: Array(9).fill(null),
    currentPlayer: "X",
    playerX: new OrderedSet([]),
    playerO: new OrderedSet([]),
    winner: null
});

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action;

    switch (type) {
        case SET_AND_CHANGE_PLAYER:
            return (
                !state.squares[payload.squareId]
                    ? state
                        .setIn(['squares', payload.squareId], payload.currentPlayer)
                        .update(`player${payload.currentPlayer}`, player => player.add(payload.squareId))
                        .set("currentPlayer", state.currentPlayer === "X" ? "O" : "X")
                    : state
            )

        case DETERMINE_WINNER:
            return state.set("winner", calculateWinner(state.playerX, state.playerO))

        case RESTART_GAME:
            return new ReducerRecord()

        default:
            return state;
    }
}

// Actions Creators
export function setAndChangePlayer(squareId, currentPlayer) {
    return {
        type: SET_AND_CHANGE_PLAYER,
        payload: { squareId, currentPlayer }
    }
}

export function determineWinner() {
    return {
        type: DETERMINE_WINNER
    }
}

export function restartGame() {
    return {
        type: RESTART_GAME
    }
}


// Selectors
export const getState = state => state[moduleName];
export const getSquares = state => getState(state).squares;
export const getPlayer = state => getState(state).currentPlayer;
export const getWinner = state => getState(state).winner;
