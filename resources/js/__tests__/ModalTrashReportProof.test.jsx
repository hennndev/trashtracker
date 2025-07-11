import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalTrashReportProof from "../components/admin/ModalTrashReportProof";

// Mock Swal
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

// Mock useForm
const mockPost = jest.fn();
const mockSetData = jest.fn();

jest.mock("@inertiajs/react", () => ({
  useForm: () => ({
    post: mockPost,
    errors: {},
    processing: false,
    data: {
      photo: "",
      description: "",
      verified_at: "",
      report_id: 1,
    },
    setData: mockSetData,
  }),
}));

describe("ModalTrashReportProof", () => {
  const mockCloseModal = jest.fn();
  const mockSetDataReport = jest.fn();

  const reportId = 1;
  const dataReport = [
    { id: 1, status: "approved" },
    { id: 2, status: "pending" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits the form successfully", () => {
    render(
      <ModalTrashReportProof
        closeModal={mockCloseModal}
        reportId={reportId}
        dataReport={dataReport}
        setDataReport={mockSetDataReport}
      />
    );

    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);

    expect(mockPost).toHaveBeenCalledWith(
      "/admin/bukti-laporan-selesai",
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    );

    const onSuccess = mockPost.mock.calls[0][1].onSuccess;
    onSuccess({ message: "Berhasil diverifikasi" });

    expect(require("sweetalert2").fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "success",
        title: "Bukti laporan tertangani",
        text: "Berhasil diverifikasi",
      })
    );

    expect(mockSetDataReport).toHaveBeenCalledWith([
      { id: 1, status: "done" },
      { id: 2, status: "pending" },
    ]);

    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("shows error alert on error", () => {
    render(
      <ModalTrashReportProof
        closeModal={mockCloseModal}
        reportId={reportId}
        dataReport={dataReport}
        setDataReport={mockSetDataReport}
      />
    );

    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);

    const onError = mockPost.mock.calls[0][1].onError;
    onError({ error: "Gagal upload bukti" });

    expect(require("sweetalert2").fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: "Oops...",
        text: "Gagal upload bukti",
      })
    );
  });

  it("updates form fields correctly", () => {
    render(
      <ModalTrashReportProof
        closeModal={mockCloseModal}
        reportId={reportId}
        dataReport={dataReport}
        setDataReport={mockSetDataReport}
      />
    );

    // Ubah deskripsi
    const textarea = screen.getByPlaceholderText(/Tambah deskripsi/i);
    fireEvent.change(textarea, { target: { value: "Sudah dibersihkan" } });
    expect(mockSetData).toHaveBeenCalledWith("description", "Sudah dibersihkan");

    // Ubah tanggal verifikasi
    const dateInput = screen.getByLabelText(/Tanggal Verifikasi/i);
    fireEvent.change(dateInput, { target: { value: "2025-07-11" } });
    expect(mockSetData).toHaveBeenCalledWith("verified_at", "2025-07-11");

    // Upload foto
    const file = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/Foto Bukti/i);
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(mockSetData).toHaveBeenCalledWith("photo", file);
  });
});
