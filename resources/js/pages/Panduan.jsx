import React from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'

const Panduan = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className='bg-white min-h-screen px-10 mt-10'>
        <h2 className='font-semibold text-2xl'>Panduan menggunakan <span className='text-green-900'>TrashTrack</span></h2>
      </main>
      <footer className='bg-gray-50 mt-10 py-5 text-center border-t border-gray-200'>
        <p className='text-gray-500 text-sm'>&copy; 2025 TrashTrack - Mari wujudkan bersama untuk mencegah banjir di kota Depok.</p>
      </footer>
    </>
  )
}

export default Panduan