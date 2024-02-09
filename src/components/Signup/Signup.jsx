import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Signup.css';
import { toast } from 'react-hot-toast';
import Loading from '../Loading/Loading';

const Signup = ({handleCross}) => {
	const [user,setUser] = useState({
        name:"",
		email:"",
		password:"",
        confirmPassword:"",
        designation:"INTERN"
	});
	const [isPending,setIsPending] = useState(false);
	const [isEmailValid,setIsEmailValid] = useState(true);
	const [isPasswordValid,setisPasswordValid] = useState(true);
    const [isPasswordSame,setIsPasswordSame] = useState(true);


	const handleSubmit =(event)=>{
		event.preventDefault();
        setIsPending(true); 
		
		try{
			const url='http://localhost:8081/api/v1/user/signup';
			
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json' // Specify JSON format
				},
				body: JSON.stringify(user)
			})
			.then(res => res.json())
			.then(res=>{
				
				if(!res.statusCode || !(res.statusCode!=="201")){
					toast.error(res.message || "something went wrong!");
				}
				else{
					toast.success("Signed in! Please login");
					setIsPending(false);
					goToLogin();
				}
				setIsPending(false); 
			});
		}
		catch(error){
			toast.error(error.message || "something went wrong!");
			setIsPending(false);
		};
        
    };

	const validateEmail = (email)=>{
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    	return email==="" || emailPattern.test(email);
	}
	const validatePassword = (password) => {
		const capitalRegex = /[A-Z]/; 
		const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; 
		const minLen = password.length >= 8; 
		return password.length=="" || capitalRegex.test(password) && specialCharRegex.test(password) && minLen;
	  };

    const goToLogin=(e)=>{
        handleCross("Login")
    }
	const handleChange =(e)=>{
		const currUser={
			...user,
			[e.target.name]:e.target.value
		};
		setUser(prev =>{
			return currUser;
		});
		setIsEmailValid(prev => validateEmail(currUser.email));
		setisPasswordValid(prev => validatePassword(currUser.password));
        setIsPasswordSame(prev => currUser.password === currUser.confirmPassword);
		
	}

	return (
		<form className='form login-form'>
			<h2>Sigup</h2>
			<TextField 
				required
				name='name' 
				label="Name" 
				value={user.name} 
				variant="standard" 
				onChange={handleChange}
				sx={{ width: '300px',marginBottom:'10px'}}
				
			/>
            <TextField 
                required
                error={!isEmailValid}
                helperText={!isEmailValid ? "Invalid email format" : ""}
                name='email' 
                label="Email" 
                value={user.email} 
                variant="standard" 
                onChange={handleChange}
                sx={{ width: '300px',marginBottom:'20px'}}

            />
			<TextField 
				required
				error={!isPasswordValid}
				type='password'
				name='password' 
				label="Password" 
				value={user.password} 
				variant="standard" 
				onChange={handleChange}
				helperText={
					isPasswordValid ? "":"Password must contain a capital,special and 8 characters."
				}
				sx={{ width: '300px',marginBottom:'20px'}}
			/>
            <TextField 
				required
				error={!isPasswordSame}
				helperText={!isPasswordSame ? "Please enter same password" : ""}
				type='password'
				name='confirmPassword' 
				label="Confirm Password" 
				value={user.confirmPassword} 
				variant="standard" 
				onChange={handleChange}
				sx={{ width: '300px',marginBottom:'20px'}}
				
			/>
			

            <button className='submit-btn' onClick={handleSubmit}>
				{isPending ? "Loading...":"Sigup"}
			</button>
			
			<span>Already have a account?</span>
			<a id="redirect" onClick={goToLogin}>Login</a>
			
		</form>
			
		
  )
}

export default Signup;
