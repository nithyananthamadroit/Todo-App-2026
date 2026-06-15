import { useEffect, useState } from "react";
import "../styles/todoapp.css"
export default function TodoApp() {
    const DEFAULT_TODOS = [
        {id:1,text:"Learn React", completed:false},
        {id:2,text:"Learn CSS", completed:false},
    ];

    const [todos, setTodos] = useState(getDataFromLocalStorage)
    const [input, setInput] = useState("")
    const [editInput, setEditInput] = useState("")
    const [editId, setEditId] = useState(null)

    useEffect(()=>{
        saveToLocalStorage(todos)
    },[todos])

    function getDataFromLocalStorage() {
        const savedTodos = localStorage.getItem("my-todos")
        return savedTodos ? JSON.parse(savedTodos) : DEFAULT_TODOS
    }

    function saveToLocalStorage(data) {
        localStorage.setItem("my-todos",JSON.stringify(data))
    }

    function handleAdd(e){
        e.preventDefault();
        if(input.trim() === ""){
            return alert("Please enter a data")
        }

        setTodos([...todos,{id:Date.now(),text:input,completed:false}])
        setInput("")
    }

    function startEdit(todo){
        setEditId(todo.id)
        setEditInput(todo.text)
    }

    function saveEdit(id) {
        setTodos(todos.map(t=> t.id === id ? {...t,text:editInput}:t))
        setEditId(null)
        setEditInput("")
    }

    function handleDelete(id) {
        setTodos(todos.filter(text => text.id !== id))
    }

    function handleToggleTodo(id) {
        setTodos(todos.map(t=>t.id === id ? {...t, completed: !t.completed}: t))
    }


    return(
        <div className="todo-container">
            <h2 className="todo-header">My Tasks</h2>
            <form className="input-group" onSubmit={handleAdd}>
                <input 
                type="text" 
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                className="todo-input" 
                />
                <button className="add-btn" type="submit">Add</button>
            </form>
            <ul className="todo-list">
                {
                    todos.map(todo=>(
                        <li className="todo-item" key={todo.id}>
                        {
                            editId === todo.id ? (
                                <div>
                                    <input type="text" className="todo-input" value={editInput} onChange={(e)=>setEditInput(e.target.value)}/>
                                    <button className="add-btn" onClick={()=>saveEdit(todo.id)}>Save</button>
                                </div>
                            ):(
                                <div>
                                     <span className={`todo-text ${todo.completed?'completed':''}`} onClick={()=>handleToggleTodo(todo.id)}>{todo.text}</span>
                                     <div>
                                        <button className="edit-btn" onClick={()=>startEdit(todo)}>Edit</button>
                                        <button className="delete-btn" onClick={()=>handleDelete(todo.id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        }
                        
                        </li>
                    ))
                }
                
            </ul>
        </div>
    )
}
