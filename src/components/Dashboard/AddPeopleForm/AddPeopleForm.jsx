import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';


const AddPeopleForm= ({allUsers,setAddPeopleMode,boardId}) => {

    const [selectedUser,setSelectedUsers] = useState([]);
    const [isPending,setIsPending] = useState(false);
    const handleSelect=(users)=>{
        setSelectedUsers(prev => users);
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        const controller = new AbortController();
		const signal = controller.signal;
        
        try{
            setIsPending(true);
            const token=localStorage.getItem('jwtToken');
            const url=process.env.REACT_APP_BASE_URL+'/board/assignBoard/'+boardId;

            if(!token) return;
            
            const idList=selectedUser.map(user => user.value);

            fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
				},
				signal,
                body: JSON.stringify({idList:idList})
			})
            .then(res => res.json())
            .then(res=>{
				
                if(res.statusCode && (""+res.statusCode).startsWith("2")){
                    toast.success("user added to board");
					
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

    const options = allUsers.map(user => {
        return {
            label:(user.name.split(" "))[0]+"("+user.email+")",
            value:user.id
        }
            
    })
    const customStyles = {
        menu: (provided) => ({
          ...provided,
          minWidth: '200px', // Adjust the width as needed
        }),
        control: (provided) => ({
            ...provided,
            minWidth: '200px', // Adjust the width as needed
          }),
      };
       
    return (
        <form  id='form' className='form login-form'>
			<h2>Add People</h2>
			
			<Select
        
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelect}
            value={selectedUser}
            styles={customStyles}
        />

			<button className='submit-btn' onClick={handleSubmit}>{isPending ? 'Loading..':'Add'}</button>
			<span  onClick={() => setAddPeopleMode(prev => !prev)} style={{backgroundColor: "rgb(18,24,38)",color:"white"}} className='cursor-pointer px-1  rounded-sm b absolute top-0 right-10'>X</span>
		</form>
        
    );
}

export default AddPeopleForm;