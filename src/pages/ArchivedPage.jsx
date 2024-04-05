import React, {useState, useEffect} from 'react'
import {
    getArchivedNotes,
    unarchiveNote,
    deleteNote,
} from '../utils/network-data'
import {useSearchParams} from 'react-router-dom'
import {FaBoxArchive} from 'react-icons/fa6'
import NoteSearchBar from '../components/NoteSearchBar'
import NoteList from '../components/NoteList'
import LocaleContext from '../contexts/LocaleContext'

function ArchivedPage() {
    const [notes, setNotes] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    const [searchInput, setSearchInput] = useState(keyword || '')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchNotes() {
            try {
                const {data} = await getArchivedNotes()
                setNotes(data)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching notes:', error)
            }
        }
        fetchNotes()
    }, [])

    if (isLoading) {
        return <p className="notes-list__empty-message">Loading...</p>
    }

    function changeSearchParams(keyword) {
        setSearchParams({keyword})
    }

    async function onUnArchiveHandler(id) {
        try {
            await unarchiveNote(id)
            const {data} = await getArchivedNotes()
            setNotes(data)
        } catch (error) {
            console.error('Error archiving note:', error)
        }
    }

    async function onDeleteNoteHandler(id) {
        try {
            await deleteNote(id)
            const {data} = await getArchivedNotes()
            setNotes(data)
        } catch (error) {
            console.error('Error deleting note:', error)
        }
    }

    function onSearchHandler(input) {
        setSearchInput(input)
        changeSearchParams(input)
    }

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchInput.toLowerCase())
    )

    return (
        <LocaleContext.Consumer>
            {({locale}) => (
                <div>
                    <div className="note-container">
                        <FaBoxArchive />
                        <h2>
                            {locale === 'id'
                                ? 'Catatan Arsip'
                                : 'Archived Notes'}
                        </h2>
                    </div>
                    <NoteSearchBar onSearch={onSearchHandler} />
                    <NoteList
                        notes={filteredNotes}
                        onDelete={onDeleteNoteHandler}
                        onArchive={onUnArchiveHandler}
                    />
                </div>
            )}
        </LocaleContext.Consumer>
    )
}

export default ArchivedPage
