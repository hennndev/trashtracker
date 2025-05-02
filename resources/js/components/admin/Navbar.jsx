import React, { useState } from 'react'
import { usePage, router } from '@inertiajs/react'
import { LuBell, LuCircleUserRound } from 'react-icons/lu'

const Navbar = ({title}) => {
  const [dropdown, setDropdown] = useState(false)
  const { auth } = usePage().props

  return (
    <header className='flex-between w-full p-5 border-b border-gray-200'>
      <h2 className='text-xl font-semibold'>{title}</h2>

      <div className='flexx space-x-3'>
        <div className='relative'>
          <LuBell className='text-xl text-gray-500' />
          <div className='absolute -top-3 -right-2 flex-center w-5 h-5 rounded-full bg-red-500 text-xs text-white'>10</div>
        </div>
        {auth.user && (
          <div className='relative'>
            <LuCircleUserRound className='text-2xl text-gray-500 cursor-pointer' onClick={() => setDropdown(!dropdown)} />
            {dropdown && (
              <div className='min-w-[150px] absolute flex items-start flex-col space-y-2 top-6 right-0 bg-white shadow-md rounded-md py-3 px-5'>
                <p className='line-clamp-1 text-gray-500'>Hai, {auth.user?.name}</p>
                <button className='mt-2' onClick={() => router.visit("/")}>Beranda</button>
                <button className='text-red-400' onClick={() => router.post("/logout")}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar