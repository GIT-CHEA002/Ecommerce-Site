import { it, describe, vi, beforeEach, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import axios from "axios";
import Product from "./Product";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import formatMoney from "../../utils/money";
import userEvent from "@testing-library/user-event";

vi.mock("axios");
describe("Test HomePage Componet", () => {
  // use before each test to ignore the duplication
  let loadCart;
  axios.post = vi.fn(() => Promise.resolve({}));
  beforeEach(() => {
    loadCart = vi.fn();
    axios.get.mockImplementation((url) => {
      if (
        url === "https://ecommerce-site-backend-0gp2.onrender.com/api/products"
      ) {
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
  it("Add to Cart Button work", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );
    //============ set up user ==============
    const productContainer = await screen.findAllByTestId("product-container");
    const user = userEvent.setup();
    // get quantity
    // product 1=====
    expect(
      within(productContainer[0]).getByTestId("select-quantity"),
    ).toHaveValue("1");

    await user.selectOptions(
      within(productContainer[0]).getByTestId("select-quantity"),
      "2",
    );
    await user.click(within(productContainer[0]).getByTestId("add-to-cart"));
    expect(axios.post).toHaveBeenNthCalledWith(
      1,
      "https://ecommerce-site-backend-0gp2.onrender.com/api/cart-items",
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
      },
    );
    // product 2====
    expect(
      within(productContainer[1]).getByTestId("select-quantity"),
    ).toHaveValue("1");
    await user.selectOptions(
      within(productContainer[1]).getByTestId("select-quantity"),
      "3",
    );
    await user.click(within(productContainer[1]).getByTestId("add-to-cart"));
    expect(axios.post).toHaveBeenNthCalledWith(
      2,
      "https://ecommerce-site-backend-0gp2.onrender.com/api/cart-items",
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3,
      },
    );
    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(loadCart).toHaveBeenCalled();
    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});

// it("user interaction correctly", async () => {
//   render(<Product product={product} loadCart={loadCart} />);
//   const addToCart = screen.getByTestId("add-to-cart");
//   await user.click(addToCart);
//   expect(axios.post).toHaveBeenCalledWith("https://ecommerce-site-backend-0gp2.onrender.com/api/cart-items", {
//     productId: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
//     quantity: 1,
//   });
//   expect(loadCart).toHaveBeenCalled();
// });

// use expect with : to... methods (mean we expect some value from the test )
// within() == let us find the element within the specific element pages
