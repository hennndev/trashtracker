import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TrashReportsProof from "../pages/admin/TrashReportsProof"; // ⬅️ ganti sesuai path kamu

// Mock data
const mockData = {
  title: "Laporan Selesai",
  data: {
    current_page: 1,
    last_page: 1,
    total: 2,
    data: [
      {
        id: 1,
        report: {
          id: 10,
          full_address: "Jl. Contoh No.1",
          longitude: "106.123",
          latitude: "-6.456",
          description: "Sampah berserakan",
        },
        photo: "http://example.com/bukti1.jpg",
        description: "Sudah dibersihkan",
      },
      {
        id: 2,
        report: {
          id: 11,
          full_address: "Jl. Contoh No.2",
          longitude: "106.789",
          latitude: "-6.789",
          description: "Tumpukan sampah",
        },
        photo: "http://example.com/bukti2.jpg",
        description: "Sudah diangkut",
      },
    ],
  },
};

// Mock komponen luar agar test fokus
jest.mock("../components/admin/Layout", () => ({ children }) => <div>{children}</div>);
jest.mock("../components/Pagination", () => () => <div>Pagination</div>);
jest.mock("../components/admin/ModalDescriptionTrashReport", () => ({ data, closeModal }) => (
  <div>
    Modal Deskripsi Laporan: {data.description}
    <button onClick={closeModal}>Tutup Modal Deskripsi</button>
  </div>
));
jest.mock("../components/admin/ModalDescriptionTrashReportProof", () => ({ data, closeModal }) => (
  <div>
    Modal Bukti Penanganan: {data.description}
    <button onClick={closeModal}>Tutup Modal Bukti</button>
  </div>
));
jest.mock("@inertiajs/react", () => ({
  router: { visit: jest.fn() },
}));

describe("TrashReportsProof", () => {
  it("renders laporan rows", () => {
    render(<TrashReportsProof {...mockData} />);
    expect(screen.getByText("Jl. Contoh No.1")).toBeInTheDocument();
    expect(screen.getByText("Jl. Contoh No.2")).toBeInTheDocument();
  });

  it("opens deskripsi modal when clicked", () => {
    render(<TrashReportsProof {...mockData} />);
    const btn = screen.getAllByText("Lihat deskripsi laporam")[0];
    fireEvent.click(btn);
    expect(screen.getByText("Modal Deskripsi Laporan: Sampah berserakan")).toBeInTheDocument();
  });

  it("opens bukti modal when clicked", () => {
    render(<TrashReportsProof {...mockData} />);
    const btn = screen.getAllByText("Lihat buki penanganan")[0];
    fireEvent.click(btn);
    expect(screen.getByText("Modal Bukti Penanganan: Sudah dibersihkan")).toBeInTheDocument();
  });

  it("navigates to map with correct query", () => {
    const { router } = require("@inertiajs/react");
    render(<TrashReportsProof {...mockData} />);
    const btn = screen.getAllByText("Lihat lokasi")[0];
    fireEvent.click(btn);
    expect(router.visit).toHaveBeenCalledWith(
      "/admin/laporan-temuan/lokasi?longitude=106.123&latitude=-6.456"
    );
  });
});
