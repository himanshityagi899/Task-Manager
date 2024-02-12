import Card from '../Card/Card';
import React, { useEffect, useState } from 'react'

const Lane = ({task,currBoard}) => {
    const curr=task;
    const [currTask,setCurrTask] = useState(task);
    
    const setCurrTaskUtil=(newStatus)=>{
        setCurrTask(prev => {
            let newTask={...curr}
            newTask['status']=newStatus;

            return newTask;
        })
    }

    
    return (
        <>
            {(currTask && currBoard) && 
                <div className='flex justify-around'>
                    <Card status={currTask.status} task={task} setCurrTaskUtil={setCurrTaskUtil}  visible={currTask.status==="INPROGRESS"} boardId={currBoard.boardId}/>
                    <Card status={currTask.status} task={task} setCurrTaskUtil={setCurrTaskUtil}  visible={currTask.status==="BLOCKER"} boardId={currBoard.boardId}/>
                    <Card status={currTask.status} task={task} setCurrTaskUtil={setCurrTaskUtil}  visible={currTask.status==="COMPLETE"} boardId={currBoard.boardId}/>
                </div>
            }
        </>
    )
}

export default Lane;
