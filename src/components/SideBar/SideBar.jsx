import * as React from 'react';
import './SideBar.css'
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import { UserContext } from '../../contexts/UserContextProvider';

function SideBar({allBoards,setCurrBoardFromChild,cnts}) {
    const {user} =React.useContext(UserContext);


    const handleChangeBoard=(boardId)=>{
        setCurrBoardFromChild(boardId);
    }

    const logout=()=>{
        localStorage.removeItem('jwtToken');
        
        window.location.reload();
    }

    const allBoardsLinks=allBoards.map(board => {
        return (
            <a key={board.boardId} onClick={() => handleChangeBoard(board?.boardId)} id='hover' className=" cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 text-start">
                <span className="mx-2 text-sm font-medium">{board?.title}</span>
            </a>
        )
    })

return (
    
        <aside id='aside' className="flex flex-col h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <a className="pointer-events-none" href="#">
                <img className="w-auto h-7 mx-auto" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="logo" />
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs font-bold text-gray-500 uppercase dark:text-gray-400">Overview</label>
                        <table className="border-collapse">
                            <tbody>
                                <tr>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                        <path fill-rule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z" clip-rule="evenodd" />
                                    </svg>
                                    <span className="mx-2 text-sm font-medium">In Progress</span>
                                </td>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                                    <span className="text-xs inline-flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">{cnts.inprogress}</span>
                                </td>
                                </tr>
                                <tr>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                        <path fill-rule="evenodd" d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z" clip-rule="evenodd" />
                                    </svg>

                                    <span className="mx-2 text-sm font-medium">Blocker</span>
                                </td>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                                    <span className="text-xs inline-flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">{cnts.blocker}</span>
                                </td>
                                </tr>
                                <tr>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                    </svg>
                                    <span className="mx-2 text-sm font-medium">Completed</span>
                                </td>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                                    <span className="text-xs inline-flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">{cnts.complete}</span>
                                </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400 ">Boards</label>
                        <div className='max-h-[400px] overflow-y-auto scrollbar'>
                            {allBoardsLinks}    
                        </div>

                    </div>

                </nav>
            </div>
            
                <div className='avatar'>
                    <Avatar sx={{ width: 30, height: 30,bgcolor: green[400] }}>{user.name[0]}</Avatar>
                    <span style={{color:'white'}}>{(user.name.split(" "))[0]}</span>
                </div>
                <div className='avatar mt-2 pl-[20px] text-white' >
                    <span onClick={logout} className='cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 rounded-md hover:text-gray-700 p-1'>
                        Logout
                    </span>
                </div>
        </aside>

    
)

}


export default SideBar;
