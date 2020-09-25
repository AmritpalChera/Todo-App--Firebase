import React, { useState} from 'react';
import './Todo.css';
import {Button, FormControl, Input, List, ListItem, ListItemText, Modal, TextField} from '@material-ui/core'
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';



 //code snippet from material ui for the MODAL
const useStyles = makeStyles((theme) => ({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,
      transform: 'translateZ(0)',
      // The position fixed scoping doesn't work in IE 11.
      // Disable this demo to preserve the others.
      '@media all and (-ms-high-contrast: none)': {
        display: 'none',
      },
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));
  


const Todo = (props) => {
    const classes = useStyles();
    const rootRef = React.useRef(null);

    const [open, setOpen] = useState((false));
    const [input, setInput] = useState(props.todo.todo);
    const [description, setDescription] = useState(props.todo.description);

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const updateTodo = () =>{
        //update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input,
            description: description,
        }, {merge: true})
        setOpen(false);
    }

    return (
        <div >
            <Modal
                open={open}
                onClose = {handleClose}
                className={classes.modal}
                container={() => rootRef.current}
            >
                <div className={classes.paper}>
                    <div className="todo-modal-title">
                        <h2>Edit TODO</h2>
                        < ClearIcon className = "icon" onClick={handleClose}/>
                    </div>
                    
                    <form>
                        <FormControl>
                        <Input value={input} onChange = {event => setInput(event.target.value)} />
                        </FormControl>
                        <TextField
                            className={classes.margin}
                            label="Description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                            
                        />


                        <Button id="submit_button" disabled={(input === props.todo.todo || !input) && (description === props.todo.description)} type="submit" onClick={updateTodo} variant="contained" color="primary">
                            Update
                        </Button>
                    </form>
                </div>
            </Modal>
            <div className="todo-item">
                <div className="todo-item-content">
                    
                    <List className="todo_list">
                        <ListItem href="#simple-list">
                            <ListItemText primary={props.todo.todo} secondary={description}/>
                        </ListItem>
                    </List>
                </div>
                <div className="todo-item-edit">
                    <EditIcon className = "icon" onClick={e=> setOpen(true)}></EditIcon>
                    <DeleteForeverIcon className = "icon" onClick={event=>db.collection('todos').doc(props.todo.id).delete()}/>
                </div>
            </div>            
        </div>
    )
}

export default Todo


