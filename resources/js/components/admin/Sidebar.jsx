import React from 'react'
import { LuChartLine, LuClipboardList, LuHouse, LuMap, LuUsers } from "react-icons/lu"
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
          <LuUsers className={`text-2xl group-hover:text-white ${pathname.startsWith("laporan-temuan") ? "text-white" : "text-gray-600"}`}/>
          <p className={`text-lg group-hover:text-white ${pathname.startsWith("laporan-temuan") ? "text-white" : "text-gray-500"}`}>Laporan Sampah</p>
        </div>

        {/* Laporan Sampah */}
        <div onClick={() => router.visit("/admin/pengguna")} className={`group flexx space-x-3 pl-5 py-2 hover:bg-green-800 rounded-md cursor-pointer ${pathname.startsWith("pengguna") ? "bg-green-800" : "bg-transparent"}`}>
          <LuClipboardList className={`text-2xl group-hover:text-white ${pathname.startsWith("pengguna") ? "text-white" : "text-gray-600"}`}/>
          <p className={`text-lg group-hover:text-white ${pathname.startsWith("pengguna") ? "text-white" : "text-gray-500"}`}>
            Pengguna
          </p>
        </div>
        <div onClick={() => router.visit("/admin/bukti-laporan-selesai")} className={`group flexx space-x-3 pl-5 py-2 hover:bg-green-800 rounded-md cursor-pointer ${pathname.startsWith("bukti-laporan-selesai") ? "bg-green-800" : "bg-transparent"}`}>
          <LuClipboardList className={`text-2xl group-hover:text-white ${pathname.startsWith("bukti-laporan-selesai") ? "text-white" : "text-gray-600"}`}/>
          <p className={`text-lg group-hover:text-white ${pathname.startsWith("bukti-laporan-selesai") ? "text-white" : "text-gray-500"}`}>
            Bukti Laporan
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar