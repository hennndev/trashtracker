import React from 'react'
import Layout from '../../components/admin/Layout'
import { LuDownload } from "react-icons/lu";


const TrashReports = ({ title }) => {
  return (
    <Layout title={title} navbarTitle="Trash Reports">
      <main className='p-5 mt-5'>
        <div className='mb-7'>
          <button className='flexx bg-blue-500 rounded-md py-2 px-4 text-white cursor-pointer'>
            <LuDownload className='text-xl mr-2'/>
            Export PDF
          </button>
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(10).fill(null).map((_, index) => (
                <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
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
      </main>
    </Layout>
  )
}

export default TrashReports