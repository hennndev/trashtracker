import React from 'react'
import { LuChartLine, LuClipboardList, LuHouse, LuMap } from "react-icons/lu"
import { router, usePage } from '@inertiajs/react'

const Sidebar = () => {
  const { url } = usePage()
  const pathname = url.split("/").reverse()[0]

  return (
    <aside className='flex flex-col p-3 w-[250px] shadow-sm h-screen sticky top-0'>
      <h1 className='font-bold text-2xl text-center mt-2 text-green-800'>TrashTracker</h1>
      <div className='flex flex-col space-y-2 mt-10'>

        {/* Dashboard */}
        <div onClick={() => router.visit("/admin/dashboard")} className={`group flexx space-x-3 pl-5 py-2 hover:bg-green-800 rounded-md cursor-pointer ${pathname.startsWith("dashboard") ? "bg-green-800" : "bg-transparent"}`}>
          <LuHouse className={`text-2xl group-hover:text-white ${pathname.startsWith("dashboard") ? "text-white" : "text-gray-500"}`}/>
          <p className={`text-lg group-hover:text-white ${pathname.startsWith("dashboard") ? "text-white" : "text-gray-500"}`}>Dashboard</p>
        </div>

        {/* Laporan Sampah */}
        <div onClick={() => router.visit("/admin/laporan-temuan")} className={`group flexx space-x-3 pl-5 py-2 hover:bg-green-800 rounded-md cursor-pointer ${pathname.startsWith("laporan-temuan") ? "bg-green-800" : "bg-transparent"}`}>
          <LuClipboardList className={`text-2xl group-hover:text-white ${pathname.startsWith("laporan-temuan") ? "text-white" : "text-gray-600"}`}/>
          <p className={`text-lg group-hover:text-white ${pathname.startsWith("laporan-temuan") ? "text-white" : "text-gray-500"}`}>Laporan Sampah</p>
        </div>

        {/* Wilayah */}
        <div onClick={() => router.visit("/admin/zone")} className={`group flexx space-x-3 pl-5 py-2 hover:bg-green-800 rounded-md cursor-pointer ${pathname === "zone" ? "bg-green-800" : "bg-transparent"}`}>
          <LuMap className={`text-2xl group-hover:text-white ${pathname === "zone" ? "text-white" : "text-gray-600"}`}/>
          <p className={`text-lg group-hover:text-white ${pathname === "zone" ? "text-white" : "text-gray-500"}`}>Wilayah</p>
        </div>

        {/* Statistik */}
        <div onClick={() => router.visit("/admin/statistic")} className={`group flexx space-x-3 pl-5 py-2 hover:bg-green-800 rounded-md cursor-pointer ${pathname === "statistic" ? "bg-green-800" : "bg-transparent"}`}>
          <LuChartLine className={`text-2xl group-hover:text-white ${pathname === "statistic" ? "text-white" : "text-gray-600"}`}/>
          <p className={`text-lg group-hover:text-white ${pathname === "statistic" ? "text-white" : "text-gray-500"}`}>Statistik</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar