import React from 'react'
import propTypes from 'prop-types'
import {IoMdArchive} from 'react-icons/io'

function ArchiveButton({id, onArchive}) {
    return (
        <button
            className="note-item__archive-button"
            onClick={() => onArchive(id)}>
            <IoMdArchive />
        </button>
    )
}

ArchiveButton.propTypes = {
    id: propTypes.string.isRequired,
    onArchive: propTypes.func.isRequired,
}

export default ArchiveButton
