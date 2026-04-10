import { useState,useEffect } from 'react'
import Navbar from "./components/Navbar.jsx"
import { v4 as uuidv4 } from 'uuid';
import { useRef } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";




function App() {
  const [task, setTask] = useState("")
  const [taskList, setTaskList] = useState([])
  const [showCompleted, setShowCompleted] = useState(true)
  
 

const loaded = useRef(false);

useEffect(() => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  setTaskList(storedTasks);
  loaded.current = true;
}, []);

useEffect(() => {
  if (!loaded.current) return;
  localStorage.setItem("tasks", JSON.stringify(taskList));
}, [taskList]);

  const toggleShowCompleted = (e) => {
    setShowCompleted(!showCompleted);
  }
  const handleAddTask=()=>{
    setTaskList([...taskList,{id:uuidv4(),task:task,isCompleted:false}])
    setTask("")
    
  }
 const handleEdit = (e) => {
  const id = e.target.name;

  const taskToEdit = taskList.find((item) => item.id === id);
  if (!taskToEdit) return;
  setTask(taskToEdit.task);
  setTaskList(
    taskList.filter((item) => item.id !== id)
  );
  
};

 const handleDelete = (e) => {
  const id = e.target.name;
 const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );
  if (!confirmDelete) return;
  setTaskList(
    taskList.filter((item) => item.id !== id)
  );
  
};

 const handleChange=(e)=>{
  setTask(e.target.value)

 
 }

 const handleCheckbox=(e)=>{
  let id=e.target.name
  let index=taskList.findIndex(item=>{ return item.id===id})
  let newtasks=[...taskList];
  newtasks[index].isCompleted=!newtasks[index].isCompleted
  setTaskList([...newtasks] )
  
  


 }
 const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleAddTask();
  }
};


  return (
    <>
    <Navbar/>
     <div className="mx-3 md:mx-auto my-5 rounded-2xl bg-violet-100 min-h-[80vh] w-full md:w-3/4 lg:w-1/2 p-4 md:p-8 shadow-sm">

       <div className="Tasks">
        <h1 className="flex items-center justify-center gap-3 text-xl md:text-2xl font-bold px-2 md:px-6 py-4 text-center">
  <FaRegListAlt /> MyTask - Manage all your tasks here
</h1>

       <div className="Add-Task text-lg md:text-xl font-bold px-2 md:px-6">
  <div>Add your task</div>

  <div className="mt-3 flex flex-col md:flex-row gap-3 md:items-center">
    <input
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={task}
      type="text"
      placeholder="Write a task..."
      className="border-2 border-gray-300 bg-white rounded-lg p-2 w-full md:w-2/3"
    />

    <button
      onClick={handleAddTask}
      disabled={task.length <= 3}
      
      className="w-full md:w-auto bg-purple-500 disabled:bg-purple-300 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 hover:bg-purple-700"
    >
      Add to List
    </button>
  </div>
</div>

  <div className="Task-List w-full md:w-2/3 lg:w-1/2 mt-6">

 <label className="text-base md:text-lg flex items-center gap-3 px-2 md:px-6 font-semibold">
  <input onChange={toggleShowCompleted} type="checkbox" checked={showCompleted} />
  Show Completed
</label>

<div className="my-5 h-px w-full bg-black/10" />
{taskList.length==0 && <div className="px-14  text-xl font-bold"> No tasks to show </div>}
     {taskList.map((item)=> {
      return (showCompleted || !item.isCompleted) && (
     <div key={item.id} className="flex items-center justify-between gap-3 md:gap-6 text-base md:text-lg rounded-xl bg-white/70 border border-black/10 m-2 p-3 md:p-4 shadow-sm">

        <input type="checkbox" name={item.id} onChange={(e)=>handleCheckbox(e)} checked={item.isCompleted}/>
        <div className={`flex-1 min-w-0 ${item.isCompleted ? "line-through text-black/50" : "text-black"}`}>
  <span className="truncate block">{item.task}</span>
</div>

        
          <div key={item.id} className="text flex h-full text-align-center justify-center">
            <span className="flex-1"></span>
            <button onClick={(e) => handleEdit(e)} name={item.id} className="flex h-full Edit bg-purple-500 text-white rounded-lg p-2 m-2 hover:bg-purple-700">
              <MdEdit />
            </button>
            <button onClick={ handleDelete} name={item.id} className=" flex h-full Delete bg-red-500 text-white rounded-lg p-2 m-2 hover:bg-red-700">
              <MdDelete />
            </button>
            
          </div>
          
      
      </div>
       )})}
 
    </div>
  </div>
        
  </div>
        
  
     
    

    
    </>
  )
}

export default App
