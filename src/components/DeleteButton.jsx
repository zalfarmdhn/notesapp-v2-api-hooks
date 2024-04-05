import React from 'react'
import propTypes from 'prop-types'
import {FaTrash} from 'react-icons/fa6'

function DeleteButton({id, onDelete}) {
    return (
        <button
            className="note-item__delete-button"
            onClick={() => onDelete(id)}>
            <FaTrash />
        </button>
    )
}

DeleteButton.propTypes = {
    id: propTypes.string.isRequired,
    onDelete: propTypes.func.isRequired,
}

export default DeleteButton
