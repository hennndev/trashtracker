import React from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import { FcIdea } from "react-icons/fc";


const Report = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <main className='bg-white min-h-screen px-4 mt-10 mb-10'>
        <div className='flex flex-col space-y-1'>
          <h2 className='font-semibold text-2xl'>Lapor Sampah</h2>
          <p className='text-gray-500 mt-1'>Bantu kami untuk menjaga lingkungan dengan melaporkan lokasi
          sampah di sekitar Anda.</p>
        </div>
        <div className='mt-5'>
          <form className='flex flex-col space-y-4'>
            <div className='flex flex-col space-y-2'>
              <label htmlFor="name">Nama Pelapor</label>
              <input type="text" placeholder='Input nama pelapor disini..' className='p-2 border border-gray-200 rounded-md'/>
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor="name">Deskripsi Sampah</label>
              <textarea rows={4} placeholder='Input deskripsi sampah disini..' className='p-2 border border-gray-200 rounded-md'/>
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor="name">Deskripsi Sampah</label>
              <input type='file' className='p-2 border border-gray-200 rounded-md'/>
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor="name">Koordinat Lokasi</label>
              <input type='text' placeholder='Input koordinat lokasi disini..' className='p-2 border border-gray-200 rounded-md'/>
            </div>
            <div className='mt-3 flexx space-x-2'>
              <button className='py-2 px-4 border border-gray-200 rounded-md'>Kembali</button>
              <button className='py-2 px-4 bg-[#16C47F] rounded-md text-white'>Submit</button>
            </div>
          </form>
          <div className='mt-5 p-5 bg-green-100 rounded-md'>
            <div className='flexx space-x-2'>
              <FcIdea className='text-xl'/>
              <h5 className='font-bold text-[#328E6E]'>Tips Pelaporan</h5>
            </div>
            <p className='mt-2 text-[#328E6E] text-sm'>Ambil foto dengan jelas dan pastikan lokasi yang ditandai pada peta sudah tepat untuk memudahkan petugas mengidentifikasi lokasi sampah.</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Report