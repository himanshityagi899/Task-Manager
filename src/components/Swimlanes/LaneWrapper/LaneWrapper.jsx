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
    let userEmail=(userTag.split('(')[1])?.slice(0,-1);
   
    
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-3"
                        onMouseEnter={()=> setShowMail(true)}
                        onMouseLeave={()=> setShowMail(false)}
                        onClick={copyMail}
                    >
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        
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
                    {
                        allTaskForUser.map((task,index) => {
                            
                            return <Lane key={index} task={task}/>
                        })
                    }
                </AccordionDetails>
            </Accordion>    
            
        </div>
    )
}

export default LaneWrapper;