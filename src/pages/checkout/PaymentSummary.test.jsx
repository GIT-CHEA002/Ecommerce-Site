import { it, describe, vi, beforeEach, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import axios from "axios";
import PaymentSummary from "./PaymentSummary";
import formatMoney from "../../utils/money";
import { MemoryRouter } from "react-router";
vi.mock("axios");
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
describe("Test Payment Summary component", () => {
  let loadCart;
  let paymentSummary;
  axios.post = vi.fn(() => Promise.resolve({}));
  beforeEach(async () => {
    paymentSummary = {
      totalItems: 4,
      productCostCents: 6051,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 6051,
      taxCents: 605,
      totalCostCents: 6656,
    };

    loadCart = vi.fn();
  });

  it("Get correct payment summary", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );
    expect(screen.getByText(formatMoney("$60.65"))).toBe("$60.55");
  });
});
// { paymentSummary, loadCart }
