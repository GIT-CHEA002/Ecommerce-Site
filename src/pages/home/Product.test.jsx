import { it, describe, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Product from "./Product";
import formatMoney from "../../utils/money";
vi.mock("axios"); // mock = make the mock do whatever we want
describe("Product", () => {
  // model prodcut cart (data)
  let product;
  let loadCart;
  let user;
  beforeEach(() => {
    product = {
      id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
      image: "images/products/athletic-skateboard-shoes-gray.jpg",
      name: "Athletic Skateboard Shoes - Gray",
      rating: {
        stars: 4,
        count: 89,
      },
      priceCents: 3390,
      keywords: ["shoes", "running shoes", "footwear"],
    };
    loadCart = vi.fn();
    user = userEvent.setup();
  });
  //=====================Test Detail or product cart ===================
  it("display product detail correctly", () => {
    render(<Product product={product} loadCart={loadCart} />);
    expect(
      screen.getByText("Athletic Skateboard Shoes - Gray"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatMoney(3390)), // test price
    ).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-skateboard-shoes-gray.jpg",
    );
    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-40.png",
    );
    expect(screen.getByText("89")).toBeInTheDocument();
  });
  //========================Test UI(Add To cart button of product component)===================
  // ui is an async function (to test it we should use await inside async function )
  it("user interaction correctly", async () => {
    render(<Product product={product} loadCart={loadCart} />);
    const addToCart = screen.getByTestId("add-to-cart");
    await user.click(addToCart);
    expect(axios.post).toHaveBeenCalledWith(
      "https://ecommerce-site-backend-0gp2.onrender.com/api/cart-items",
      {
        productId: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
        quantity: 1,
      },
    );
    expect(loadCart).toHaveBeenCalled();
  });
  it("can select quantity", async () => {
    render(<Product product={product} loadCart={loadCart} />);
    // test default quantity
    const quantittySelector = screen.getByTestId("select-quantity");
    expect(quantittySelector).toHaveValue("1");
    // test with user iteration change
    // test if the quantitySelector change correctly
    await user.selectOptions(quantittySelector, "3");
    const addToCart = screen.getByTestId("add-to-cart");
    await user.click(addToCart);
    expect(axios.post).toHaveBeenCalledWith(
      "https://ecommerce-site-backend-0gp2.onrender.com/api/cart-items",
      {
        productId: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
        quantity: 3, // change to 2 , it will fails cuase quantity change to 3 already
      },
    );
    expect(loadCart).toHaveBeenCalled(); // check if the methods loadCart is called
  });
});
/**
 * Test Hook (prevent bug when we do a testing on our component)
 * 1. beforEach()
 * 2. AfterEach()
 * 3. beforeAll()
 * 4. afterAll()
 */
