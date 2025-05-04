import React from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import { LuClock, LuX, LuCheckCheck } from 'react-icons/lu'

const History = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <main className='bg-white min-h-screen px-10 mt-10'>
        <h2 className='font-semibold text-2xl'>History laporan temuan saya</h2>
        <p className='mt-2 text-gray-500 max-w-lg mb-5'>Berisi semua laporan temuan sampah saya</p>
        <div className='flex flex-col space-y-4'>
          <div className='bg-gray-100 rounded-md p-4 pr-10 flex-between'>
            <div className='flexx'>
              <LuClock className='text-gray-900 text-2xl mr-5' />
              <div className='flex flex-col space-y-1'>
                <h3 className='text-gray-900 font-semibold'>Laporan #123 masih pending</h3>
                <p className='text-sm text-gray-500 tracking-wide'>Admin belum mengecek laporan kamu.</p>
              </div>
            </div>
            <div className='flexx space-x-3'>
              <button className='text-blue-500 outline-none cursor-pointer'>Edit</button>
              <button className='text-red-500 outline-none cursor-pointer'>Delete</button>
            </div>
          </div>
          <div className='bg-orange-100 rounded-md p-4 flexx'>
            <LuClock className='text-orange-900 text-2xl mr-5' />
            <div className='flex flex-col space-y-1'>
              <h3 className='text-orange-900 font-semibold'>Laporan #123 sedang diproses</h3>
              <p className='text-sm text-gray-500 tracking-wide'>Admin sedang meninjau laporan temuan kamu saat ini.</p>
            </div>
          </div>
          <div className='bg-red-100 rounded-md p-4 flexx'>
            <LuX className='text-red-900 text-2xl mr-5' />
            <div className='flex flex-col space-y-1'>
              <h3 className='text-red-900 font-semibold'>Laporan #123 ditolak</h3>
              <p className='text-sm text-gray-500 tracking-wide'>Admin menolak laporan temuan kamu.</p>
            </div>
          </div>
          {Array(8).fill(null).map(() => (
            <div className='bg-green-100 rounded-md p-4 flexx'>
              <LuCheckCheck className='text-green-900 text-2xl mr-5' />
              <div className='flex flex-col space-y-1'>
                <h3 className='text-green-900 font-semibold'>Laporan #123 disetujui</h3>
                <p className='text-sm text-gray-500 tracking-wide'>Admin menyetujui laporan temuan kamu dan akan segera ditindaklanjuti.</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className='bg-gray-50 mt-10 py-5 text-center border-t border-gray-200'>
        <p className='text-gray-500 text-sm'>&copy; 2025 TrashTrack - Mari wujudkan bersama untuk mencegah banjir di kota Depok.</p>
      </footer>
    </>
  )
}

export default History