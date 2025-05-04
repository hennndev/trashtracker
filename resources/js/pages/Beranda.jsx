import React from 'react'
import { Head, usePage, router } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import { LuLightbulb, LuTriangleAlert, LuHandshake, LuCheckCheck, LuX, LuClock } from "react-icons/lu";


const Beranda = ({title}) => {

  const { auth } = usePage().props

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      
      <Navbar/>
      <main className='bg-white min-h-screen px-10 mt-10'>  
        <div className='flex-between'>
          <div className='flex flex-col space-y-1'>
            <h5 className='text-xl font-semibold'>Hai, {auth.user?.name}</h5>
            <p className='text-gray-500 font-normal'>Sabtu, 19 April 2025</p>
          </div>
          <button onClick={() => router.visit("/laporkan-temuan")} className='bg-green-800 py-3 px-6 rounded-md text-white cursor-pointer'>Buat laporan</button>
        </div>

        <div className='flexx space-x-4 mt-10 w-full bg-orange-100 rounded-md p-5'>
          <LuTriangleAlert className='text-orange-500 text-xl'/>
          <p className='text-orange-900 text-sm tracking-wide'><span className='font-bold'>Peringatan: </span>Prediksi hujan lebat dalam 1 minggu ke depan</p>
        </div>
        <div className='flexx space-x-4 mt-5 w-full bg-blue-100 rounded-md p-5'>
          <LuLightbulb className='text-blue-500 text-xl'/>
          <p className='text-blue-900 text-sm tracking-wide'><span className='font-bold'>Tips:</span> Pastikan selokan di sekitar rumah tidak tersumbat. Foto dan kirim jika melihat penyumbatan besar</p>
        </div>

        <div className='mt-10 grid grid-cols-4 gap-7'>
          <div className='flex p-5 bg-white shadow-md rounded-md'>
            <div className='w-14 h-14 rounded-full flex-center bg-blue-100 mr-4'>
              <LuHandshake className='text-3xl text-black'/>
            </div>
            <div className='flex flex-col space-y-2'>
              <p className='text-gray-500'>Total kontribusi kamu</p>
              <h1 className='text-3xl font-black'>33</h1>
              <p className='text-sm text-blue-400 tracking-wide'>Melapor 31 temuan di 28 titik</p>
            </div>
          </div>
          <div className='flex p-5 bg-white shadow-md rounded-md'>
            <div className='w-14 h-14 rounded-full flex-center bg-green-100 mr-4'>
              <LuCheckCheck className='text-3xl text-black'/>
            </div>
            <div className='flex flex-col space-y-2'>
              <p className='text-gray-500'>Total temuan disetujui</p>
              <h1 className='text-3xl font-black'>31</h1>
              <p className='text-sm text-green-500 tracking-wide'>Total 31 temuan disetujui</p>
            </div>
          </div>
          <div className='flex p-5 bg-white shadow-md rounded-md'>
            <div className='w-14 h-14 rounded-full flex-center bg-orange-100 mr-4'>
              <LuClock className='text-3xl text-black'/>
            </div>
            <div className='flex flex-col space-y-2'>
              <p className='text-gray-500'>Total temuan diproses</p>
              <h1 className='text-3xl font-black'>1</h1>
              <p className='text-sm text-orange-400 tracking-wide'>Total 1 temuan diproses</p>
            </div>
          </div>
          <div className='flex p-5 bg-white shadow-md rounded-md'>
            <div className='w-14 h-14 rounded-full flex-center bg-red-100 mr-4'>
              <LuX className='text-3xl text-black'/>
            </div>
            <div className='flex flex-col space-y-2'>
              <p className='text-gray-500'>Total temuan ditolak</p>
              <h1 className='text-3xl font-black'>1</h1>
              <p className='text-sm text-red-400 tracking-wide'>Total 1 temuan ditolak</p>
            </div>
          </div>
        </div>

        <div className='mt-10 rounded-md shadow-md'>
          <div className='flex-between p-5 border border-gray-200'>
            <h2 className='text-gray-500 font-semibold text-lg'>Aktivitas Terbaru</h2>
            <button onClick={() => router.visit("/history")} className='text-blue-500 outline-none border-none cursor-pointer'>Lihat semua</button>
          </div>

          <div className='flex flex-col space-y-4 p-5'>
            <div className='bg-orange-100 rounded-md p-4 flexx'>
              <LuClock className='text-orange-900 text-2xl mr-5'/>
              <div className='flex flex-col space-y-1'>
                <h3 className='text-orange-900 font-semibold'>Laporan #123 sedang diproses</h3>
                <p className='text-sm text-gray-500 tracking-wide'>Admin sedang meninjau laporan temuan kamu saat ini.</p>
              </div>
            </div>
            <div className='bg-red-100 rounded-md p-4 flexx'>
              <LuX className='text-red-900 text-2xl mr-5'/>
              <div className='flex flex-col space-y-1'>
                <h3 className='text-red-900 font-semibold'>Laporan #123 ditolak</h3>
                <p className='text-sm text-gray-500 tracking-wide'>Admin menolak laporan temuan kamu.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className='bg-gray-50 mt-10 py-5 text-center border-t border-gray-200'>
        <p className='text-gray-500 text-sm'>&copy; 2025 TrashTrack - Mari wujudkan bersama untuk mencegah banjir di kota Depok.</p>
      </footer>
    </>
  )
}

export default Beranda