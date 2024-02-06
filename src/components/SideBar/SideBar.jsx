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

    const logout=()=>{
        localStorage.removeItem('jwtToken');
        
        window.location.reload();
    }

    const allBoardsLinks=allBoards.map(board => {
        return (
            <a key={board.boardId} onClick={() => handleChangeBoard(board?.boardId)} id='hover' className=" cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                <span className="mx-2 text-sm font-medium">{board?.title}</span>
            </a>
        )
    })

return (
    
        <aside id='aside' className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
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
                                    <span className="mx-2 text-sm font-medium">In Progress</span>
                                </td>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                                    <span className="text-xs inline-flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">5</span>
                                </td>
                                </tr>
                                <tr>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 flex items-center">
                                    <span className="mx-2 text-sm font-medium">Blocker</span>
                                </td>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                                    <span className="text-xs inline-flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">5</span>
                                </td>
                                </tr>
                                <tr>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 flex items-center">
                                    <span className="mx-2 text-sm font-medium">Completed</span>
                                </td>
                                <td className="px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                                    <span className="text-xs inline-flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">5</span>
                                </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Boards</label>

                        {allBoardsLinks}

                    </div>

                </nav>
            </div>
            
                <div className='avatar'>
                    <Avatar sx={{ width: 30, height: 30,bgcolor: green[400] }}>{user.name[0]}</Avatar>
                    <span style={{color:'white'}}>{(user.name.split(" "))[0]}</span>
                </div>
                <div className='avatar mt-5 ml-10 text-white' >
                    <span onClick={logout} className='cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 rounded-lg hover:text-gray-700 p-2'>
                        Logout
                    </span>
                </div>
        </aside>

    
)

}


export default SideBar;
