import React, {useState, useEffect} from 'react'
import {getActiveNotes, deleteNote, archiveNote} from '../utils/network-data'
import {FaCircleCheck} from 'react-icons/fa6'
import {useSearchParams} from 'react-router-dom'
import NoteSearchBar from '../components/NoteSearchBar'
import NoteList from '../components/NoteList'
import LocaleContext from '../contexts/LocaleContext'

function HomePage() {
    const [notes, setNotes] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    const [searchInput, setSearchInput] = useState(keyword || '')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchNotes() {
            try {
                const {data} = await getActiveNotes()
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

    async function onArchiveHandler(id) {
        try {
            await archiveNote(id)
            const {data} = await getActiveNotes()
            setNotes(data)
        } catch (error) {
            console.error('Error archiving note:', error)
        }
    }

    async function onDeleteNoteHandler(id) {
        try {
            await deleteNote(id)
            const {data} = await getActiveNotes()
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
                        <FaCircleCheck />
                        <h2>
                            {locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}
                        </h2>
                    </div>
                    <NoteSearchBar onSearch={onSearchHandler} />
                    <NoteList
                        notes={filteredNotes}
                        onDelete={onDeleteNoteHandler}
                        onArchive={onArchiveHandler}
                    />
                </div>
            )}
        </LocaleContext.Consumer>
    )
}

export default HomePage
