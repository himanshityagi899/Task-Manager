import React, { useContext, useState } from 'react'
import './MainDashBoardWrapper.css'
import Swimlanes from '../Swimlanes/Swimlanes';
import { UserContext } from '../../contexts/UserContextProvider';
import AddBoardForm from '../Dashboard/AddBoardForm/AddBoardForm';
import AddPeopleForm from '../Dashboard/AddPeopleForm/AddPeopleForm';
import AddTaskForm from '../Dashboard/AddTaskMode/AddTaskMode';

const MainDashBoard = ({allTask,currBoard,allUsers,setNewBoardAdded}) => {
  const {user} = useContext(UserContext);

  const [addBoardMode,setAddBoardMode]= useState(false);
  const [addPeopleMode,setAddPeopleMode] = useState(false);
  const [addTaskMode,setAddTaskMode] = useState(false);
  let allTaskForThisUser=allTask;

  const addTask=(task)=>{
    allTaskForThisUser.push(task);
  }

  const blur=(addBoardMode || addPeopleMode || addTaskMode);

  return (
    
      <div className='MainDashBoardWrapper min-w-[700px]'>
      
        <div className={`${blur ? "blurred":""}`}>

        
          <div className='flex justify-between titleWrapper '>
            <div className='flex flex-col items-start'>
              <h1 className='font-bold text-3xl text-start'>{currBoard?.title}</h1>
              <h4 className='text-xl text-start'>{currBoard?.description }</h4>
            </div>
            <div className='flex'>
              <div onClick={() => setAddTaskMode(prev => !prev)} className={` addBoard ${blur ? 'blurred':''}`}>
                Add Task
              </div>
              {/* if manager show Add Board button */}
              {user.role==="MANAGER" && 
                    <div onClick={() => setAddBoardMode(prev => !prev)} className={` addBoard ${blur ? 'blurred':''}`}>
                        Add Board
                    </div>
              }
                {/* if manager show Add People to Board button */}
              {user.role==="MANAGER" && 
                  <div onClick={() => setAddPeopleMode(prev => !prev)} className={` addBoard ${(blur) ? 'blurred':''}`}>
                      Add People
                  </div>
              }
            </div>
          </div>

          <Swimlanes allTask={allTaskForThisUser} allUsers={allUsers}/>
                  
        </div>
        {/* toggle addBoardMode */}
        {
          addBoardMode && 
          <div className='middleFormWrapper'>
              <AddBoardForm setAddBoardMode={setAddBoardMode} setNewBoardAdded={setNewBoardAdded}/>
          </div>
        }

        {/* toggle addPeopleMode */}
        {
            addPeopleMode &&
            <div className='middleFormWrapper'>
                <AddPeopleForm allUsers={allUsers} setAddPeopleMode={setAddPeopleMode} boardId={currBoard.boardId}/>
            </div>
        }

        {
          addTaskMode && 
          <div className='middleFormWrapper'>
                <AddTaskForm addTask={addTask} setAddTaskMode={setAddTaskMode} boardId={currBoard.boardId}/>
          </div>
        }
    
    </div>
    
  );
}

export default MainDashBoard;