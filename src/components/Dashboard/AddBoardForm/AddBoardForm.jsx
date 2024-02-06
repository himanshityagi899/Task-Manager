import React, { useState,useContext } from 'react'
import TextField from '@mui/material/TextField';
import '../../Login/Login.css';
import { toast } from 'react-hot-toast';



const AddBoardForm = ({setNewBoardAdded}) => {
	const [board,setBoard] = useState({
		title:"",
		description:""
	});

	const handleSubmit =(event)=>{
		
        event.preventDefault();
        const controller = new AbortController();
		const signal = controller.signal;
        
        try{
            const token=localStorage.getItem('jwtToken');
            const url=process.env.REACT_APP_BASE_URL+'/board';
            if(!token) return;

            fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
				},
				signal,
                body: JSON.stringify(board)
			})
            .then(res => res.json())
            .then(res=>{
				// console.log(res)
                if(res.statusCode && (""+res.statusCode).startsWith("2")){
                    toast.success("Board Added");
					setNewBoardAdded(prev => !prev);
                }
                else{
					toast.error(res.message || "Something went wrong while adding board!")
                }
                
            });
        }
        catch(error){
            toast.error(error.message || "something went wrong!");
        };

    };

	const handleChange =(e)=>{
        setBoard(prev => {
            return {
                ...board,
                [e.target.name]:e.target.value
            }
        });
	}

	return (
		<form className='form login-form'>
			<h2>Add Board</h2>
			<TextField 

				required
				name='title' 
				label="Title" 
				value={board.title} 
				variant="standard" 
				onChange={handleChange}
				sx={{ width: '300px',marginBottom:'20px'}}
				
			/>
			<TextField 
				required
				
				name='description' 
				label="Description" 
				value={board.password} 
				variant="standard" 
				onChange={handleChange}
				
				sx={{ width: '300px',marginBottom:'20px'}}
			/>

			<button className='submit-btn' onClick={handleSubmit}>Add</button>

		</form>
			
		
  )
}

export default AddBoardForm;
