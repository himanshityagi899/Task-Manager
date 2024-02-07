import React, { useContext, useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { UserContext } from '../../contexts/UserContextProvider';
import SideBar from '../SideBar/SideBar';
import MainDashBoard from '../MainDashBoard/MainDashBoard';
import AddBoardForm from './AddBoardForm/AddBoardForm';
import './Dashboard.css';
import AddPeopleForm from './AddPeopleForm/AddPeopleForm';
import NoBoardFound from '../NoBoardFound/NoBoardFound';

const Dashboard = () => {
    const {user} = useContext(UserContext);

    /* states used to store data */
        // board
    const [myAllBoards,setMyAllBoards]=useState([]);
    const [currBoard,setCurrBoard]=useState(null);

        // user
    const [allUsers,setAllusers] = useState([]);

    /* states used to reflect events */
    const [newBoardAdded,setNewBoardAdded] = useState(false);
    const [addBoardMode,setAddBoardMode]= useState(false);
    const [addPeopleMode,setAddPeopleMode] = useState(false);

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
            // console.log(url);
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
                
                if(res.statusCode && (""+res.statusCode).startsWith("2")){
                    setMyAllBoards(res.data);
                    if(res.data.length > 0){
                        setCurrBoard(res.data[0]);
                    }
                }
            });
        }
        const getAllUsers = ()=>{

			const token=localStorage.getItem('jwtToken');
	
			if(token==null) return;

            const url=process.env.REACT_APP_BASE_URL+'/user';
            
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
                console.log(res.data);
                if(res.statusCode && (""+res.statusCode).startsWith("2")){
                    setAllusers(prev => res.data);
                }
            });
        }

        getMyAllBoards();
        getAllUsers();
    },[newBoardAdded]);

    const noBoardFound=(
        <Grid xs={9.76}>   
            <NoBoardFound/>
        </Grid>
    )

    return (
        
        <Grid style={{ height: '100vh' ,width:'100vw'}} container spacing={0}>
            

            <Grid xs={2.24}>
                <SideBar allBoards={myAllBoards} setCurrBoardFromChild={setCurrBoardFromChild}/>
            </Grid>
            {currBoard==null ? 
            
            noBoardFound
                :
            <Grid xs={9.76}>   
                {user.role==="MANAGER" && 
                    <div onClick={() => setAddBoardMode(prev => !prev)} className={`absolute top-5 right-10 addBoard ${addPeopleMode || addBoardMode ? 'blurred':''}`}>
                        Add Board
                    </div>
                }
                {user.role==="MANAGER" && 
                    <div onClick={() => setAddPeopleMode(prev => !prev)} className={`absolute top-5 right-40 addBoard ${(addPeopleMode || addBoardMode) ? 'blurred':''}`}>
                        Add People
                    </div>
                }

                {
                    addBoardMode && 
                    <div className='middleFormWrapper'>
                        <AddBoardForm setAddBoardMode={setAddBoardMode} setNewBoardAdded={setNewBoardAdded}/>
                    </div>
                }
                {
                    addPeopleMode &&
                    <div className='middleFormWrapper'>
                        <AddPeopleForm allUsers={allUsers} setAddPeopleMode={setAddPeopleMode} boardId={currBoard.boardId}/>
                    </div>
                }
                <MainDashBoard blur={addBoardMode || addPeopleMode} currBoard={currBoard}/>
            </Grid>}
        </Grid>
    )
}


export default Dashboard;
