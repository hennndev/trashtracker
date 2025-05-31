import Map from '../components/Map'
import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import { FcIdea } from "react-icons/fc"
import Footer from "../components/Footer"
import FormLaporTemuan from '../components/FormLaporTemuan'

const Report = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <main className='bg-white min-h-screen px-5 md:px-10 mt-10'>
        <div className='mt-5 flex flex-1 w-full'>
          <div className='flex-1 lg:flex-[0.45] lg:mr-10'>
            <h2 className='font-semibold text-xl md:text-2xl'>Laporkan temuan kamu disini</h2>
            <p className='mt-2 text-gray-500 max-w-lg mb-10 md:mb-5 max-sm:text-sm'>Bantu kami menjaga lingkungan dengan melaporkan temuan sampah yang menumpuk di sekitar kamu.</p>
            <FormLaporTemuan/>
            <div className='flex flex-col w-full bg-green-50 rounded-md mt-5 p-5'> 
              <div className='flexx'>
                <FcIdea className='text-3xl mr-3'/>
                <h4 className='text-green-700 font-semibold'>Tips Pelaporan</h4>
              </div>
              <p className='text-md text-green-600 mt-2'>Ambil foto dengan jelas dan pastikan lokasi yang ditandai pada peta sudah tepat untuk memudahkan petugas mengidentifikasi lokasi sampah.</p>
            </div>
          </div>
          <div className='hidden lg:flex flex-col flex-[0.55]'>
            <div className='mb-5'>
              <input type="text" placeholder='Cari lokasi temuan kamu disini' className='border border-gray-300 rounded-md p-4 w-full'/>
            </div>
            <Map/>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Report