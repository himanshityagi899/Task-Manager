import React from 'react'
import DropDownMenu from './DropDownMenu';
import './Card.css'
const Card = ({task,visible,setCurrTask}) => {
  return (
    <>
   

    <div className={`${visible ? "opacity-90":"opacity-0"} pl-5 w-[25%] card relative min-w-[200px] min-h-[200px] bg-white text-black mb-[20px] rounded-lg flex flex-col items-start justify-between`}>
        <DropDownMenu task={task} status={task.status} setCurrTask={setCurrTask} />
        <div className='flex flex-col items-start'>
            <h2 className='mt-10 font-semibold'>{task.title}</h2>
            <span className='text-start'>{task.description}</span>
        </div>
        <PostCommentComponent/>
    </div>
    </>
  )
}
export default Card;

const PostCommentComponent = () => (
    <div className="flex items-center mb-2">
      <input type="text" className="  scale-60  h-[80%] w-[80%] border border-gray-300 rounded-l-md py-2 px-4" placeholder="Write a comment..." />
      <button className="bg-[#0B2447] mr-[10%] scale-60 h-[80%] text-white px-1 rounded-r-md">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
      </svg>


      </button>
    </div>
  );
  

