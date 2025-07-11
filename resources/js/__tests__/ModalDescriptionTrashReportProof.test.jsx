import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModalDescriptionTrashReportProof from "../components/admin/ModalDescriptionTrashReportProof";

const mockData = {
  description: "Sudah dibersihkan seluruh area.",
  photo: "http://example.com/bukti.jpg",
};

const mockCloseModal = jest.fn();

describe("ModalDescriptionTrashReportProof", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders description and photo link correctly", () => {
    const { getByText } = render(
      <ModalDescriptionTrashReportProof data={mockData} closeModal={mockCloseModal} />
    );

    expect(getByText("Deskripsi Lengkap Bukti Penanganan")).toBeInTheDocument();
    expect(getByText("Sudah dibersihkan seluruh area.")).toBeInTheDocument();
    expect(getByText("Lihat Foto Laporan Temuan")).toBeInTheDocument();
  });

  it("calls closeModal when IoClose icon clicked", () => {
    const { container } = render(
      <ModalDescriptionTrashReportProof data={mockData} closeModal={mockCloseModal} />
    );

    const closeIcon = container.querySelector("#close");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("calls closeModal when Close button clicked", () => {
    const { getByText } = render(
      <ModalDescriptionTrashReportProof data={mockData} closeModal={mockCloseModal} />
    );

    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
