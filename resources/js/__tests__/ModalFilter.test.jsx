import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalFilter from "../components/admin/ModalFilter";

const mockRouterGet = jest.fn();

jest.mock("@inertiajs/react", () => ({
  router: {
    get: (...args) => mockRouterGet(...args),
  },
}));

describe("ModalFilter", () => {
  const mockCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ This updates location.search and pathname safely
    window.history.pushState({}, "", "/admin/laporan-temuan?status=approved&status=process");
  });

  it("pre-selects checkboxes based on URL params", () => {
    render(<ModalFilter closeModal={mockCloseModal} />);

    const approved = screen.getByLabelText("Disetujui");
    const process = screen.getByLabelText("Proses");
    const reject = screen.getByLabelText("Ditolak");

    expect(approved.checked).toBe(true);
    expect(process.checked).toBe(true);
    expect(reject.checked).toBe(false);
  });

  it("toggles checkbox on click", () => {
    render(<ModalFilter closeModal={mockCloseModal} />);

    const reject = screen.getByLabelText("Ditolak");
    expect(reject.checked).toBe(false);

    fireEvent.click(reject);
    expect(reject.checked).toBe(true);

    fireEvent.click(reject);
    expect(reject.checked).toBe(false);
  });

  it("submits selected statuses to router and closes modal", () => {
    render(<ModalFilter closeModal={mockCloseModal} />);

    const process = screen.getByLabelText("Proses");
    fireEvent.click(process);

    const done = screen.getByLabelText("Selesai");
    fireEvent.click(done);

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);

    expect(mockRouterGet).toHaveBeenCalledWith(
      "/admin/laporan-temuan?status=approved&status=done"
    );

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
