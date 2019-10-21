import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fillSquare, getPlayer } from '../ducks/board'

const Square = ({ id, squareContent }) => {
    const player = useSelector(state => getPlayer(state));
    const dispatch = useDispatch();
    const dispatchActions = () => dispatch(fillSquare(id, player));
    
    return (
        <li onClick={dispatchActions} className="square">
            {squareContent}
        </li>
    )
}

export default Square
