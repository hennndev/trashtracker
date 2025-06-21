import { useState } from 'react'
import { usePage, router } from '@inertiajs/react'
import { LuCircleUserRound } from "react-icons/lu"

const Navbar = () => {

  const { props, url } = usePage()
  const { auth } = props
  const [dropdown, setDropdown] = useState(false)
  const pathname = url.split("/").reverse()[0]

  return (
    <header className='sticky top-0 flex flex-col z-[99999]'>
      <div className='flex flex-col space-y-1 bg-green-800 py-6 px-5 md:px-10 w-full'>
        <h1 className='text-2xl text-white font-black'><span className='tracking-tighter'>
          TrashTrack</span> - Sistem Mitigasi Banjir
        </h1>
        <p className='text-gray-200 tracking-wide'>Sistem mitigasi banjir wilayah kota Depok, Jawa Barat</p>
      </div>
      <div className='w-full flex-between bg-green-900 md:px-10'>
        <div className='flexx overflow-x-auto max-sm:mr-5'>
          <div onClick={() => router.visit("/beranda")} className={`py-3 px-6 cursor-pointer ${pathname === "beranda" ? "bg-green-700" : "bg-transparent"}`}>
            <p className='text-gray-100 text-base whitespace-nowrap'>Beranda</p>
          </div>
          <div onClick={() => router.visit("/laporkan-temuan")} className={`py-3 px-6 cursor-pointer ${pathname === "laporkan-temuan" ? "bg-green-700" : "bg-transparent"}`}>
            <p className='text-gray-100 text-base whitespace-nowrap'>Laporkan Temuan</p>
          </div>
          <div onClick={() => router.visit("/history")} className={`py-3 px-6 cursor-pointer ${pathname === "history" ? "bg-green-700" : "bg-transparent"}`}>
            <p className='text-gray-100 text-base whitespace-nowrap'>History</p>
          </div>
        </div>
        {auth.user?.role === "user" && (
          <div className='relative z-[999] max-sm:mr-5'>
            <LuCircleUserRound className='text-2xl text-white cursor-pointer' onClick={() => setDropdown(!dropdown)} />
            {dropdown && (
              <div className='min-w-[150px] absolute flex items-start flex-col space-y-2 top-6 right-0 bg-white shadow-md rounded-md py-3 px-5'>
                <p className='line-clamp-1 text-gray-500'>Hai, {auth.user?.name}</p>
                <button className='text mt-2' onClick={() => router.visit("/")}>Home</button>
                <button className='text text-red-400' onClick={() => router.post("/logout")}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
      {auth.user?.role === "admin" && (
        <div className='relative'>
          <LuCircleUserRound className='text-2xl text-gray-600' onClick={() => setDropdown(!dropdown)} />
          {dropdown && (
            <div className='min-w-[150px] absolute flex items-start flex-col space-y-2 top-6 right-0 bg-white shadow-md rounded-md py-3 px-5'>
              <p className='text-sm line-clamp-1 text-gray-500'>Hai, {auth.user?.name}</p>
              <button className='text-sm mt-2' onClick={() => router.visit("/")}>Home</button>
              <button className='text-sm' onClick={() => router.visit("/admin/dashboard")}>Dashboard</button>
              <button className='text-sm text-red-400' onClick={() => router.post("/logout")}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar