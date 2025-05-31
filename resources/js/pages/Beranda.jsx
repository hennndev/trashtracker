import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Head, usePage, router } from '@inertiajs/react'
import { LuLightbulb, LuTriangleAlert, LuHandshake, LuCheckCheck, LuX, LuClock, LuCheck } from "react-icons/lu";

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

const Beranda = ({ title, data, data_today }) => {
  const { auth } = usePage().props
  const totalData = data.length
  // DATA YANG SELESAI/DITINDAKLANJUTI
  const dataDone = data.reduce((curr, data) => {
    if (data.status === "done") {
      return curr + 1
    }
    return curr
  }, 0) || 0
  // DATA YANG DI APPROVE
  const dataApproved = data.reduce((curr, data) => {
    if (data.status === "approved") {
      return curr + 1
    }
    return curr
  }, 0) || 0
  // DATA YANG SEDANG DIPROSES
  const dataProcess = data.reduce((curr, data) => {
    if (data.status === "process") {
      return curr + 1
    }
    return curr
  }, 0) || 0
  // DATA YANG DITOLAK
  const dataReject = data.reduce((curr, data) => {
    if (data.status === "reject") {
      return curr + 1
    }
    return curr
  }, 0) || 0

  console.log(data_today)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className='bg-white min-h-screen px-5 md:px-10 mt-10'>
        <div className='flex-between'>
          <div className='flex flex-col space-y-1'>
            <h5 className='text-xl font-semibold'>Hai, {auth.user?.name}</h5>
            <p className='text-gray-500 font-normal'>Sabtu, {format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}</p>
          </div>
          <button onClick={() => router.visit("/laporkan-temuan")} className='bg-green-800 py-3 px-6 rounded-md text-white cursor-pointer'>Buat laporan</button>
        </div>

        <div className='flexx space-x-4 mt-10 w-full bg-orange-100 rounded-md p-5'>
          <LuTriangleAlert className='text-orange-500 text-xl' />
          <p className='text-orange-900 text-sm tracking-wide'><span className='font-bold'>Peringatan: </span>Prediksi hujan lebat dalam 1 minggu ke depan</p>
        </div>
        <div className='flexx space-x-4 mt-5 w-full bg-blue-100 rounded-md p-5'>
          <LuLightbulb className='text-blue-500 text-xl' />
          <p className='text-blue-900 text-sm tracking-wide'><span className='font-bold'>Tips:</span> Pastikan selokan di sekitar rumah tidak tersumbat. Foto dan kirim jika melihat penyumbatan besar</p>
        </div>
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7'>
          <div className='flex p-5 bg-white shadow-md rounded-md'>
            <div className='w-14 h-14 rounded-full flex-center bg-blue-100 mr-4'>
              <LuHandshake className='text-3xl text-black' />
            </div>
            <div className='flex flex-1 flex-col space-y-2'>
              <p className='text-gray-500'>Total kontribusi kamu</p>
              <h1 className='text-3xl font-black'>{totalData}</h1>
              <p className='text-sm text-blue-400 tracking-wide'>Melapor {totalData} temuan</p>
            </div>
          </div>
          <div className='flex p-5 bg-white shadow-md rounded-md'>
            <div className='w-14 h-14 rounded-full flex-center bg-green-100 mr-4'>
              <LuCheckCheck className='text-3xl text-black' />
            </div>
            <div className='flex flex-1 flex-col space-y-2'>
              <p className='text-gray-500'>Total temuan sudah ditangani</p>
              <h1 className='text-3xl font-black'>{dataDone}</h1>
              <p className='text-sm text-emerald-500 tracking-wide'>Total {dataDone} dari  temuan yang sudah ditindaklanjuti</p>
            </div>
          </div>
          <div className='flex p-5 bg-white shadow-md rounded-md'>
            <div className='w-14 h-14 rounded-full flex-center bg-green-100 mr-4'>
              <LuCheckCheck className='text-3xl text-black' />
            </div>
            <div className='flex flex-1 flex-col space-y-2'>
              <p className='text-gray-500'>Total temuan disetujui</p>
              <h1 className='text-3xl font-black'>{dataApproved}</h1>
              <p className='text-sm text-green-500 tracking-wide'>Total {dataApproved} dari  temuan yang disetujui</p>
            </div>
          </div>
          <div className='flex p-5 bg-white shadow-md rounded-md'>
            <div className='w-14 h-14 rounded-full flex-center bg-orange-100 mr-4'>
              <LuClock className='text-3xl text-black' />
            </div>
            <div className='flex flex-1 flex-col space-y-2'>
              <p className='text-gray-500'>Total temuan diproses</p>
              <h1 className='text-3xl font-black'>{dataProcess}</h1>
              <p className='text-sm text-orange-400 tracking-wide'>Total {dataProcess} temuan diproses</p>
            </div>
          </div>
          <div className='flex p-5 bg-white shadow-md rounded-md'>
            <div className='w-14 h-14 rounded-full flex-center bg-red-100 mr-4'>
              <LuX className='text-3xl text-black' />
            </div>
            <div className='flex flex-1 flex-col space-y-2'>
              <p className='text-gray-500'>Total temuan ditolak</p>
              <h1 className='text-3xl font-black'>{dataReject}</h1>
              <p className='text-sm text-red-400 tracking-wide'>Total {dataReject} temuan ditolak</p>
            </div>
          </div>
        </div>
        <div className='mt-10 rounded-md shadow-md'>
          <div className='flex-between p-5 border border-gray-200'>
            <h2 className='text-gray-500 font-semibold text-lg'>Aktivitas Terbaru</h2>
            <button onClick={() => router.visit("/history")} className='text-blue-500 outline-none border-none cursor-pointer'>Lihat semua</button>
          </div>

          <div className='flex flex-col space-y-4 p-5'>
            {data_today.map(data => (
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
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Beranda