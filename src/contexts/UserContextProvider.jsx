/* eslint-disable no-unused-vars */
import {createContext,useState,useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const UserContext = createContext({user:null,isLogedIn:false,err:null});


export const UserContextProvider = ({children})=>{

    const [user,setUser] = useState(null);
	const [isLogedIn,setIsLogedIn] = useState(false);
	const [err,setErr] = useState(null);


	const setLoggedIn=(loggedIn)=>{
		console.log("called");
		setIsLogedIn(prev => loggedIn);
		
	}
	
	useEffect(()=>{
		const controller = new AbortController();
		const signal = controller.signal;

		const getUser= ()=>{

			const token=localStorage.getItem('jwtToken');
	
			if(token==null) return;
			
			fetch('http://localhost:8081/api/v1/user/getMe', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
				},
				signal
			})
			.then(res => res.json())
			.then(res =>{
				console.log(res);
				setUser(prev => res.data);
				setIsLogedIn(prev => true);
				
			})
			.catch(error=>{
				console.log("error",error);
			});
			
		}
		
        // will call getUser when it is implemented
		getUser();

		return ()=>{
			controller.abort();
		}

	},[]);

	const values={
		user,
		setUser,
		isLogedIn,
		setIsLogedIn,
		setLoggedIn,
		err,
		setErr
	}

    return (
        <UserContext.Provider value={values}> {children} </UserContext.Provider>
    );
}