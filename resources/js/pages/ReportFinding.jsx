import { useState } from 'react'
import Map from '../components/Map'
import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import { FcIdea } from "react-icons/fc"
import Footer from "../components/Footer"
import FormLaporTemuan from '../components/FormLaporTemuan'

const Report = ({ title }) => {
  const [mapLocation, setMapLocation] = useState({
    longitude: null,
    latitude: null
  })
  
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <main className='bg-white min-h-screen px-5 md:px-10 mt-10'>
        <div className='mt-5 flex max-lg:flex-col flex-1 w-full'>
          <div className='flex-1 lg:flex-[0.45] lg:mr-10'>
            <h2 className='font-semibold text-xl md:text-2xl'>Laporkan temuan kamu disini</h2>
            <p className='mt-2 text-gray-500 max-w-lg mb-10 md:mb-5 max-sm:text-sm'>Bantu kami menjaga lingkungan dengan melaporkan temuan sampah yang menumpuk di sekitar kamu.</p>
            <FormLaporTemuan mapLocation={mapLocation}/>
            <div className='flex flex-col w-full bg-green-50 rounded-md mt-5 p-5'>
              <div className='flexx'>
                <FcIdea className='text-3xl mr-3' />
                <h4 className='text-green-700 font-semibold'>Tips Pelaporan</h4>
              </div>
              <p className='text-md text-green-600 mt-2'>Ambil foto dengan jelas dan pastikan lokasi yang ditandai pada peta sudah tepat untuk memudahkan petugas mengidentifikasi lokasi sampah.</p>
            </div>
          </div>
          <div className='flex max-lg:flex-1 flex-col max-lg:mt-10 lg:flex-[0.55]'>
            <Map setMapLocation={setMapLocation} mapLocation={mapLocation}/>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Report