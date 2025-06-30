import { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { IoClose } from "react-icons/io5"

const ModalFilter = ({ closeModal }) => {
  const [selectedStatuses, setSelectedStatuses] = useState([])

  const statuses = [
    { value: 'process', label: 'Proses' },
    { value: 'rejected', label: 'Ditolak' },
    { value: 'approved', label: 'Disetujui' },
    { value: 'done', label: 'Selesai' },
  ]

  // Ambil status dari query saat modal muncul
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    // Coba ambil status dan status[]
    const statusParams = params.getAll('status')
    const statusArrayParams = params.getAll('status[]')

    const finalStatuses =
      statusParams.length > 0
        ? statusParams
        : statusArrayParams.length > 0
        ? statusArrayParams
        : []

    setSelectedStatuses(finalStatuses)
  }, [])

  const handleCheckboxChange = (statusValue) => {
    setSelectedStatuses(prev =>
      prev.includes(statusValue)
        ? prev.filter(s => s !== statusValue)
        : [...prev, statusValue]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Bangun query string secara manual agar jadi: ?status=...&status=...
    const params = new URLSearchParams()
    selectedStatuses.forEach(s => params.append('status', s))

    router.get(`${window.location.pathname}?${params.toString()}`)

    closeModal()
  }

  return (
    <div className='fixed bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className='relative w-[600px] p-10 bg-white rounded-md'>
        <IoClose
          className='absolute top-2 right-2 text-red-500 text-3xl cursor-pointer'
          onClick={closeModal}
        />
        <h1 className='font-medium text-black text-lg'>Filter Status Laporan Sampah</h1>
        <form className='mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col space-y-1.5 mb-3'>
            <label>Status</label>
            {statuses.map(({ value, label }) => (
              <div key={value} className='flex items-center space-x-2 ml-2'>
                <input
                  type="checkbox"
                  id={`status-${value}`}
                  checked={selectedStatuses.includes(value)}
                  onChange={() => handleCheckboxChange(value)}
                />
                <label htmlFor={`status-${value}`}>{label}</label>
              </div>
            ))}
          </div>
          <button
            type='submit'
            className='cursor-pointer bg-green-800 h-[50px] text-center text-white w-full rounded-[10px] mt-5 font-medium text-lg'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalFilter
