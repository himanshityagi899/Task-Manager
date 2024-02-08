import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

import { UserContext } from '../../../contexts/UserContextProvider';
import Loading from '../../Loading/Loading';

const DropDownMenu = ({task,status,setCurrTask}) => {
  const {user}=useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending,setIsPending] = useState(false);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeStatus= async (newStatus)=>{

    const controller = new AbortController();
    const signal = controller.signal;
    const token=localStorage.getItem('jwtToken');

    
    
    const url=process.env.REACT_APP_BASE_URL+'/task/status';

    const data={
        taskId:task.taskId,
        status:newStatus
    }
    
    try{
      
      setIsPending(true);
      
        let res=await axios.put(url,data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the authorization token in the headers
            },
            signal
        });
        res=res.data;
        if(res.statusCode && (""+res.statusCode).startsWith("2")){
            toast.success("Task Status Updated!")
            setCurrTask(prev => {
                return{
                    ...prev,
                    ['status']:newStatus
                }
            });
        }
        setIsPending(false);
        
    }
    catch(error){
      
      toast.error(error.response.data.message);
      setIsPending(false);
      
    }

}

  return (
    <div className="absolute right-[2%] inline-block text-left ">
     
      <div>
        
        <button
          type="button"
          className="border-none inline-flex w-full justify-center text-xs rounded-md bg-white px-1 py-1 font-semibold text-gray-900 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          Change Status
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      
      {isOpen && (
        isPending ? 
        (
          <div className="w-[100px] absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="flex items-center pl-1" role="none">
            <FaSpinner className="animate-spin" />
              <a className="cursor-pointer text-gray-700 block px-4 py-2 text-xs hover:bg-gray-50" role="menuitem" tabIndex="-1" id="menu-item-0">Loading</a>
            </div>
          </div>
        )
        :
        (
          <div className="w-[100px] absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="" role="none">
              {status != "INPROGRESS" && <a  onClick={()=> handleChangeStatus("INPROGRESS")} className="cursor-pointer text-gray-700 block px-4 py-2 text-xs hover:bg-gray-50" role="menuitem" tabIndex="-1" id="menu-item-0">In Progress</a>}
              {status != "BLOCKER" && <a  onClick={()=> handleChangeStatus("BLOCKER")} className="cursor-pointer text-gray-700 block px-4 py-2 text-xs hover:bg-gray-50" role="menuitem" tabIndex="-1" id="menu-item-1">Blocker</a>}
              {status != "COMPLETE" && <a  onClick={()=> handleChangeStatus("COMPLETE")} className="cursor-pointer text-gray-700 block px-4 py-2 text-xs hover:bg-gray-50" role="menuitem" tabIndex="-1" id="menu-item-2">Completed</a>}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DropDownMenu;


// {isPending && 
//   <div className="fixed right-10 top-20 flex items-center justify-center bg-[rgb(18,24,38)] text-white px-4 py-2 rounded-lg shadow-lg">
//   <FaSpinner className="animate-spin mr-2" /> {/* Spinner icon */}
//   <span>Loading</span> 
// </div>
// }