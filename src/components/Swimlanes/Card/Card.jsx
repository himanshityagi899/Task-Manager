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
            <p>{task.description}</p>
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
      <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 5l7 7-7 7"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 5l7 7-7 7"
    />
  </svg>
      </button>
    </div>
  );
  

