import React from 'react'
import NoteItem from './NoteItem'
import propTypes from 'prop-types'
import LocaleContext from '../contexts/LocaleContext'

function NoteList({notes, onDelete, onArchive}) {
    return (
        <>
            <LocaleContext.Consumer>
                {({locale}) => (
                    <>
                        {notes.length === 0 && (
                            <p className="notes-list__empty-message">
                                {locale === 'id'
                                    ? 'Tidak ada catatan'
                                    : 'No notes'}
                            </p>
                        )}
                    </>
                )}
            </LocaleContext.Consumer>
            <section className="notes-list">
                {notes.map(note => (
                    <NoteItem
                        key={note.id}
                        id={note.id}
                        onDelete={onDelete}
                        onArchive={onArchive}
                        {...note}
                    />
                ))}
            </section>
        </>
    )
}

NoteList.propTypes = {
    notes: propTypes.array.isRequired,
    onDelete: propTypes.func.isRequired,
    onArchive: propTypes.func.isRequired,
}

export default NoteList
