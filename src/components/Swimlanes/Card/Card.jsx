import React, { useState } from 'react'
import DropDownMenu from './DropDownMenu';
import './Card.css'
import { Comment } from './Comment';
import AssignTaskForm from './AssignTaskForm';

const Card = ({task,visible,setCurrTaskUtil,status,setStatus,boardId}) => {
  const left=(status === 'COMPLETE');
  const [showComment,setShowComment] = useState(false);
  const [showAssignForm,setShowAssignForm] = useState(false);

  const commentSection= <Comment taskId={task.taskId}/>

  return (
    <>
      <div className={`${visible ? "opacity-90":"opacity-0 pointer-events-none"} pl-5 pr-1 w-[25%] card relative min-w-[200px] min-h-[200px] bg-white text-black mb-[20px] rounded-lg flex`}>
          <div className='w-[100%] min-w-[200px] min-h-[200px] flex flex-col justify-between'>
            <div>
              <DropDownMenu setStatus={setStatus} task={task} status={task.status} setCurrTaskUtil={setCurrTaskUtil} />
              <div className='flex flex-col items-start'>
                  <h2 className='mt-10 mb-1 font-semibold text-start'>{task.title}</h2>
                  <span className='text-start w-[100%]'>{task.description}</span>
              </div>
            </div>
            <button className='mb-3 underline' onClick={()=> setShowComment(prev => !prev)}>{!showComment? 'Show ': 'Hide '} Comments</button>
          </div>

          {
            showComment 
              && 
            <div className={`rounded-lg bg-white absolute ${left ? 'left-[-210px]':'right-[-210px]'} min-w-[200px] h-[200px]`}>
              {commentSection}
            </div>
          }
          <button onClick={()=> setShowAssignForm(prev => !prev)} className='absolute text-sm font-semibold mt-1'>Assign To</button>
          {
            visible && boardId && task 
            && showAssignForm &&
            <div className='w-[20px]'>
              <AssignTaskForm boardId={boardId} taskId={task.taskId} setShowAssignForm={setShowAssignForm}/>
            </div>
          }
          
      </div>
      
      
      
    </>
  )
}
export default Card;


  

