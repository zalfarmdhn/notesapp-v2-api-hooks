import React, {useState} from 'react'
import propTypes from 'prop-types'
import LocaleContext from '../contexts/LocaleContext'

function NoteInput({addNote}) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    function onTitleChangeEventHandler(event) {
        if (!event.target) {
            setTitle('(untitled)')
        }

        if (event.target.value.length <= 50) {
            setTitle(event.target.value)
        }
    }

    function onBodyChangeEventHandler(event) {
        if (!event.target) {
            setBody('')
        }

        setBody(event.target.innerHTML)
    }

    function onSubmitEventHandler(event) {
        event.preventDefault()

        addNote({
            title,
            body,
        })
    }

    return (
        <LocaleContext.Consumer>
            {({locale}) => (
                <section className="note-input">
                    <h2>{locale === 'id' ? 'Buat Catatan' : 'Create Note'}</h2>
                    <form onSubmit={onSubmitEventHandler}>
                        <p className="note-input__title__char-limit">
                            {title.length} / 50
                        </p>
                        <input
                            type="text"
                            className="note-input__title"
                            value={title}
                            onChange={onTitleChangeEventHandler}
                            placeholder={
                                locale === 'id'
                                    ? 'Tambah judul notes...'
                                    : 'Create note title...'
                            }
                        />
                        <div
                            className="note-input__body"
                            type="text"
                            onInput={onBodyChangeEventHandler}
                            data-placeholder={
                                locale === 'id'
                                    ? 'Tambah isi notes...'
                                    : 'Create note body...'
                            }
                            contentEditable
                        />
                        <button type="submit">
                            {locale === 'id' ? 'Buat' : 'Create'}
                        </button>
                    </form>
                </section>
            )}
        </LocaleContext.Consumer>
    )
}

NoteInput.propTypes = {
    addNote: propTypes.func.isRequired,
}

export default NoteInput
