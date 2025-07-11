import React from "react"
import Layout from '../../components/admin/Layout'
import Pagination from '../../components/Pagination'

const Users = ({ title, data }) => {
  return (
    <Layout title={title} navbarTitle="Manajemen Pengguna">
      <main className='p-5 mt-5'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Laporan yang Dibuat
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((data, index) => (
                <tr key={data.id} className={`border-b border-gray-200 odd:bg-white even:bg-gray-50`}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {data.name}
                  </td>
                  <td className="px-6 py-4">
                    {data.email}
                  </td>
                  <td className="px-6 py-4">
                    {data.trash_report.length} Laporan
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
    </Layout>
  )
}

export default Users