import React from 'react'
import { useForm, usePage } from "@inertiajs/react"
import Swal from 'sweetalert2'

const FormLaporTemuan = () => {

  const { auth } = usePage().props
  const { post, errors, processing, data, setData, reset } = useForm({
    description: "",
    full_address: "",
    latitude: "",
    longitude: "",
    user_id: auth.user.id
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    post("/laporkan-temuan", {
      onSuccess: (response) => {
        Swal.fire({
          icon: "success",
          title: "Laporan temuan berhasil diunggah",
          text: response.error
        })
        reset()
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
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-1.5 mb-4'>
        <label htmlFor="pelapor">Deskripsi temuan sampah</label>
        <textarea
          rows={3}
          value={data.description}
          onChange={(e) => setData("description", e.target.value)}
          placeholder='Input deskripsi temuan sampah disini'
          className='border border-gray-300 outline-none rounded-md p-3' />
        {errors.description && (
          <p className='text-sm text-red-400 mt-1'>{errors.description}</p>
        )}
      </div>
      <div className='flex flex-col space-y-1.5 mb-4'>
        <label htmlFor="pelapor">Lokasi lengkap temuan sampah</label>
        <textarea
          rows={3}
          value={data.full_address}
          onChange={(e) => setData("full_address", e.target.value)}
          placeholder='Input lokasi lengkap temuan sampah disini'
          className='border border-gray-300 outline-none rounded-md p-3' />
        {errors.full_address && (
          <p className='text-sm text-red-400 mt-1'>{errors.full_address}</p>
        )}
      </div>
      <div className='flex flex-col space-y-1.5 mb-4'>
        <label htmlFor="pelapor">Foto Laporan</label>
        <input
          type="text"
          value={data.photo}
          onChange={(e) => setData("photo", e.target.value)}
          placeholder='Input test foto'
          className='border border-gray-300 outline-none rounded-md p-3' />
        {errors.photo && (
          <p className='text-sm text-red-400 mt-1'>{errors.photo}</p>
        )}
      </div>
      <div className='flex flex-col space-y-1.5 mb-4'>
        <label htmlFor="pelapor">Koordinat Longitude</label>
        <input
          type="number"
          value={data.longitude}
          onChange={(e) => setData("longitude", e.target.value)}
          placeholder='Input koordinat longitude disini'
          className='border border-gray-300 outline-none rounded-md p-3' />
        {errors.longitude && (
          <p className='text-sm text-red-400 mt-1'>{errors.longitude}</p>
        )}
      </div>
      <div className='flex flex-col space-y-1.5 mb-4'>
        <label htmlFor="pelapor">Koordinat Latitude</label>
        <input
          type="number"
          value={data.latitude}
          onChange={(e) => setData("latitude", e.target.value)}
          placeholder='Input koordinat latitude disini'
          className='border border-gray-300 outline-none rounded-md p-3' />
        {errors.latitude && (
          <p className='text-sm text-red-400 mt-1'>{errors.latitude}</p>
        )}
      </div>
      <button type='submit' className={`cursor-pointer py-3 px-6 text-center w-full rounded-md outline-none text-white mt-5 ${processing ? "bg-gray-500" : "bg-green-800"}`}>
        {processing ? "Loading.." : "Laporkan temuan ini"}
      </button>
    </form>
  )
}

export default FormLaporTemuan