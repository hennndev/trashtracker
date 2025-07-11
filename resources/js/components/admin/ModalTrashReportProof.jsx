import React from "react"
import Swal from 'sweetalert2'
import { IoClose } from "react-icons/io5"
import { useForm } from '@inertiajs/react'


const ModalTrashReportProof = ({ closeModal, reportId, dataReport, setDataReport }) => {
  const { post, errors, processing, data, setData } = useForm({
    photo: "",
    description: "",
    verified_at: "",
    report_id: reportId
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(`/admin/bukti-laporan-selesai`, {
      onSuccess: (response) => {
        Swal.fire({
          icon: "success",
          title: "Bukti laporan tertangani",
          text: response.message
        })
        const transformData = dataReport.map(report => {
          if (report.id === reportId) {
            return {
              ...report,
              status: "done"
            }
          } else {
            return report
          }
        })
        setDataReport(transformData)
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
  }

  return (
    <div className='fixed bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className='relative w-[600px] p-10 bg-white rounded-md'>
        <IoClose className='absolute top-2 right-2 text-red-500 text-3xl cursor-pointer' onClick={closeModal} />
        <h1 className='font-medium text-black text-lg'>Buat bukti mengenai laporan sampah</h1>
        <form onSubmit={handleSubmit} className='mt-3'>
          <div className='flex flex-col space-y-1.5 mb-3'>
            <label htmlFor="photo">Foto Bukti</label>
            <input
              type="file"
              id="photo"
              accept='image/*'
              onChange={(e) => setData("photo", e.target.files[0])}
              className='rounded-md p-3 border border-gray-300' />
            {errors.photo && (
              <p className='text-sm text-red-400 mt-1'>{errors.photo}</p>
            )}
          </div>

          <div className='flex flex-col space-y-1.5 mb-3'>
            <label htmlFor="description">Deskripsi</label>
            <textarea
              rows={6}
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              placeholder='Tambah deskripsi untuk status yang akan diberikan..'
              className='rounded-md p-3 border border-gray-300'>
            </textarea>
            {errors.description && (
              <p className='text-sm text-red-400 mt-1'>{errors.description}</p>
            )}
          </div>

          <div className='flex flex-col space-y-1.5'>
            <label htmlFor="verified_at">Tanggal Verifikasi</label>
            <input
              type="date"
              id="verified_at"
              value={data.verified_at}
              onChange={(e) => setData("verified_at", e.target.value)}
              className='rounded-md p-3 border border-gray-300' />
            {errors.verified_at && (
              <p className='text-sm text-red-400 mt-1'>{errors.verified_at}</p>
            )}
          </div>

          <button type='submit' disabled={processing} className={`cursor-pointer h-[50px] text-center text-white w-full rounded-[10px] mt-5 font-medium text-lg ${processing ? 'bg-gray-400' : 'bg-green-800'}`}>
            {processing ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalTrashReportProof