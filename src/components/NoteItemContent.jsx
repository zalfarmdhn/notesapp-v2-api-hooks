import React from 'react'
import {showFormattedDate} from '../utils/index'
import propTypes from 'prop-types'
import {Link} from 'react-router-dom'
import parser from 'html-react-parser'

function NoteItemContent({id, title, body, createdAt}) {
    return (
        <div className="note-item__content">
            <Link to={`/note/${id}`} className="note-item__title">
                {title}
            </Link>
            <p className="note-item__date">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{parser(body)}</p>
        </div>
    )
}

NoteItemContent.propTypes = {
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    body: propTypes.string.isRequired,
    createdAt: propTypes.string.isRequired,
}

export default NoteItemContent
