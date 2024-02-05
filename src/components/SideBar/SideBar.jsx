import * as React from 'react';
import './SideBar.css'
function SideBar() {
    

return (
    
        <aside id='aside' class="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <a class="pointer-events-none" href="#">
                <img class="w-auto h-7 mx-auto" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="logo" />
            </a>

            <div class="flex flex-col justify-between flex-1 mt-6">
                <nav class="-mx-3 space-y-6 ">
                    <div class="space-y-3 ">
                        <label class="px-3 text-xs font-bold text-gray-500 uppercase dark:text-gray-400">Overview</label>

                        <p id='hover' class="flex items-center  px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200" href="#">
                            <span class="mx-2 text-sm font-medium">In Progres</span>
                            <span class=" text-xs inline-block h-4 w-4 bg-green-500 rounded-full flex items-center justify-center text-white">5</span>

                        </p>
                        <p class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ray-100" href="#">
                            <span class="mx-2 text-sm font-medium">Blocker</span>
                            <span class=" text-xs inline-block h-4 w-4 bg-green-500 rounded-full flex items-center justify-center text-white">5</span>

                        </p>
                        <p class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 " href="#">
                            <span class="mx-2 text-sm font-medium">Completed</span>
                            <span class=" text-xs inline-block h-4 w-4 bg-green-500 rounded-full flex items-center justify-center text-white">5</span>

                        </p>
                    </div>

                    <div class="space-y-3 ">
                        <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Boards</label>

                        <a id='hover' class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                            <span class="mx-2 text-sm font-medium">Board 1</span>
                        </a>

                        <a id='hover' class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                            
                            <span class="mx-2 text-sm font-medium">Board 2</span>
                        </a>

                        <a id='hover' class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                            <span class="mx-2 text-sm font-medium">Board 3</span>
                        </a>
                    </div>

                </nav>
            </div>
        </aside>

    
)

}


export default SideBar;
