import React from 'react'
import map from "../assets/map.png"
import { Head, router, usePage } from '@inertiajs/react'

import { HiLocationMarker, HiCamera, HiClock, HiCog } from "react-icons/hi";
import Navbar from '../components/Navbar';


const Home = ({title}) => {
  const { auth } = usePage().props

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar/>
      <main className='bg-white min-h-screen px-4 mt-10'>  
        <section className='flex-center flex-col space-y-3'>
          <img src={map} alt="" className='w-full h-[250px] object-contain'/>
          <h2 className='text-2xl text-center leading-[1.5]'>Bersama Wujudkan Kota <br /> <span className='font-[900] text-3xl text-[#16C47F]'>Bebas Sampah</span></h2>
          <p className='text-center text-gray-600 text-sm leading-[1.5]'>Laporkan, Pantau, dan Atasi masalah sampah di lingkunganmu dengan TrashTrack.</p>
          <button onClick={() => router.visit("/login")} className='py-2 px-4 bg-[#16C47F] font-medium text-white outline-none cursor-pointer rounded-[10px]'>Mulai Sekarang</button>
        </section>
        <section className='flex flex-col space-y-5 mt-20'>
          <h2 className='text-xl text-center'>Fitur Utama</h2>
          <div className='flex flex-col space-y-7 px-7'>
            <div className='flex-center shadow-md rounded-md flex-col space-y-2 py-7'>
              <HiLocationMarker className='text-5xl text-[#E83F25]'/>
              <h3 className='text-xl font-semibold'>Laporan Lokasi</h3>
              <p className='text-center'>Tandai dan simpan di peta</p>
            </div>
            <div className='flex-center shadow-md rounded-md flex-col space-y-2 py-7'>
              <HiCamera className='text-5xl text-[#1B56FD]'/>
              <h3 className='text-xl font-semibold'>Upload Bukti</h3>
              <p className='text-center'>Kirimkan foto sampah</p>
            </div>
            <div className='flex-center shadow-md rounded-md flex-col space-y-2 py-7'>
              <HiClock className='text-5xl text-[#16C47F]'/>
              <h3 className='text-xl font-semibold'>Pantau Status</h3>
              <p className='text-center'>Lihat progres penanganan</p>
            </div>
            <div className='flex-center shadow-md rounded-md flex-col space-y-2 py-7'>
              <HiCog className='text-5xl text-[#292D32]'/>
              <h3 className='text-xl font-semibold'>Dashboard Admin</h3>
              <p className='text-center'>Kelola dan validasi laporan dengan cepat</p>
            </div>
          </div>
        </section>

        <section className='flex flex-col space-y-5 mt-20'>
          <h2 className='text-xl text-center'>Pencapaian</h2>
          <div className='flex flex-col space-y-7 px-7'>
            <div className='flex-center flex-col shadow-md rounded-md py-7'>
              <h5 className='text-3xl font-semibold'>200</h5>
              <p className='font-normal'>Laporan ditangani</p>
            </div>
            <div className='flex-center flex-col shadow-md rounded-md py-7'>
              <h5 className='text-3xl font-semibold'>25</h5>
              <p className='font-normal'>Wilayah Aktif</p>
            </div>
            <div className='flex-center flex-col shadow-md rounded-md py-7'>
              <h5 className='text-3xl font-semibold'>50</h5>
              <p className='font-normal'>Pengguna Terdaftar</p>
            </div>
          </div>
        </section>


        <section className='flex-center flex-col space-y-5 mt-20 mb-20'>
          <h1 className='font-black text-2xl'>Gabung Bersama Kami</h1>
          <button onClick={() => router.visit("/register")} className='py-4 px-10 bg-[#16C47F] text-white text-lg outline-none cursor-pointer rounded-[10px] font-bold'>Daftar Sekarang</button>
        </section>
      </main>
    </>
  )
}

export default Home