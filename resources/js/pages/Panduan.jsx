import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Panduan = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className='bg-white min-h-screen px-10 mt-10'>
        <h2 className='font-semibold text-xl md:text-2xl'>Panduan menggunakan <span className='text-green-900'>TrashTrack</span></h2>
      </main>
      <Footer/>
    </>
  )
}

export default Panduan