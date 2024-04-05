import React from 'react'
import {useNavigate} from 'react-router-dom'
import {addNote} from '../utils/network-data'
import NoteInput from '../components/NoteInput'

function AddPage() {
    const navigate = useNavigate()

    const onAddContact = async note => {
        await addNote(note)
        navigate('/')
    }

    return <NoteInput addNote={onAddContact} />
}

export default AddPage
