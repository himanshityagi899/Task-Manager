import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const Comment = ({taskId}) => {

    const [allComments,setAllComments] = useState([]);

    const [comment,setComment] = useState("");
    const [newCommetn,setNewComment] = useState(false);

    useEffect(()=>{
        const getComments = async ()=>{
            const controller = new AbortController();
            const signal = controller.signal;
            const token = localStorage.getItem('jwtToken');
    
            const url = process.env.REACT_APP_BASE_URL + '/comment/'+taskId;
            
            try {
                let res = await axios.get(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    signal
                },);
                res=res.data;
                if (res.statusCode && ("" + res.statusCode).startsWith("2")) {
                    setAllComments(res.data);
                    
                }
            } catch (error) {
                console.log(error);
            }
        }

        getComments();
    
    },[newCommetn]);
   
    const handlePostComment = async (e)=>{
        console.log('here')
        if(comment == "") return;
        
        const controller = new AbortController();
        const signal = controller.signal;
        const token = localStorage.getItem('jwtToken');

        const url = process.env.REACT_APP_BASE_URL + '/comment';
        const data={
            taskId,
            message: comment
        }
        try {
            let res = await axios.post(url,data, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                signal
            });
            console.log(res);
            res=res.data;
            
            if (res.statusCode && ("" + res.statusCode).startsWith("2")) {
                
                toast.success("Commented Succesfully!");
                setNewComment(prev => !prev);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'something went wrong!');
        }

    }

    const commentCompents=allComments.map(comment => {
        const name=comment.commentatorName;
        const message=comment.message;

        return (
            <div className='text-sm mt-3'>
                <div className='flex ml-2 items-center'>
                    <Avatar sx={{ width: 18, height: 18,fontSize:'smaller',bgcolor:'rgb(18,24,38)' }}>{name[0]}</Avatar>
                    <div>
                        <span className='ml-1 font-medium'>{name}</span>
                    </div>
                    
                </div>
                
                <div className='text-start ml-8'>{message}</div>
            </div>
        )
    })

    return (
    <>
        <h1 className='font-semibold'>Comments</h1>

        <div className=' h-[70%] overflow-scroll mb-2'>
            {commentCompents}
        </div>

        <div className="flex items-center flex text-sm justify-center">
            <input value={comment} onChange={(e)=>{setComment(e.target.value)}} type="text" className="scale-60 h-[25px] w-[70%] border border-gray-300 rounded-l-md py-2 px-2" placeholder="Comment here..." />
            <button  onClick={handlePostComment} className="bg-[#0B2447] h-[25px] text-white px-1 rounded-r-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-5 ">
                <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
                </svg>
            </button>
            
        </div>
    </>
    )
}
