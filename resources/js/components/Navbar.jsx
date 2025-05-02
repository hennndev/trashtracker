import React, { useState } from 'react'
import { usePage, router } from '@inertiajs/react'
import { LuCircleUserRound } from "react-icons/lu"

const Navbar = () => {

  const [dropdown, setDropdown] = useState(false)
  const { auth } = usePage().props

  return (
    <header className='flex-between py-2 px-4'>
      <h1 className='font-black text-xl text-[#16C47F]'>TrashTrack</h1>
      {auth.user && (
        <div className='relative'>
          <LuCircleUserRound className='text-2xl text-gray-600' onClick={() => setDropdown(!dropdown)}/>
          {dropdown && (
            <div className='min-w-[150px] absolute flex items-start flex-col space-y-2 top-6 right-0 bg-white shadow-md rounded-md py-3 px-5'>
              <p className='text-sm line-clamp-1 text-gray-500'>Hai, {auth.user?.name}</p>
              <button className='text-sm mt-2' onClick={() => router.visit("/")}>Beranda</button>
              <button className='text-sm' onClick={() => router.visit("/dashboard")}>Dashboard</button>
              <button className='text-sm' onClick={() => router.visit("/report")}>Report</button>
              <button className='text-sm' onClick={() => router.visit("/history")}>History</button>
              <button className='text-sm text-red-400' onClick={() => router.post("/logout")}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar