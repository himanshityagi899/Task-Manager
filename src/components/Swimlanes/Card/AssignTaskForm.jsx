import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';


const AssignTaskForm= ({boardId,taskId,setShowAssignForm}) => {

    const [selectedUser,setSelectedUsers] = useState([]);
    const [isPending,setIsPending] = useState(false);
    const [allUsers,setAllusers] = useState([]);


    useEffect(()=>{
        
        const getAllUsers= async()=>{
            if(!boardId) return;
        
            const controller = new AbortController();
            const signal = controller.signal;
            
            try{
                
                const token=localStorage.getItem('jwtToken');
                const url=process.env.REACT_APP_BASE_URL+'/board/boardUser/'+boardId;
                const headers= {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                }
                let res= await axios.get(url,{headers});
                res=res.data;

                if(res.statusCode && (""+res.statusCode).startsWith("2")){
                    setAllusers(res.data);
                }
                else{
                    console.log(res?.message || "something went wrong")
                }

            }
            catch(error){
                console.log(error.message || error);
            }
        }

        getAllUsers();

    },[]);

    const handleSelect=(user)=>{
        
        setSelectedUsers(prev => user);
    }

    const handleSubmit= async(event)=>{
        if(selectedUser==null) return;
        console.log(selectedUser);

        event.preventDefault();
        const controller = new AbortController();
        const signal = controller.signal;
            
        try{
            
            const token=localStorage.getItem('jwtToken');
            const url=process.env.REACT_APP_BASE_URL+'/task/assignTaskTo/'+selectedUser.value;
            const headers= {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            }
            const data={
                taskId:taskId
            }
            let res= await axios.post(url,data,{headers});
            
            res=res.data;

            toast.success("Task assigned to "+selectedUser.label);

        }
        catch(error){
            console.log(error)
            toast.error(error.message || "something went wrong");
        }

    }

    const options = allUsers.map(user => {
        return {
            label:(user.name.split(" "))[0]+"("+user.email+")",
            value:user.id
        }
            
    })
    const customStyles = {
        menu: (provided) => ({
          ...provided,
          maxWidth: '100px', // Adjust the width as needed
          
          minHeight:'10px',
          fontSize:'10px',
          color:'black'
        }),
        control: (provided) => ({
            ...provided,
            maxWidth: '100px', // Adjust the width as needed
            fontSize:'10px',
          }),
      };
       
    return (
        <form  id='form' className='w-[250px] bg-white tramsform translate-x-[-240px]  translate-y-[45px] flex flex-col items-center'>
			<h2>Add People</h2>
			
			<Select
                name="colors"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelect}
                value={selectedUser}
                styles={customStyles}
            />

			<button className='submit-btn scale-[70%]' onClick={handleSubmit}>{isPending ? 'Loading..':'Assign'}</button>
			<span  onClick={() => setShowAssignForm(prev => !prev)} style={{backgroundColor: "rgb(18,24,38)",color:"white"}} className='cursor-pointer px-1  rounded-sm b absolute top-0 right-5'>X</span>
		</form>
        
    );
}

export default AssignTaskForm;