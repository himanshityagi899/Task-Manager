import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Lane from '../Lane/Lane';

const LaneWrapper = ({userTag,allTaskForUser}) => {


    let k=100;
    const lanes=allTaskForUser.map(task => {
        return <Lane key={k++} task={task}/>
    });

    return (
        <div id="laneWrapper" className='mb-[20px] pl-10'>
            
            <Accordion sx={{backgroundColor:'#0B2447',color:'white'}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                {userTag}
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