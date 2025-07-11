import React from "react";
import Swal from 'sweetalert2'
import { IoClose } from "react-icons/io5"
import { useForm } from '@inertiajs/react'


const ModalEditTrashReport = ({ data, closeModal, dataReport, setDataReport }) => {
  const { put, errors, processing, data: formData, setData } = useForm({
    status: data.status,
    status_description: data.status_description || ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put(`/admin/laporan-temuan/${data.id}`, {
      onSuccess: (response) => {
        Swal.fire({
          icon: "success",
          title: "Laporan temuan berhasil diedit",
          text: response.message
        })
        closeModal()
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
    const transformData = dataReport.map(report => {
      if (report.id === data.id) {
        return {
          ...data,
          status: formData.status
        }
      } else {
        return report
      }
    })
    setDataReport(transformData)
    closeModal()
  }

  return (
    <div className='fixed bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className='relative w-[600px] p-10 bg-white rounded-md'>
        <IoClose className='absolute top-2 right-2 text-red-500 text-3xl cursor-pointer' onClick={closeModal} />
        <h1 className='font-medium text-black text-lg'>Edit Laporan Sampah</h1>
        <form onSubmit={handleSubmit} className='mt-3'>
          <div className='flex flex-col space-y-1.5 mb-3'>
            <label htmlFor="status">Status</label>
            <select
              id='status'
              value={formData.status}
              onChange={(e) => setData("status", e.target.value)}
              className={`rounded-md p-3 text-black border border-gray-300`}>
              <option value="pending">Pending</option>
              <option value="process">Proses</option>
              <option value="reject">Tolak</option>
              <option value="approved">Disetujui</option>
            </select>
          </div>

          <div className='flex flex-col space-y-1.5'>
            <label htmlFor="status_description">Deskripsi</label>
            <textarea
              rows={6}
              id="status_description"
              value={formData.status_description}
              onChange={(e) => setData("status_description", e.target.value)}
              placeholder='Tambah deskripsi untuk status yang akan diberikan..'
              className='rounded-md p-3 border border-gray-300'>
            </textarea>
          </div>
          <button type='submit' disabled={processing} className={`cursor-pointer h-[50px] text-center text-white w-full rounded-[10px] mt-5 font-medium text-lg ${processing ? 'bg-gray-400' : 'bg-green-800'}`}>
            {processing ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalEditTrashReport