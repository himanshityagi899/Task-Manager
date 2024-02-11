import Card from '../Card/Card';
import React, { useEffect, useState } from 'react'

const Lane = ({task}) => {
    const curr=task;
    const [currTask,setCurrTask] = useState(curr);
    


    useEffect(()=>{
        
    },[]);

    return (
        <div className='flex justify-around'>
            <Card status={currTask.status} task={task} setCurrTask={setCurrTask}  visible={currTask.status==="INPROGRESS"}/>
            <Card status={currTask.status} task={task} setCurrTask={setCurrTask}  visible={currTask.status==="BLOCKER"}/>
            <Card status={currTask.status} task={task} setCurrTask={setCurrTask}  visible={currTask.status==="COMPLETE"}/>
        </div>
    )
}

export default Lane;
