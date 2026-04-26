import { it, describe, vi, beforeEach, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import axios from "axios";
import Product from "./Product";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import formatMoney from "../../utils/money";

vi.mock("axios");
describe("Test HomePage Componet", () => {
  // use before each test to ignore the duplication
  let loadCart;
  beforeEach(() => {
    loadCart = vi.fn();
    axios.get.mockImplementation((url) => {
      if (url === "/api/products") {
        return Promise.resolve({
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        });
      }
      return Promise.reject(new Error("Not Found"));
    });
  });

  it("Display product correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );
    // we return 2 product of fake api fetching , no we expect to element to show in the screen
    const productContainer = await screen.findAllByTestId("product-container");
    expect(productContainer.length).toBe(2);
    // test product name
    expect(
      within(productContainer[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();
    // test rating count
    expect(within(productContainer[0]).getByText("87")).toBeInTheDocument();
    expect(
      within(productContainer[0]).getByText(formatMoney(1090)),
    ).toBeInTheDocument();
    // index = 1
    expect(
      within(productContainer[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
    // test rating count
    expect(within(productContainer[1]).getByText("127")).toBeInTheDocument();
    expect(
      within(productContainer[1]).getByText(formatMoney(2095)),
    ).toBeInTheDocument();
  });
});

// use expect with : to... methods (mean we expect some value from the test )
// within() == let us find the element within the specific element pages
