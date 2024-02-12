import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import './Signup.css';
import { toast } from 'react-hot-toast';


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
				
				if(res.statusCode && (""+res.statusCode).startsWith("2")){
					toast.success("Signed in! Please login");
					setIsPending(false);
					goToLogin();	
				}
				else{
					toast.error(res.message || "something went wrong!");
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
			<div className='flex items-center'>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-2 mt-2">
					<path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
				</svg>

				<TextField 
					required
					name='name' 
					label="Name" 
					value={user.name} 
					variant="standard" 
					onChange={handleChange}
					sx={{ width: '300px',marginBottom:'10px'}}
					
				/>
			</div>
			<div className='flex items-center'>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-3">
					<path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
					<path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
				</svg>
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
			</div>
			<div className='flex items-center'>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-3">
					<path fill-rule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
				</svg>
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
			</div>
			<div className='flex items-center'>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-3">
					<path fill-rule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
				</svg>
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
			</div>
			

            <button className='submit-btn' onClick={handleSubmit}>
				{isPending ? "Loading...":"Sigup"}
			</button>
			
			<span>Already have a account?</span>
			<a id="redirect" onClick={goToLogin}>Login</a>
			
		</form>
			
		
  )
}

export default Signup;
