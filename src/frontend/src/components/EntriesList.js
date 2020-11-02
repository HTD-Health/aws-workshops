import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

export const EntriesList = ({entries, onChange, onRemove}) => (
    <List>
        {entries.map((entry, i) => (
            <ListItem key={`${entry.id}-${i}`} dense button>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={entry.completed}
                        tabIndex={-1}
                        disableRipple
                        onChange={(event) => onChange(event, entry)}
                        disabled={entry.id === undefined}
                    />
                </ListItemIcon>
                <ListItemText>
                    {entry.completed ? (
                        <strike>{entry.body}</strike>
                    ) : (
                        <span>{entry.body}</span>
                    )}
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => onRemove(entry)} disabled={entry.id === undefined}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))}
    </List>
)