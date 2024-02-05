import React, { useContext, useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { UserContext } from '../../contexts/UserContextProvider';
import SideBar from '../SideBar/SideBar';
import MainDashBoard from '../MainDashBoard/MainDashBoard';

const Dashboard = () => {
    const {user} = useContext(UserContext);

    const [myAllBoards,setMyAllBoards]=useState([]);
    const [currBoard,setCurrBoard]=useState(null);

    const setCurrBoardFromChild=(boardId)=>{
        const board=myAllBoards.filter(board => board.boardId==boardId);
        setCurrBoard(prev => board[0]);
    }

    useEffect(()=>{
        
        const controller = new AbortController();
		const signal = controller.signal;

		const getMyAllBoards = ()=>{

			const token=localStorage.getItem('jwtToken');
	
			if(token==null) return;

            const url=process.env.REACT_APP_BASE_URL+'/board/myBoard';
            console.log(url);
			fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
				},
				signal
			})
            .then(res => res.json())
            .then(res=>{
                console.log(res);
                if(res.statusCode && res.statusCode == "200"){
                    setMyAllBoards(res.data);
                    if(res.data.length > 0){
                        setCurrBoard(res.data[0]);
                    }
                }
            });
        }

        getMyAllBoards();
    },[]);

    return (
        
        <Grid style={{ height: '100vh' ,width:'100vw'}} container spacing={0}>
            <Grid xs={2.24}>
                <SideBar allBoards={myAllBoards} setCurrBoardFromChild={setCurrBoardFromChild}/>
            </Grid>
            <Grid xs={9.76}>   
                
                <MainDashBoard currBoard={currBoard}/>
            </Grid>
        </Grid>
    )
}


export default Dashboard;
