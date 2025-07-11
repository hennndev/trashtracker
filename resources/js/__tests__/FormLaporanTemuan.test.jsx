import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FormLaporTemuan from '../components/FormLaporTemuan'

// Mock Swal
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

// Mock usePage
jest.mock('@inertiajs/react', () => ({
  usePage: () => ({
    props: {
      auth: {
        user: { id: 123 },
      },
    },
  }),
  useForm: () => mockUseForm,
}));

// Create mockUseForm object to inject
const mockPost = jest.fn()
const mockReset = jest.fn()
const mockSetData = jest.fn()

const mockUseForm = {
  post: mockPost,
  errors: {},
  processing: false,
  data: {
    description: "",
    full_address: "",
    latitude: "",
    longitude: "",
    user_id: 123,
    photo: null,
  },
  setData: mockSetData,
  reset: mockReset,
};

describe('FormLaporTemuan', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('submits the form successfully', async () => {
    render(<FormLaporTemuan mapLocation={null} />)

    // Isi field description
    const descField = screen.getByPlaceholderText(/Input deskripsi temuan sampah/i)
    fireEvent.change(descField, { target: { value: 'Sampah plastik di jalan' } })

    // Isi field full_address
    const addressField = screen.getByPlaceholderText(/Input lokasi lengkap/i)
    fireEvent.change(addressField, { target: { value: 'Jalan Merdeka No 1' } })

    // Submit
    const button = screen.getByRole('button', { name: /Laporkan temuan/i })
    fireEvent.click(button)

    // Expect post() called with URL and options
    expect(mockPost).toHaveBeenCalledWith(
      '/laporkan-temuan',
      expect.objectContaining({
        forceFormData: true,
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    )
  })

  it('shows success alert on success', async () => {
    render(<FormLaporTemuan mapLocation={null} />)

    // Trigger submit
    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Ambil onSuccess callback
    const onSuccess = mockPost.mock.calls[0][1].onSuccess

    // Panggil callback simulasi sukses
    onSuccess({ error: 'Test success' })

    // Pastikan Swal.fire terpanggil
    expect(require('sweetalert2').fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'success',
        title: 'Laporan temuan berhasil diunggah',
        text: 'Test success',
      })
    )

    // Pastikan reset() terpanggil
    expect(mockReset).toHaveBeenCalled()
  })

  it('shows error alert on error', async () => {
    render(<FormLaporTemuan mapLocation={null} />)

    // Submit
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const onError = mockPost.mock.calls[0][1].onError

    // Simulasi error
    onError({ error: 'Test error' })

    expect(require('sweetalert2').fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'error',
        title: 'Oops...',
        text: 'Test error',
      })
    )
  })
})
