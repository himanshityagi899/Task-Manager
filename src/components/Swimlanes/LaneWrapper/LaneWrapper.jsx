import React, { useContext, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Lane from '../Lane/Lane';
import toast from 'react-hot-toast';
import { UserContext } from '../../../contexts/UserContextProvider';

const LaneWrapper = ({userTag,allTaskForUser}) => {
    const {user} = useContext(UserContext);

    const [showMail,setShowMail] = useState(false);

    const userName=userTag.split('(')[0];
    let userEmail=(userTag.split('(')[1]);
    userEmail=userEmail.substring(0, userEmail. length - 1);
    
    const copyMail=(event)=>{
        event.stopPropagation();
        navigator.clipboard.writeText(userEmail)
            .then(() => {
                toast.success('Email copied to Clipboard')
                
            })
            .catch(error => {
                toast.error('error while coping to clipboard')
               
            });
    }

    let k=100;
   
    const lanes=allTaskForUser.map(task => {
        
        return <Lane key={k++} task={task}/>
    });

    

    return (
        <div id="laneWrapper" className='mb-[30px] pl-10'>
            
            <Accordion sx={{backgroundColor:'rgb(18,24,38)',color:'white'}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <div className='flex justify-between w-[100%] items-center realtive'>
                    {userName+(user.email == userEmail ? " (You)":"")}
                    <svg className='mr-[5px] w-[30px]'
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                        onMouseEnter={()=> setShowMail(true)}
                        onMouseLeave={()=> setShowMail(false)}
                        onClick={copyMail}
                        >
                        <path
                            fill="currentColor"
                            d="M22 4H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.32l-8 5.33-8-5.33V6l8 5.33 8-5.33z"
                        />
                    </svg>
                    <span className={`${showMail ? "opacity-100":"opacity-0"} absolute right-[25px] top-[-25px] bg-[rgb(18,24,38)] rounded-md text-white px-2 py-1 text-xs `}>
                        {userEmail} 
                    </span>
                </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='w-100 flex justify-around mb-10 font-semibold'>
                        <span>InProgress</span>
                        <span>Blocker</span>
                        <span>Completed</span>
                    </div>
                    {lanes}
                </AccordionDetails>
            </Accordion>    
            
        </div>
    )
}

export default LaneWrapper;