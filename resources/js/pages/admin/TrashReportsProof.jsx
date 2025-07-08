import { useState } from 'react'
import { router } from '@inertiajs/react'
import Layout from '../../components/admin/Layout'
import Pagination from '../../components/Pagination'
import ModalDescriptionTrashReportProof from '../../components/admin/ModalDescriptionTrashReportProof'
import ModalDescriptionTrashReport from '../../components/admin/ModalDescriptionTrashReport'


const TrashReports = ({ title, data }) => {
  const [modalDescription, setModalDescription] = useState(null)
  const [modalDescriptionTrashReportProof, setModalDescriptionTrashReportProof] = useState(null)
  return (
    <Layout title={title} navbarTitle="Bukti Laporan Selesai">
      <main className='p-5 mt-5'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Approval
                </th>
                <th scope="col" className="px-6 py-3">
                  Deskripsi Laporam
                </th>
                <th scope="col" className="px-6 py-3">
                  Bukti Penanganan
                </th>
                <th scope="col" className="px-6 py-3">
                  Lokasi
                </th>
                <th scope="col" className="px-6 py-3">
                  Lihat Lokasi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((obj, index) => (
                <tr key={obj.id} className={`border-b border-gray-200 odd:bg-white even:bg-gray-50`}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    Admin
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setModalDescription(obj.report)} className='text-blue-500 underline cursor-pointer'>Lihat deskripsi laporam</button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setModalDescriptionTrashReportProof(obj)}  className='text-blue-500 underline cursor-pointer'>Lihat buki penanganan</button>
                  </td>
                  <td className="px-6 py-4">
                    {obj.report.full_address}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => router.visit(`/admin/laporan-temuan/lokasi?longitude=${obj.report.longitude}&latitude=${obj.report.latitude}`)} className='text-blue-500 underline cursor-pointer'>Lihat lokasi</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.total > 10 && (
          <div className='flex-center mt-10'>
            <Pagination current_page={data.current_page} last_page={data.last_page} />
          </div>
        )}
      </main>

      {modalDescription && (
        <ModalDescriptionTrashReport
          data={modalDescription}
          closeModal={() => setModalDescription(null)}
        />
      )}
      {modalDescriptionTrashReportProof && (
        <ModalDescriptionTrashReportProof
          data={modalDescriptionTrashReportProof}
          closeModal={() => setModalDescriptionTrashReportProof(null)}
        />
      )}
    </Layout>
  )
}

export default TrashReports