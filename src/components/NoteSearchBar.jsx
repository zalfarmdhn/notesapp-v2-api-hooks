import React, {useState} from 'react'
import propTypes from 'prop-types'
import LocaleContext from '../contexts/LocaleContext'

function NoteSearchBar({onSearch}) {
    const [searchInput, setSearchInput] = useState('')

    function inputChange(event) {
        setSearchInput(event.target.value)
        onSearch(event.target.value)
    }

    return (
        <LocaleContext.Consumer>
            {({locale}) => (
                <div className="note-search">
                    <input
                        type="text"
                        className="note-search__input"
                        placeholder={
                            locale === 'id'
                                ? 'Cari catatan...'
                                : 'Search notes...'
                        }
                        value={searchInput}
                        onInput={inputChange}
                    />
                </div>
            )}
        </LocaleContext.Consumer>
    )
}

NoteSearchBar.propTypes = {
    onSearch: propTypes.func.isRequired,
}

export default NoteSearchBar
