import React, { useState,useContext } from 'react'
import TextField from '@mui/material/TextField';
import '../../Login/Login.css';
import { toast } from 'react-hot-toast';



const AddBoardForm = ({setNewBoardAdded,setAddBoardMode}) => {
	const [board,setBoard] = useState({
		title:"",
		description:""
	});
	const [isPending,setIsPending] = useState(false);

	const handleSubmit =(event)=>{
		
        event.preventDefault();
        const controller = new AbortController();
		const signal = controller.signal;
        
        try{
			setIsPending(true);
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
                setIsPending(false);
            });
        }
        catch(error){
            toast.error(error.message || "something went wrong!");
			setIsPending(false);
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
		<form  id='form' className='form login-form'>
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

			<button className='submit-btn' onClick={handleSubmit}>{isPending ? 'Loading..':'Add'}</button>
			<span  onClick={() => setAddBoardMode(prev => !prev)} style={{backgroundColor: "rgb(18,24,38)",color:"white"}} className='cursor-pointer px-1  rounded-sm b absolute top-0 right-10'>X</span>
		</form>
  )
}

export default AddBoardForm;
