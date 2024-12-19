import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  let [count,setCount]=useState(0)
  useEffect(()=>{
    fetchTodo();
  },[count])
  const fetchTodo=async()=>{
    const res=await fetch("http://localhost:3000/api/gettodos");
    const data=await res.json();
    setTodos([...data])
  }
  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      fetch("http://localhost:3000/api/addtodo",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({task:task})
    }).then((res)=>{
        console.log(res);
        if(res.status==201){
            setCount(count+=1)
        }else if(res.status==400){
          alert("error")
        }
        else{
            alert("error")
        }
        
    }).catch((error)=>{
        console.log(error);
        
    });
      setTask(''); // Clear the input field after submission
    }
  };
  const handleDelete = (index) => {
    fetch(`http://localhost:3000/api/deletetodo/${index}`,{
      method:"DELETE",
          headers:{"Content-Type":"application/json"}
    }).then((res)=>{
          console.log(res);
          if(res.status==201){
              alert("Deleted")
              setCount(count+=1);
          }else{
              alert("error");
          }
      }). catch ((error)=>{
          console.log(error);
          
      })
  };
  return (
    <div className="todo-app">
      <h1 className="todo-header">Todo List</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleInputChange} placeholder="Enter your task" className="todo-input"/>
        <button type="submit" className="todo-submit-btn">
          Add Task
        </button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">{todo.task}
          <button className="todo-delete-btn" onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
