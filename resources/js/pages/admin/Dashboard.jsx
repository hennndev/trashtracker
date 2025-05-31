import { useState } from 'react'
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { usePage, router } from '@inertiajs/react'
import Layout from '../../components/admin/Layout'


const Dashboard = ({ title, data, users, data_today }) => {

  const { auth } = usePage().props
  const [dataReport] = useState(data)

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-gray-400';
      case 'process':
        return 'text-yellow-400';
      case 'reject':
        return 'text-red-400';
      case 'approved':
        return 'text-green-400';
      case 'done':
        return 'text-emerald-400';
      default:
        return 'text-gray-400'; // default case
    }
  }

  const totalData = dataReport.length
  const totalDataDone = dataReport.reduce((curr, data) => {
    if (data.status === "done") {
      return curr + 1
    }
    return curr
  }, 0)
  const totalDataApproved = dataReport.reduce((curr, data) => {
    if (data.status === "approved") {
      return curr + 1
    }
    return curr
  }, 0)
  const totalDataProcess = dataReport.reduce((curr, data) => {
    if (data.status === "process") {
      return curr + 1
    }
    return curr
  }, 0)
  const totalDataReject = dataReport.reduce((curr, data) => {
    if (data.status === "reject") {
      return curr + 1
    }
    return curr
  }, 0)
  const totalDataPending = dataReport.reduce((curr, data) => {
    if (data.status === "pending") {
      return curr + 1
    }
    return curr
  }, 0)

  const dataTodayPending = data_today.filter(data => data.status === "pending")

  return (
    <Layout title={title} navbarTitle="Dashboard">
      <main className='p-5'>
        <h3 className='text-gray-500 text-xl'>Hai, {auth.user.name}</h3>
        <p className='text-gray-500 mt-2'>{format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}</p>

        <div className='mt-5 p-5 bg-blue-100 rounded-md'>
          <h5 className='text-[#1B56FD] text-lg'>Ringkasan Hari Ini</h5>
          <p className='text-gray-500 mt-2'>Ada {data_today.length} laporan baru untuk hari ini dan {dataTodayPending.length} laporan yang memerlukan tindakan segera</p>
        </div>

        <div className='grid grid-cols-4 gap-5 mt-7'>
          <div className='bg-blue-200 shadow-sm p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Total Laporan</h2>
            <p className='mt-5 text-lg text-gray-600'>{totalData} Laporan</p>
          </div>
          <div className='bg-emerald-200 shadow-sm p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Laporan sudah ditangani</h2>
            <p className='mt-5 text-lg text-gray-600'>{totalDataDone} Laporan</p>
          </div>
          <div className='bg-green-200 shadow-sm p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Laporan disetujui</h2>
            <p className='mt-5 text-lg text-gray-600'>{totalDataApproved} Laporan</p>
          </div>
          <div className='bg-red-200 shadow-sm p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Laporan ditolak</h2>
            <p className='mt-5 text-lg text-gray-600'>{totalDataReject} Laporan</p>
          </div>
          <div className='bg-orange-200 shadow-sm p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Laporan diproses</h2>
            <p className='mt-5 text-lg text-gray-600'>{totalDataProcess} Laporan</p>
          </div>
          <div className='bg-gray-200 shadow-sm p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Laporan belum ditinjau</h2>
            <p className='mt-5 text-lg text-gray-600'>{totalDataPending} Laporan</p>
          </div>
          <div className='bg-white shadow-sm p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Jumlah pengguna</h2>
            <p className='mt-5 text-lg text-gray-600'>{users} Pengguna</p>
          </div>
        </div>

        <div className='mt-10'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold'>Laporan Terbaru</h2>
            <h2 className='text-blue-500 hover:underline cursor-pointer' onClick={() => router.visit("/admin/laporan-temuan")}>Lihat semua</h2>
          </div>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table class="w-full text-left rtl:text-right text-gray-500">
              <thead class="text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    No
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Pelapor
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Deskripsi
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Lokasi
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Lihat lokasi
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data_today.map((data, index) => (
                  <tr key={data.id} class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {index + 1}
                    </th>
                    <td class="px-6 py-4">
                      {data.user.name}
                    </td>
                    <td class="px-6 py-4">
                      <button className='text-blue-500 underline'>Lihat deskripsi</button>
                    </td>
                    <td class="px-6 py-4">
                      {data.full_address}
                    </td>
                    <td class="px-6 py-4">
                      <button className='text-blue-500 underline'>Lihat lokasi</button>
                    </td>
                    <td className={`px-6 py-4 font-bold ${getStatusColor(data.status)}`}>
                      {data.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </Layout>
  )
}

export default Dashboard