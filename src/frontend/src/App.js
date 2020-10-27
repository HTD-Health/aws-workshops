import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {
    Container,
    Paper,
    TextField,
    FormControl,
    Divider
} from "@material-ui/core";

import {EntriesList} from "./components/EntriesList";
import {addTodo, deleteTodo, updateTodo, useTodos} from "./api/api";

const App = () => {
    const [body, setBody] = useState('')

    const [{ data }, refetch] = useTodos()
    const [entries, setEntries] = useState([])
    useEffect(() => data && setEntries(data), [data])

    const completedEntries = useMemo(() => entries.filter(entry => entry.completed), [entries])
    const notCompletedEntries = useMemo(() => entries.filter(entry => !entry.completed), [entries])

    // Handling input events
    const handleKeyDown = async (event) => {
        if (event.key !== 'Enter' || body === '') {
            return
        }

        setBody('')
        await addEntry({body, completed: false})
    }

    const handleBodyChange = (event) => {
        setBody(event.target.value)
    }

    const changeState = async (event, entry) => {
        setEntries(entries.map(e => e.id === entry.id ? entry : e))
        await updateTodo({
            ...entry,
            completed: event.target.checked
        })
        await refetch()
    }

    // Database content management
    const addEntry = async (entry) => {
        setEntries([ entry, ...entries ])
        await addTodo(entry)
        await refetch()
    }

    const removeEntry = async (entry) => {
        setEntries(entries.filter(e => e.id !== entry.id))
        await deleteTodo(entry)
        await refetch()
    }

    return (
        <StyledContainer maxWidth='sm'>
            <StyledPaper elevation={3}>
                <FormControl fullWidth>
                    <TextField
                        onChange={handleBodyChange}
                        value={body}
                        variant="outlined"
                        onKeyDown={handleKeyDown}
                    />
                </FormControl>

                <EntriesList
                    entries={notCompletedEntries}
                    onChange={changeState}
                    onRemove={removeEntry}
                />
                <Divider light/>
                <EntriesList
                    entries={completedEntries}
                    onChange={changeState}
                    onRemove={removeEntry}
                />
            </StyledPaper>
        </StyledContainer>
    );
}

export default App


const StyledContainer = styled(Container)`
    margin-top: 2rem;
`

const StyledPaper = styled(Paper)`
    padding: 1.5rem;
`