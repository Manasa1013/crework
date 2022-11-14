import { useEffect } from "react";
import { useCart } from "../Contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ shopCategory, handleChangeCategory }) => {
  const { state } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (shopCategory === "Uncategorised") return;
    else navigate("/products");
  }, [shopCategory]);

  const categories = new Set();
  state.stateProducts.forEach((prod) => categories.add(prod.category));

  return (
    <>
      <nav className="navbar-component">
        <div className="hamburger-menu">
          <a className="link inline" href="/">
            <span className="line "></span>
            <span className="line "></span>
            <span className="line "></span>
          </a>
          <header className="inline">
            <Link to="/" className="logo link">
              Lefties cart
            </Link>
          </header>
        </div>
        <ul className="categories__list">
          <li>
            <Link to="/" className="link responsive">
              Home
            </Link>
          </li>
          <li>
            <select
              id="category"
              className="select"
              value={shopCategory}
              onChange={(e) => {
                handleChangeCategory(e);
              }}
            >
              <option defaultValue value="Uncategorised">
                Shop
              </option>
              {Array.from(categories).map((prod) => {
                return (
                  <option key={prod} value={prod}>
                    {prod}
                  </option>
                );
              })}
            </select>
          </li>
          <li>
            <Link to="/blogs" className="link responsive">
              Blogs
            </Link>
          </li>
        </ul>
        <ul className="categories__list">
          <li>
            <a href="https://reactsigninandlogin.netlify.app" className="link">
              <em className="fa-solid fa-user"></em>
            </a>
          </li>
          <li>
            <Link to="/cart" className="link responsive">
              <em className="fa-solid fa-cart-shopping"></em>
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="link responsive">
              <em className="fa-solid fa-heart"></em>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
