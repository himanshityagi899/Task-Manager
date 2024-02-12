import Card from '../Card/Card';
import React, { useEffect, useState } from 'react'

const Lane = ({task}) => {
    const curr=task;
    const [currTask,setCurrTask] = useState(curr);
    
    const setCurrTaskUtil=(newStatus)=>{
        setCurrTask(prev => {
            let newTask={...curr}
            newTask['status']=newStatus;

            return newTask;
        })
    }

    useEffect(()=>{
        
    },[]);

    return (
        <div className='flex justify-around'>
            <Card status={currTask.status} task={task} setCurrTaskUtil={setCurrTaskUtil}  visible={currTask.status==="INPROGRESS"}/>
            <Card status={currTask.status} task={task} setCurrTaskUtil={setCurrTaskUtil}  visible={currTask.status==="BLOCKER"}/>
            <Card status={currTask.status} task={task} setCurrTaskUtil={setCurrTaskUtil}  visible={currTask.status==="COMPLETE"}/>
        </div>
    )
}

export default Lane;
