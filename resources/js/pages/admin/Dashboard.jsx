import React from 'react'
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { usePage } from '@inertiajs/react'
import Layout from '../../components/admin/Layout'


const Dashboard = ({ title }) => {

  const { auth } = usePage().props

  return (
    <Layout title={title} navbarTitle="Dashboard">
      <main className='p-5'>
        <h3 className='text-gray-500 text-xl'>Hai, {auth.user.name}</h3>
        <p className='text-gray-500 mt-2'>{format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}</p>

        <div className='mt-5 p-5 bg-blue-100 rounded-md'>
          <h5 className='text-[#1B56FD] text-lg'>Ringkasan Hari Ini</h5>
          <p className='text-gray-500 mt-2'>Ada 7 laporan baru untuk hari ini dan 13 laporan yang memerlukan tindakan segera</p>
        </div>

        <div className='grid grid-cols-4 gap-5 mt-7'>
          <div className='bg-blue-200 p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Total Laporan</h2>
            <p className='mt-5 text-lg text-gray-600'>46 Laporan</p>
          </div>
          <div className='bg-green-200 p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Laporan approved</h2>
            <p className='mt-5 text-lg text-gray-600'>33 Laporan</p>
          </div>
          <div className='bg-orange-200 p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Laporan pending</h2>
            <p className='mt-5 text-lg text-gray-600'>13 Laporan</p>
          </div>
          <div className='bg-gray-200 p-5 rounded-md'>
            <h2 className='text-xl font-semibold'>Laporan pengguna</h2>
            <p className='mt-5 text-lg text-gray-600'>100 Pengguna</p>
          </div>
        </div>


        <div className='mt-10'>
          <h2 className='text-xl font-bold'>Laporan Terbaru</h2>

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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(10).fill(null).map((_, index) => (
                  <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {index+1}
                    </th>
                    <td class="px-6 py-4">
                      Zulfa Aulia H
                    </td>
                    <td class="px-6 py-4">
                      <button className='text-blue-500 underline'>Lihat deskripsi</button>
                    </td>
                    <td class="px-6 py-4">
                      Depok, Jabar
                    </td>
                    <td class="px-6 py-4">
                      <button className='text-blue-500 underline'>Lihat lokasi</button>
                    </td>
                    <td class="px-6 py-4">
                      <button className='bg-[#16C47F] rounded-md p-2 text-white mr-2'>Approved</button>
                      <button className='bg-red-400 rounded-md p-2 text-white mr-2'>Rejected</button>
                      <button className='bg-gray-700 rounded-md p-2 text-white'>Tinjau</button>
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