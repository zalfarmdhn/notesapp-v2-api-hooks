import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {
    getNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
} from '../utils/network-data'
import {showFormattedDate} from '../utils/index'
import NoteItemAction from '../components/NoteItemAction'

function ViewPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [note, setNote] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchNotes() {
            const note = await getNote(id)
            setNote(note.data)
            setIsLoading(false)
        }
        fetchNotes()
    }, [id])

    if (isLoading) {
        return <p className="detail-page__body">Loading...</p>
    }

    const routeNotes = note.archived ? '/' : '/archived'
    return (
        <div>
            <h1 className="detail-page__title">{note.title}</h1>
            <h2>{showFormattedDate(note.createdAt)}</h2>
            <p className="detail-page__body">{note.body}</p>
            <NoteItemAction
                id={id}
                onDelete={() => {
                    deleteNote(id)
                    navigate('/')
                }}
                onArchive={() => {
                    {
                        note.archived ? unarchiveNote(id) : archiveNote(id)
                    }
                    navigate(routeNotes)
                }}
            />
        </div>
    )
}

export default ViewPage
