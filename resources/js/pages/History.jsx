import { Head } from '@inertiajs/react'
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"
import { LuCheck, LuCheckCheck, LuClock, LuX } from 'react-icons/lu'

const ACTION = {
  pending: "belum diperiksa",
  process: "sedang diproses",
  reject: "ditolak",
  approved: "disetujui",
  done: "sudah ditangani"
}

const ADMIN_ACTION = {
  pending: "belum mengecek laporan kamu",
  process: "memproses laporan kamu",
  reject: "menolak laporan kamu",
  approved: "menyetujui laporan kamu",
  done: "sudah menindaklanjuti petugas untuk mengangkut sampah tersebut",
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
      case 'approved':
        return 'bg-green-50';
      case 'done':
        return 'bg-emerald-50';
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
      <main className='bg-white min-h-screen px-5 md:px-10 mt-10'>
        <h2 className='font-semibold text-xl md:text-2xl'>History laporan temuan saya</h2>
        <p className='mt-2 max-sm:text-sm text-gray-500 max-w-lg mb-5'>Berisi semua laporan temuan sampah saya</p>
        <div className='flex flex-col space-y-4'>
          {data.map(data => (
            <div key={data.id} className={`${getStatusColor(data.status)} rounded-md p-4 pr-10 flex flex-col max-sm:space-y-2 md:flex-row md:items-center md:justify-between`}>
              <div className='flex'>
                {data.status === "pending" && (
                  <LuClock className='text-gray-900 text-2xl mr-5 max-sm:hidden' />
                )}
                {data.status === "process" && (
                  <LuClock className='text-gray-900 text-2xl mr-5 max-sm:hidden' />
                )}
                {data.status === "reject" && (
                  <LuX className='text-gray-900 text-2xl mr-5 max-sm:hidden' />
                )}
                {data.status === "approved" && (
                  <LuCheck className='text-gray-900 text-2xl mr-5 max-sm:hidden' />
                )}
                {data.status === "done" && (
                  <LuCheckCheck className='text-gray-900 text-2xl mr-5 max-sm:hidden' />
                )}
                <div className='flex-1 flex flex-col space-y-1'>
                  <h3 className='text-gray-900 font-semibold'>Laporan #0{data.id} {ACTION[data.status]}</h3>
                  <p className='text-sm text-gray-500 tracking-wide'>Admin {ADMIN_ACTION[data.status]}.</p>
                  {data.status !== "done" && (
                    <p className='mt-1 text-gray-500'>Note: <span className='text-gray-700 font-bold'>{data.status_description ? data.status_description : "-"}</span></p>
                  )}

                  {data.proof && (
                    <div className='flex flex-col space-y-1 mt-3'>
                      <p className='text-gray-500'>Bukti sampah yang diangkut:</p>
                      <a href={data.proof.photo} target="_blank" className='text-blue-500 underline'>Lihat bukti foto</a>
                      <p className='text-gray-700 font-bold'>{data.proof.description}</p>
                    </div>
                  )}
                </div>
              </div>
              {data.status === "pending" && (
                <div className='flexx self-end space-x-3'>
                  <button className='text-blue-500 outline-none cursor-pointer'>Edit</button>
                  <button className='text-red-500 outline-none cursor-pointer'>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default History