import React from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import { FaCheck, FaClock } from "react-icons/fa";


const Dashboard = ({title}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>


      <Navbar/>
      <main className='bg-white min-h-screen px-4 mt-10'>  
        <div className='flex-between'>
          <div className='flex flex-col space-y-1'>
            <h5 className='font-semibold'>Hai, Budi Santoso</h5>
            <p className='text-sm text-gray-500 font-normal'>Sabtu, 19 April 2025</p>
          </div>
          <button className='text-sm bg-[#16C47F] p-3 rounded-md text-white'>Buat laporan</button>
        </div>

        <div className='grid grid-cols-2 gap-x-3 gap-y-5 mt-10'>
          <div className='shadow-sm border border-gray-200 rounded-md p-3'>
            <h4 className='font-semibold text-base'>Kontribusi</h4>
            <p className='text-gray-500 text-sm mt-2'><span className='text-2xl font-bold'>5</span> Total Laporan</p>
          </div>
          <div className='shadow-sm border border-gray-200 rounded-md p-3'>
            <h4 className='font-semibold text-base'>Selesai</h4>
            <p className='text-gray-500 text-sm mt-2'><span className='text-2xl font-bold'>2</span> Laporan Diterima</p>
          </div>
          <div className='shadow-sm border border-gray-200 rounded-md p-3'>
            <h4 className='font-semibold text-base'>Diproses</h4>
            <p className='text-gray-500 text-sm mt-2'><span className='text-2xl font-bold'>3</span> Laporan Diproses</p>
          </div>
        </div>

        <div className='mt-10'>
          <h4 className='font-semibold text-lg'>Status Laporan</h4>

          <div className='mt-2 flex flex-col space-y-3'>
            <div className='flexx w-full bg-[#16C47F] p-3 rounded-md'>
              <FaCheck className='text-white mr-3 text-2xl'/>
              <div className='flex flex-col flex-1'>
                <h5 className='text-white font-semibold text-lg'>Laporan #123 selesai</h5>
                <p className='text-white text-sm font-medium'>Petugas sudah menangani laporan ini</p>
              </div>
            </div>
            <div className='flexx w-full bg-orange-300 p-3 rounded-md'>
              <FaClock className='text-white mr-3 text-2xl'/>
              <div className='flex flex-col flex-1'>
                <h5 className='text-white font-semibold text-lg'>Laporan #123 diproses</h5>
                <p className='text-white text-sm font-medium'>Petugas sudah menangani laporan ini</p>
              </div>
            </div>
            <div className='flexx w-full bg-orange-300 p-3 rounded-md'>
              <FaClock className='text-white mr-3 text-2xl'/>
              <div className='flex flex-col flex-1'>
                <h5 className='text-white font-semibold text-lg'>Laporan #123 diproses</h5>
                <p className='text-white text-sm font-medium'>Petugas sudah menangani laporan ini</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard