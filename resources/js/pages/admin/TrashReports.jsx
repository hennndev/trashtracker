import { useState } from 'react'
import Layout from '../../components/admin/Layout'
import { LuDownload } from "react-icons/lu"
import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'
import Pagination from '../../components/Pagination'
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import ModalEditTrashReport from '../../components/admin/ModalEditTrashReport'
import ModalTrashReportProof from '../../components/admin/ModalTrashReportProof'
import ModalDescriptionTrashReport from '../../components/admin/ModalDescriptionTrashReport'
import ModalFilter from '../../components/admin/ModalFilter'


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
      return 'text-green-800';
    default:
      return 'text-gray-400';
  }
}

const TrashReports = ({ title, data: dataReport }) => {

  const [modalEdit, setModalEdit] = useState(null)
  const [modalDescription, setModalDescription] = useState(null)
  const [modalCreateProof, setModalCreateProof] = useState(null)
  const [modalFilter, setModalFilter] = useState(false)
  const [data, setDataReport] = useState(dataReport.data)
  const [direction, setDirection] = useState('asc')

  const handleSort = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc'
    router.get('/admin/laporan-temuan', {
      sort: 'status',
      direction: newDirection,
      page: dataReport.current_page,
    }, {
      preserveState: true,
      replace: true,
      only: ['data'], // hanya ambil data yg dibutuhkan
      onSuccess: (page) => {
        // Ambil data hasil response & update ke state
        setDataReport(page.props.data.data)
        setDirection(newDirection)
      }
    })
  }


  return (
    <Layout title={title} navbarTitle="Trash Reports">
      <main className='p-5 mt-5'>
        <div className='mb-7 flex items-center space-x-5'>
          <a
            href={`/admin/export-pdf/laporan-temuan${window.location.search}`}
            target='_blank'
            className='w-max flexx bg-green-800 rounded-md py-2 px-4 text-white cursor-pointer'
          >
            <LuDownload className='text-xl mr-2' />
            Export PDF
          </a>

          <button className='w-max flexx bg-transparent border border-green-800 text-green-800 rounded-md py-2 px-4 cursor-pointer' onClick={() => setModalFilter(true)}>
            Filter Laporan
          </button>
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
                <th scope="col" className="flex items-center px-6 py-3 cursor-pointer" onClick={handleSort}>
                  Status {direction === "asc" ? <FaSortAlphaDown className='ml-2' /> : <FaSortAlphaDownAlt className='ml-2' />}
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={data.id} className={`border-b border-gray-200 ${data.status === "done" ? "bg-green-50" : "odd:bg-white even:bg-gray-50"}`}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {data.user.name}
                  </td>
                  <td className="px-6 py-4">
                    <button className='text-blue-500 underline cursor-pointer' onClick={() => setModalDescription(data)}>Lihat deskripsi</button>
                  </td>
                  <td className="px-6 py-4">
                    {data.full_address}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => router.visit(`/admin/laporan-temuan/lokasi?longitude=${data.longitude}&latitude=${data.latitude}`)} className='text-blue-500 underline cursor-pointer'>Lihat lokasi</button>
                  </td>
                  <td className={`px-6 py-4 font-bold ${getStatusColor(data.status)}`}>
                    {data.status}
                  </td>
                  <td className="flexx space-x-2 px-6 py-4">
                    {data.status !== "done" && (
                      <button className='w-max flexx bg-white rounded-md py-1 px-4 text-gray-500 cursor-pointer border border-gray-300' onClick={() => setModalEdit(data)}>
                        Edit
                      </button>
                    )}
                    {data.status === "approved" && (
                      <button className='w-max flexx bg-green-800 rounded-md py-1 px-4 text-white cursor-pointer border border-gray-300' onClick={() => setModalCreateProof(data)}>
                        Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {dataReport.total > 10 && (
          <div className='flex-center mt-10'>
            <Pagination current_page={dataReport.current_page} last_page={dataReport.last_page} />
          </div>
        )}
      </main>
      {modalEdit && (
        <ModalEditTrashReport
          data={modalEdit}
          dataReport={data}
          setDataReport={setDataReport}
          closeModal={() => setModalEdit(null)} />
      )}
      {modalCreateProof && (
        <ModalTrashReportProof
          reportId={modalCreateProof.id}
          dataReport={data}
          setDataReport={setDataReport}
          closeModal={() => setModalCreateProof(null)}
        />
      )}
      {modalDescription && (
        <ModalDescriptionTrashReport
          data={modalDescription}
          closeModal={() => setModalDescription(null)}
        />
      )}
      {modalFilter && (
        <ModalFilter
          closeModal={() => setModalFilter(false)} />
      )}
    </Layout>
  )
}

export default TrashReports