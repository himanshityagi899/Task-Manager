import React, { useState,useContext } from 'react'
import TextField from '@mui/material/TextField';
import './Login.css';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../contexts/UserContextProvider';



const Login = ({handleCross}) => {
	const [user,setCurrUser] = useState({
		email:"",
		password:""
	});
	const [isEmailValid,setIsEmailValid] = useState(true);
	const [isPasswordValid,setisPasswordValid] = useState(true);
	const [isPending,setIsPending] = useState(false);

	const {setUser,setIsLogedIn} = useContext(UserContext);

	const handleSubmit =(event)=>{
		
        event.preventDefault();
        setIsPending(true); 
        
        try{
            const url=process.env.REACT_APP_BASE_URL+'/user/login';
           
            fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json' 
				},
                body: JSON.stringify(user)
			})
            .then(res => res.json())
            .then(res=>{
				
                if(!res.statusCode || res.statusCode!="200"){
					console.log(res);
                    toast.error(res.message || "something went wrong!");
                }
                else{
					console.log(res);
					setIsLogedIn(true);

					const jwtToken=res.data.token;
					localStorage.setItem('jwtToken',jwtToken);

					setUser(res.data.user);
                    toast.success("Logged in!");
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
	const goToSignup=()=>{
		handleCross("Signup")
	}
	const handleChange =(e)=>{
		const currUser={
			...user,
			[e.target.name]:e.target.value
		};
		setCurrUser(prev =>{
			return currUser;
		});
		setIsEmailValid(prev => validateEmail(currUser.email));
		setisPasswordValid(prev => validatePassword(currUser.password));
	}

	return (
		<form className='form login-form'>
			<h2>Login</h2>
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
				type='password'
				name='password' 
				label="Password" 
				value={user.password} 
				variant="standard" 
				onChange={handleChange}
				
				sx={{ width: '300px',marginBottom:'20px'}}
			/>


			<button className='submit-btn' onClick={handleSubmit}>Login</button>

			<span>Don't have a account?</span>
			<a id="redirect" onClick={goToSignup}>Signup</a>
		</form>
			
		
  )
}

export default Login;
