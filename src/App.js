import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo'
import './App.css';
import db from './firebase'
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('')
  
  //when app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
        //this code will fire when the app loads
    db.collection("todos").orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) =>{
      //console.log(snapshot.docs.map((doc)=>doc.data()));
      setTodos(snapshot.docs.map(doc => {
        return ({todo: doc.data().todo, id: doc.id, description: doc.data().description})}))
    }, (error) => console.log(error));

  }, [])



  
  const addTodo = (event) =>{
        //this will get fired when we click the button
    // console.log('👾 I am working');
    event.preventDefault(); //will prevent the refresh
    db.collection('todos').add({
      todo: input,
      description: description,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([...todos, input]);  //add current input to back of todos
    setInput(''); //clear up the input 
    setDescription('');
  }

  return (
    <div className="App">
      <div className="container">
        <div>
          <LibraryAddCheckIcon id="LibraryAddCheckIcon"/>
          <h1>TODO List</h1>
        </div>
        <form className={classes.container} noValidate>
          <div id = "input-todo">
            <FormControl>
              <InputLabel>TODO</InputLabel>
              <Input value={input} onChange={event => setInput(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <AssignmentTurnedInIcon />
                  </InputAdornment>
                }
              
              />
            </FormControl>
          </div>

          <div id="input-description">
          <FormControl>
              <InputLabel>Description</InputLabel>
              <Input value={description} onChange={event => setDescription(event.target.value)}
              />
            </FormControl>
          
          </div>
          
          <Button id = "input-todo-button" disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
              Add Todo
            </Button>
        </form>

      </div>
      
     

      <div className="todo-items">
        <ul>
          {todos.map((todo)=>{
            return <Todo key = {todo.id} todo={todo}/>
          })}
        </ul>
      </div>
      
    </div>
  );
}

export default App;
