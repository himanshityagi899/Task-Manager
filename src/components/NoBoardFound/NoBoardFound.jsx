import React from 'react'

const NoBoardFound = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="text-center">
      {/* <h1 className="text-9xl text-gray-800 font-bold mb-4"></h1> */}
        <h1 className="text-4xl text-gray-800 font-bold mb-4">No Board Found, Ask Your Manager To Add You.!</h1>
        {/* <p className="text-lg text-gray-600"></p> */}
      </div>
    </div>
  )
}

export default NoBoardFound;