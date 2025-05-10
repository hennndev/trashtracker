import { useState } from 'react'
import Layout from '../../components/admin/Layout'
import { LuDownload } from "react-icons/lu"
import { useForm, router } from '@inertiajs/react'
import Swal from 'sweetalert2'


const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-gray-400';
    case 'process':
      return 'bg-yellow-400';
    case 'reject':
      return 'bg-red-400';
    case 'completed':
      return 'bg-green-400';
    default:
      return 'bg-gray-400'; // default case
  }
}

const TrashReports = ({ title, data: dataReport }) => {

  const [data, setDataReport] = useState(dataReport)

  const handleChangeStatus = (id, newStatus) => {
    router.patch(`/admin/laporan-temuan/${id}`, { status: newStatus }, {
      onSuccess: (response) => {
        Swal.fire({
          icon: "success",
          title: "Laporan temuan berhasil diedit",
          text: response.message
        })
      },
      onError: (response) => {
        if (response.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.error,
          });
        }
      }
    })

    const transformData = data.map(data => {
      if (data.id === id) {
        return {
          ...data,
          status: newStatus
        }
      } else {
        return data
      }
    })
    setDataReport(transformData)
  }

  return (
    <Layout title={title} navbarTitle="Trash Reports">
      <main className='p-5 mt-5'>
        <div className='mb-7'>
          <a href="/admin/export-pdf/trash-report" target='_blank' className='w-max flexx bg-blue-500 rounded-md py-2 px-4 text-white cursor-pointer'>
            <LuDownload className='text-xl mr-2' />
            Export PDF
          </a>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Pelapor
                </th>
                <th scope="col" className="px-6 py-3">
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3">
                  Lokasi
                </th>
                <th scope="col" className="px-6 py-3">
                  Lihat lokasi
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={data.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {data.user.name}
                  </td>
                  <td className="px-6 py-4">
                    <button className='text-blue-500 underline'>Lihat deskripsi</button>
                  </td>
                  <td className="px-6 py-4">
                    {data.full_address}
                  </td>
                  <td className="px-6 py-4">
                    <button className='text-blue-500 underline'>Lihat lokasi</button>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={data.status}
                      onChange={(e) => handleChangeStatus(data.id, e.target.value)}
                      className={`${getStatusColor(data.status)} rounded-md p-2 text-white`}>
                      <option value="pending">Pending</option>
                      <option value="process">Proses</option>
                      <option value="reject">Tolak</option>
                      <option value="completed">Selesai</option>
                    </select>
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