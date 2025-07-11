import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModalDescriptionTrashReport from "../components/admin/ModalDescriptionTrashReport";

const mockData = {
  user: { name: "John Doe" },
  full_address: "Jl. Contoh No.1",
  photo: "http://example.com/foto.jpg",
  description: "Sampah berserakan di trotoar.",
};

const mockCloseModal = jest.fn();

describe("ModalDescriptionTrashReport", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls closeModal when IoClose icon clicked", () => {
    const { container } = render(
      <ModalDescriptionTrashReport data={mockData} closeModal={mockCloseModal} />
    );

    // Ambil svg IoClose pakai class unik yang pasti ada
    const closeIcon = container.querySelector("#close");

    expect(closeIcon).toBeInTheDocument();
    fireEvent.click(closeIcon);

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
