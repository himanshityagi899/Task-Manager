import Card from '../Card/Card';
import React, { useState } from 'react'

const Lane = ({task}) => {
    const [currTask,setCurrTask] = useState(task);

    return (
        <div className='flex justify-around'>
            <Card task={currTask} setCurrTask={setCurrTask} visible={currTask.status==="INPROGRESS"}/>
            <Card task={currTask} setCurrTask={setCurrTask} visible={currTask.status==="BLOCKER"}/>
            <Card task={currTask} setCurrTask={setCurrTask} visible={currTask.status==="COMPLETE"}/>
        </div>
    )
}

export default Lane;
