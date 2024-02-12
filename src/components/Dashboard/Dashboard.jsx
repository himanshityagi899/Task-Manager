import React, {useEffect, useState } from 'react'
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import SideBar from '../SideBar/SideBar';
import MainDashBoard from '../MainDashBoard/MainDashBoard';
import './Dashboard.css';
import NoBoardFound from '../NoBoardFound/NoBoardFound';
import Loading from '../Loading/Loading';

const Dashboard = () => {

    /* states used to store data */
        // board
    const [myAllBoards,setMyAllBoards]=useState([]);
    const [currBoard,setCurrBoard]=useState(null);

        // user
    const [allUsers,setAllusers] = useState([]);
    
        // task
    const [allTask,setAllTask] = useState([]);
    
    /* states used to reflect events */
    const [newBoardAdded,setNewBoardAdded] = useState(true);
    const [isPending,setIsPending] = useState(false);
    

    const setCurrBoardFromChild=(boardId)=>{
        const board=myAllBoards.filter(board => board.boardId==boardId);
        setCurrBoard(prev => board[0]);
        getAllTasks(boardId);
    }

    const getTaskCnt=()=> {
        return allTask.reduce((counts, task) => {
          counts[task.status.toLowerCase()]++;
          return counts;
        }, { inprogress: 0, blocker: 0, complete: 0 });
    }

    const getAllTasks = (boardId)=>{

        const controller = new AbortController();
		const signal = controller.signal;
        const token=localStorage.getItem('jwtToken');

        const url=process.env.REACT_APP_BASE_URL+'/task/'+boardId;
        try{
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
                    setAllTask(res.data);
                    
                }
                
                setIsPending(false);
            });
        }catch(error){
            console.log('error 💥:',error);
            
            setIsPending(false);
        }
    }
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const token = localStorage.getItem('jwtToken');
    
        const getData = async () => {
            if (!token) return;
    
            let url = process.env.REACT_APP_BASE_URL + '/board/myBoard';
    
            try {
                setIsPending(true);
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    signal
                });
                
                if (response.data.statusCode && ("" + response.data.statusCode).startsWith("2")) {
                    setMyAllBoards(response.data.data);
                    if (response.data.data.length > 0) {
                        setCurrBoard(response.data.data[0]);
                        getAllTasks(response.data.data[0].boardId);
                    }
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.log('Error fetching my boards:', error);
                }
            }

            url = process.env.REACT_APP_BASE_URL + '/user';
    
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    signal
                });
    
                const data = await response.json();
                if (data.statusCode && ("" + data.statusCode).startsWith("2")) {
                    setAllusers(data.data);
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.log('Error fetching all users:', error);
                }
            } finally {
                setIsPending(false);
            }
        
        };
    
        getData();
        
    
        return () => {
            controller.abort(); // Cleanup function to abort fetch requests on component unmount
        };
    }, [newBoardAdded]);
    

    const noBoardFound=(
        <Grid xs={9.76}>   
            <NoBoardFound/>
        </Grid>
    )
    
    

    return (
        
        <Grid style={{ height: '100vh' ,width:'100vw'}} container spacing={0}>
            
            <Grid xs={2.24} >
                <SideBar cnts={getTaskCnt()} allBoards={myAllBoards} setCurrBoardFromChild={setCurrBoardFromChild}/>
            </Grid>
            {isPending ? 
                <Loading/>
                :
                (currBoard==null ? 
                
                noBoardFound
                    :
                <Grid xs={9.76} sx={{overflow:'scroll'}}>   
                        <MainDashBoard 
                            allTask={allTask} 
                            allUsers={allUsers} 
                            currBoard={currBoard}
                            setNewBoardAdded={setNewBoardAdded}
                        />
                </Grid>)
            }           
        </Grid>
    )
}


export default Dashboard;
