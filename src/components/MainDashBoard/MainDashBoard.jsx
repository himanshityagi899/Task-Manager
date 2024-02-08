import React, { useContext, useState } from 'react'
import './MainDashBoardWrapper.css'
import Swimlanes from '../Swimlanes/Swimlanes';
import { UserContext } from '../../contexts/UserContextProvider';
import AddBoardForm from '../Dashboard/AddBoardForm/AddBoardForm';
import AddPeopleForm from '../Dashboard/AddPeopleForm/AddPeopleForm';


const MainDashBoard = ({allTask,currBoard,allUsers,setNewBoardAdded}) => {
  const {user} = useContext(UserContext);

  const [addBoardMode,setAddBoardMode]= useState(false);
  const [addPeopleMode,setAddPeopleMode] = useState(false);
  const blur=(addBoardMode || addPeopleMode);

  return (
    
      <div className={`MainDashBoardWrapper`}>
      
        <div className={`${blur ? "blurred":""}`}>

        
          <div className='flex justify-between titleWrapper '>
            <div className='flex flex-col items-start'>
              <h1 className='font-bold text-3xl'>{currBoard?.title}</h1>
              <h4 className='text-xl'>{currBoard?.description }</h4>
            </div>
            <div className='flex'>
              {/* if manager show Add Board button */}
              {user.role==="MANAGER" && 
                    <div onClick={() => setAddBoardMode(prev => !prev)} className={` addBoard ${addPeopleMode || addBoardMode ? 'blurred':''}`}>
                        Add Board
                    </div>
                }
                {/* if manager show Add People to Board button */}
                {user.role==="MANAGER" && 
                    <div onClick={() => setAddPeopleMode(prev => !prev)} className={` addBoard ${(addPeopleMode || addBoardMode) ? 'blurred':''}`}>
                        Add People
                    </div>
                }
                
            </div>
          </div>

          <Swimlanes allTask={allTask} allUsers={allUsers}/>
                  
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
    
    </div>
    
  );
}

export default MainDashBoard;