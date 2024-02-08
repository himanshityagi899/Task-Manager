import React, { useContext, useState } from 'react'
import LaneWrapper from './LaneWrapper/LaneWrapper';
import { UserContext } from '../../contexts/UserContextProvider';

const Swimlanes = ({allTask,allUsers}) => {
    const {user} = useContext(UserContext);

    const groupTasksByUserId=()=> {
        const userMap=allUsers.reduce((map, user) => {
            map[user.userId] = user.name+"("+user.email+")";
            return map;
        }, {});

        function sortTasksByStatus(tasks) {
            const statusOrder = { INPROGRESS: 1, BLOCKER: 2, COMPLETE: 3 };
            tasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        }

        const groupedTask=allTask.reduce((groups, task) => {
            const userId = userMap[task.userId];
            if (!groups[userId]) {
            groups[userId] = []; 
            }
            groups[userId].push(task); 
            return groups;
        }, {});

        Object.values(groupedTask).forEach(task => sortTasksByStatus(task));
        
        
        return groupedTask;
    }
    
    let keyValArray=[];
    console.log(user,allTask)
    const preProcess=()=>{
        const groupedTask=groupTasksByUserId();
        console.log('grouped task',groupedTask);
        for(const key in groupedTask){
            const val=groupedTask[key];
            keyValArray.push([key,val]);
        }
        
    }
    preProcess();
    
    let k=0;
    const render=keyValArray.map(a=>{
        return <LaneWrapper key={k++} userTag={a[0]} allTaskForUser={a[1]} />
    })

    return (
        <div className='mt-20'>
            {render}
        </div>
        
    )
}


export default Swimlanes;
