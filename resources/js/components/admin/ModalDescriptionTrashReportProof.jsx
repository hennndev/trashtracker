import React from "react";
import { IoClose } from "react-icons/io5"

const ModalDescriptionTrashReportProof = ({ data, closeModal }) => {  

  return (
    <div className='fixed bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className='relative w-[600px] p-10 bg-white rounded-md'>
        <IoClose id="close" className='absolute top-2 right-2 text-red-500 text-3xl cursor-pointer' onClick={closeModal} />
        <h1 className='font-medium text-black text-lg'>Deskripsi Lengkap Bukti Penanganan</h1>
        <div className="mt-5 flex flex-col space-y-5">
          <div className="flex flex-col space-y-1.5">
            <p className="text-gray-500">Deskripsi</p>
            <p className="text-gray-700">{data.description}</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <p className="text-gray-500">Foto Bukti Penanganan</p>
            <a href={data.photo} target="_blank" className="text-blue-500 underline">Lihat Foto Laporan Temuan</a>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button className="bg-white border border-gray-300 py-1.5 px-4 outline-none rounded-md cursor-pointer" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default ModalDescriptionTrashReportProof