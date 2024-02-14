
import LaneWrapper from './LaneWrapper/LaneWrapper';


const Swimlanes = ({allTask,allUsers,currBoard}) => {
    
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
            const userId = userMap[task?.userId];
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

    const preProcess=()=>{
        const groupedTask=groupTasksByUserId();
        for(const key in groupedTask){
            const val=groupedTask[key];
            keyValArray.push([key,val]);
        }
        
    }
    preProcess();
    
    let k=0;
    const render=keyValArray.map(a=>{
        return <LaneWrapper key={k++} userTag={a[0]} allTaskForUser={a[1]} currBoard={currBoard}/>
    })

    
    return (
        <div className='mt-20'>
            {
                render
            }
        </div>
        
    )
}


export default Swimlanes;
