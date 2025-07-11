import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalEditTrashReport from "../components/admin/ModalEditTrashReport";

// Mock SweetAlert2
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

// Mock useForm
const mockPut = jest.fn();
const mockSetData = jest.fn();

jest.mock("@inertiajs/react", () => ({
  useForm: () => ({
    put: mockPut,
    errors: {},
    processing: false,
    data: {
      status: "pending",
      status_description: "",
    },
    setData: mockSetData,
  }),
}));

describe("ModalEditTrashReport", () => {
  const mockCloseModal = jest.fn();
  const mockSetDataReport = jest.fn();

  const sampleData = {
    id: 1,
    status: "pending",
    status_description: "",
  };

  const sampleDataReport = [
    { id: 1, status: "pending" },
    { id: 2, status: "process" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits the form successfully", () => {
    render(
      <ModalEditTrashReport
        data={sampleData}
        closeModal={mockCloseModal}
        dataReport={sampleDataReport}
        setDataReport={mockSetDataReport}
      />
    );

    // Klik tombol submit
    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);

    // Harus memanggil PUT dengan endpoint yang sesuai
    expect(mockPut).toHaveBeenCalledWith(
      `/admin/laporan-temuan/${sampleData.id}`,
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    );

    // Simulasi sukses
    const onSuccess = mockPut.mock.calls[0][1].onSuccess;
    onSuccess({ message: "Updated successfully" });

    // Pastikan SweetAlert sukses terpanggil
    expect(require("sweetalert2").fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "success",
        title: "Laporan temuan berhasil diedit",
        text: "Updated successfully",
      })
    );

    // setDataReport terpanggil
    expect(mockSetDataReport).toHaveBeenCalled();

    // closeModal terpanggil dua kali (1x handleSubmit, 1x onSuccess)
    expect(mockCloseModal).toHaveBeenCalledTimes(2);
  });

  it("shows error alert on error", () => {
    render(
      <ModalEditTrashReport
        data={sampleData}
        closeModal={mockCloseModal}
        dataReport={sampleDataReport}
        setDataReport={mockSetDataReport}
      />
    );

    // Klik submit
    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);

    // Simulasi error
    const onError = mockPut.mock.calls[0][1].onError;
    onError({ error: "Failed to update" });

    expect(require("sweetalert2").fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: "Oops...",
        text: "Failed to update",
      })
    );

    // closeModal hanya terpanggil 1x dari handleSubmit
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("updates form fields when changed", () => {
    render(
      <ModalEditTrashReport
        data={sampleData}
        closeModal={mockCloseModal}
        dataReport={sampleDataReport}
        setDataReport={mockSetDataReport}
      />
    );

    // Change status
    const select = screen.getByLabelText(/status/i);
    fireEvent.change(select, { target: { value: "approved" } });
    expect(mockSetData).toHaveBeenCalledWith("status", "approved");

    // Change description
    const textarea = screen.getByPlaceholderText(/Tambah deskripsi/i);
    fireEvent.change(textarea, { target: { value: "Deskripsi baru" } });
    expect(mockSetData).toHaveBeenCalledWith("status_description", "Deskripsi baru");
  });
});
