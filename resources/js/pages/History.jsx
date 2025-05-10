import React from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import { LuClock, LuX, LuCheckCheck } from 'react-icons/lu'


const ACTION = {
  pending: "belum diperiksa",
  process: "sedang diproses",
  reject: "ditolak",
  completed: "akan ditindaklanjuti"
}

const ADMIN_ACTION = {
  pending: "belum mengecek laporan kamu",
  process: "memproses laporan kamu",
  reject: "menolak laporan kamu",
  completed: "sudah meenyelesaikan laporan kamu"
}

const History = ({ title, data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-50';
      case 'process':
        return 'bg-yellow-50';
      case 'reject':
        return 'bg-red-50';
      case 'completed':
        return 'bg-green-50';
      default:
        return 'bg-gray-50'; // default case
    }
  }
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
          {data.map(data => (
            <div key={data.id} className={`${getStatusColor(data.status)} rounded-md p-4 pr-10 flex-between`}>
              <div className='flexx'>
                <LuClock className='text-gray-900 text-2xl mr-5' />
                <div className='flex flex-col space-y-1'>
                  <h3 className='text-gray-900 font-semibold'>Laporan {data.id} {ACTION[data.status]}</h3>
                  <p className='text-sm text-gray-500 tracking-wide'>Admin {ADMIN_ACTION[data.status]}.</p>
                </div>
              </div>
              {data.status === "pending" && (
                <div className='flexx space-x-3'>
                  <button className='text-blue-500 outline-none cursor-pointer'>Edit</button>
                  <button className='text-red-500 outline-none cursor-pointer'>Delete</button>
                </div>
              )}
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