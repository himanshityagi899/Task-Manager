import { TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useState } from 'react';
import toast from 'react-hot-toast';


const AddTaskForm = ({addTask,setAddTaskMode,boardId}) => {

    const [task,setTask] = useState({
        title:"",
        description:"",
        deadline: "2024-12-12",
        priority:4,
        boardId: boardId,
        status: "INPROGRESS"
    });
    const [isPending,setIsPending] = useState(false);

    const handleChange =(e)=>{
		const currTask={
			...task,
			[e.target.name]:e.target.value
		};
		setTask(prev =>{
			return currTask;
		});
	}

    const handleSubmit=(event)=>{
        event.preventDefault();
        const controller = new AbortController();
		const signal = controller.signal;
        
        try{
            setIsPending(true);
            const token=localStorage.getItem('jwtToken');
            const url=process.env.REACT_APP_BASE_URL+'/task';
            

            fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
				},
				signal,
                body: JSON.stringify(task)
			})
            .then(res => res.json())
            .then(res=>{
				
                if(res.statusCode && (""+res.statusCode).startsWith("2")){
                    toast.success("task added to board");
                    setAddTaskMode(prev => !prev)
                    addTask(res.data);
                }
                else{
                    console.log(res);
					toast.error(res.message || "Something went wrong while adding user to board!")
                }
                setIsPending(false);
            });
        }
        catch(error){
            toast.error(error.message || "something went wrong!");
            setIsPending(false);
        };

    }

    return (
        <form  id='form' className='form login-form'>
			<h2>Add Task</h2>
			<TextField 
				required
				name='title' 
				label="Title" 
				value={task.title} 
				variant="standard" 
				onChange={handleChange}
				sx={{ width: '300px',marginBottom:'20px'}}
				
			/>
			<TextField 
				required
				
				name='description' 
				label="Description" 
				value={task.description} 
				variant="standard" 
				onChange={handleChange}
				
				sx={{ width: '300px',marginBottom:'20px'}}
			/>

			<button className='submit-btn' onClick={handleSubmit}>{isPending ? 'Loading..':'Add'}</button>
		
			<span  onClick={() => setAddTaskMode(prev => !prev)} style={{backgroundColor: "rgb(18,24,38)",color:"white"}} className='cursor-pointer px-1  rounded-sm b absolute top-0 right-10'>X</span>
		</form>
        
    );
}

export default AddTaskForm;;