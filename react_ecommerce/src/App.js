import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router";
import { Outlet } from "react-router-dom";

import { useCart } from "./Contexts/CartContext";
import { Home } from "./pages/Home";
import { Blogs } from "./pages/Blogs";
import { imageSources } from "./data/data";
import { Products } from "./components/Products";

import { Navbar } from "./components/Navbar";
import { Cart } from "./components/Cart";
import { Wishlist } from "./components/Wishlist";
import { ProductItem } from "./components/ProductItem/ProductItem";
import { ProductDisplay } from "./components/ProductDisplay";

export default function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [shopCategory, setShopCategory] = useState("Uncategorised");
  const { state, dispatch } = useCart();

  function increaseSlideIndex() {
    setSlideIndex((indexValue) => {
      if (indexValue === imageSources.length - 1) {
        indexValue = 0;
      } else indexValue++;
      return indexValue;
    });
  }
  function handleChangeCategory(e) {
    // console.log(shopCategory);
    setShopCategory(e.target.value);
    return shopCategory;
  }
  function addToCartHandler(newItem) {
    if (newItem.isAdded === true) {
      return;
    } else {
      dispatch({ type: "ADD_TO_CART", payload: newItem });
      dispatch({ type: "EDIT_PROD_CART", payload: newItem });
    }
  }
  return (
    <div className="App">
      <Navbar
        shopCategory={shopCategory}
        handleChangeCategory={(e) => handleChangeCategory(e)}
      />
      <Outlet />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              slideIndex={slideIndex}
              setSlideIndex={setSlideIndex}
              increaseSlideIndex={() => increaseSlideIndex()}
            />
          }
        ></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route
          path="/products"
          element={
            <Products
              shopCategory={shopCategory}
              setShopCategory={setShopCategory}
              handleChangeCategory={handleChangeCategory}
              addToCartClickHandler={addToCartHandler}
            />
          }
        ></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/product/:productId"
          element={<ProductDisplay addToCartClickHandler={addToCartHandler} />}
        ></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>

        <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
  );
}
