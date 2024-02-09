import React, { useContext, useState } from 'react'
import LaneWrapper from './LaneWrapper/LaneWrapper';
import { UserContext } from '../../contexts/UserContextProvider';

const Swimlanes = ({allTask,allUsers}) => {
    
    const groupTasksByUserId = () => {
        // Create a map of user ID to user name and email
        const userMap = allUsers.reduce((map, user) => {
            map[user.userId] = user.name + "(" + user.email + ")";
            return map;
        }, {});
    
        // Group tasks by user ID and sort them by status
        return allTask.reduce((groups, task) => {
            const userId = userMap[task.userId];
            if (!groups[userId]) {
                groups[userId] = [];
            }
            groups[userId].push(task);
            return groups;
        }, {});
    };
    
    return (
        <div className='mt-20'>
            {
                Object.entries(groupTasksByUserId()).map(([userId, tasks], index) => (
                    <LaneWrapper key={index} userTag={userId} allTaskForUser={tasks} />
                ))
            }
        </div>
        
    )
}


export default Swimlanes;
