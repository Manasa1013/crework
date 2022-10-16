import { Link } from "react-router-dom";

export const Navbar = ({ shopCategory, handleChangeCategory }) => {
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
              onChange={handleChangeCategory}
            >
              <option selected value="Uncategorised">
                Shop
              </option>
              <option value="New Arrivals">New Arrivals</option>
              <option value="Books">Books</option>
              <option value="T-shirts">T-shirts</option>
              <option value="Gifts">Gifts</option>
              <option value="Scissors">Scissors</option>
              <option value="Cricket">Cricket</option>
              <option value="Fun accessories">Fun stuff</option>
              <option value="Stationery">Stationery</option>
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
            <a href="https://signupandlogin.netlify.app" className="link">
              Login/Signup
            </a>
          </li>
          <li>
            <Link to="/" className="link responsive">
              <em className="fa-solid fa-cart-shopping"></em>
            </Link>
          </li>
          <li>
            <Link to="/" className="link responsive">
              <em className="fa-solid fa-heart"></em>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
