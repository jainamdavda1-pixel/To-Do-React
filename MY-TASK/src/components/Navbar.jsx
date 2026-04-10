import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between  bg-purple-700 text-white w-full h-15 items-center">
        <div className="logo">
            <span className=" text-xl mx-9">MY-TASK</span>
        </div>
        <div className=" flex text-lg gap-x-10">
            <ul className='flex gap-10'>
                <li className="cursor-pointer hover:font-bold transition-all">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
            </ul>
            </div>
            </nav>
  )
}

export default Navbar
