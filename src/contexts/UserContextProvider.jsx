/* eslint-disable no-unused-vars */
import {createContext,useState,useEffect} from 'react';

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
			const url=`url-to-be-used`;
			
			fetch(url, {
				method: 'GET',
				credentials:'include',
				signal
			})
			.then(res => res.json())
			.then(res =>{
				// set user and isLoggedIn here
			})
			.catch(error=>{
				console.log("error",error);
				// handle error here
			});
			
		}
		
        // will call getUser when it is implemented
		// getUser();

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