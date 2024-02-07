import React from 'react'
import DropDownMenu from './DropDownMenu';

const Card = ({task,visible,setCurrTask}) => {
  return (
    <div className={`${visible ? "":"opacity-0"} w-[25%] relative min-w-[200px] min-h-[200px] bg-white text-black mb-[20px] rounded-lg`}>
        
        <DropDownMenu task={task} setCurrTask={setCurrTask} />
    </div>
  )
}
export default Card;
