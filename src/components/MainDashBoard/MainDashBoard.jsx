import React from 'react'
import './MainDashBoardWrapper.css'
import Swimlanes from '../Swimlanes/Swimlanes';


const MainDashBoard = ({allTask,currBoard,blur,allUsers}) => {
    

  return (
   
    <div className={`${blur ? "blurred":""} MainDashBoardWrapper`}>
        <div className='titleWrapper'>
            <h1>{currBoard?.title}</h1>
            <h4>{currBoard?.description }</h4>
        </div>

        <Swimlanes allTask={allTask} allUsers={allUsers}/>
        
    </div>
  );
}

export default MainDashBoard;