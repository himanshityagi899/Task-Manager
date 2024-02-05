import * as React from 'react';
import './SideBar.css'
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import { UserContext } from '../../contexts/UserContextProvider';

function SideBar({allBoards,setCurrBoardFromChild}) {
    const {user} = React.useContext(UserContext);
    const handleChangeBoard=(boardId)=>{
        setCurrBoardFromChild(boardId);
    }

    const allBoardsLinks=allBoards.map(board => {
        return (
            <a key={board.boardId} onClick={() => handleChangeBoard(board?.boardId)} id='hover' class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                <span class="mx-2 text-sm font-medium">{board?.title}</span>
            </a>
        )
    })

return (
    
        <aside id='aside' class="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <a class="pointer-events-none" href="#">
                <img class="w-auto h-7 mx-auto" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="logo" />
            </a>

            <div class="flex flex-col justify-between flex-1 mt-6">
                <nav class="-mx-3 space-y-6 ">
                    <div class="space-y-3 ">
                        <label class="px-3 text-xs font-bold text-gray-500 uppercase dark:text-gray-400">Overview</label>
                        <table class="border-collapse">
                            <tbody>
                                <tr>
                                <td class="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 flex items-center">
                                    <span class="mx-2 text-sm font-medium">In Progress</span>
                                </td>
                                <td class="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                                    <span class="text-xs inline-flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">5</span>
                                </td>
                                </tr>
                                <tr>
                                <td class="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 flex items-center">
                                    <span class="mx-2 text-sm font-medium">Blocker</span>
                                </td>
                                <td class="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                                    <span class="text-xs inline-flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">5</span>
                                </td>
                                </tr>
                                <tr>
                                <td class="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 flex items-center">
                                    <span class="mx-2 text-sm font-medium">Completed</span>
                                </td>
                                <td class="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                                    <span class="text-xs inline-flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">5</span>
                                </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div class="space-y-3 ">
                        <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Boards</label>

                        {allBoardsLinks}

                    </div>

                </nav>
            </div>
            <div className='avatar'>
           
                <Avatar sx={{ width: 30, height: 30,bgcolor: green[400] }}>{user.name[0].split(" ")}</Avatar>
                <span style={{color:'white'}}>{user.name}</span>
            </div>
        </aside>

    
)

}


export default SideBar;
