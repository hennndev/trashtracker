import React from "react"
import { render, screen } from "@testing-library/react";
import Users from "../pages/admin/Users";

const mockData = {
  title: "Daftar Pengguna",
  data: {
    current_page: 1,
    last_page: 2,
    total: 15,
    data: [
      {
        id: 1,
        name: "User Satu",
        email: "user1@example.com",
        trash_report: [{}, {}, {}],
      },
      {
        id: 2,
        name: "User Dua",
        email: "user2@example.com",
        trash_report: [{}],
      },
    ],
  },
};

jest.mock("../components/admin/Layout", () => ({ children }) => <div>{children}</div>);
jest.mock("../components/Pagination", () => () => <div>Pagination</div>);

describe("Users", () => {
  it("renders user data in table", () => {
    render(<Users {...mockData} />);

    // Cek isi kolom tabel
    expect(screen.getByText("User Satu")).toBeInTheDocument();
    expect(screen.getByText("user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("3 Laporan")).toBeInTheDocument();

    expect(screen.getByText("User Dua")).toBeInTheDocument();
    expect(screen.getByText("user2@example.com")).toBeInTheDocument();
    expect(screen.getByText("1 Laporan")).toBeInTheDocument();
  });

  it("shows pagination when total > 10", () => {
    render(<Users {...mockData} />);
    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });

  it("does not show pagination when total <= 10", () => {
    const smallData = {
      ...mockData,
      data: {
        ...mockData.data,
        total: 8,
      },
    };

    render(<Users {...smallData} />);
    expect(screen.queryByText("Pagination")).not.toBeInTheDocument();
  });
});
