import { it, describe, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Product from "./Product";
vi.mock("axios");

describe("Product", () => {
  // model prodcut cart (data)
  let product = {
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
  /**
   * Test Hook (prevent bug when we do a testing on our component)
   * 1. beforEach()
   * 2. AfterEach()
   * 3. beforeAll()
   * 4. afterAll()
   */
  let loadCart = vi.fn();
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
  });
  //=====================Test Detail or product cart ===================
  it("display product detail correctly", () => {
    render(<Product product={product} loadCart={loadCart} />);
    expect(
      screen.getByText("Athletic Skateboard Shoes - Gray"),
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
    const user = userEvent.setup();
    const addToCart = screen.getByTestId("add-to-cart");
    await user.click(addToCart);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });
});
