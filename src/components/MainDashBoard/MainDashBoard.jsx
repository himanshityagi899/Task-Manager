import React from 'react'
import './MainDashBoardWrapper.css'


const MainDashBoard = ({currBoard,blur}) => {
    
  return (
   
    <div className={`${blur ? "blurred":""} MainDashBoardWrapper`}>
        

        <div className='titleWrapper'>
            <h1>{currBoard?.title}</h1>
            <h4>{currBoard?.description }</h4>
        </div>

        <div className='laneSection'>
            <div className="laneWrapper">
                <div className='laneTag inProgress'>In Progress</div>
                <div className="lane"></div>
            </div>

            <div className="laneWrapper">
                <div className='laneTag blocker'>Blocker</div>
                <div className="lane"></div>
            </div>

            <div className="laneWrapper">
                <div className='laneTag completed'>Completed</div>
                <div className="lane"></div>
            </div>
        </div>
        
    </div>
  );
}

{/* <div className="lane">1</div>
        <div className="lane">2</div>
        <div className="lane">3</div> */}

export default MainDashBoard;