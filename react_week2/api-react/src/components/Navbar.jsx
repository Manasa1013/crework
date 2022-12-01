import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <nav className="navbar-component">
        <div className="route-links">
          <div
            className={
              openMenu === true ? "hamburger-menu open" : "hamburger-menu"
            }
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <header className="inline">
            <a style={{ padding: "0 1rem" }} href="/" className="logo link">
              Spotify
            </a>
          </header>
          <ul
            style={{ padding: "0 0.5rem" }}
            className={
              openMenu ? "categories__list active" : "categories__list"
            }
          >
            <li>
              <Link
                to="/artists"
                className="link"
                onClick={(openMenu) => {
                  setOpenMenu((prev) => !prev);
                }}
              >
                Artists
              </Link>
            </li>
            <li>
              <Link
                to="/tracks"
                className="link"
                onClick={(openMenu) => {
                  setOpenMenu((prev) => !prev);
                }}
              >
                Tracks
              </Link>
            </li>
            <li>
              <Link
                to="/playlists"
                className="link"
                onClick={(openMenu) => {
                  setOpenMenu((prev) => !prev);
                }}
              >
                Playlists
              </Link>
            </li>
          </ul>
        </div>
        <ul className="user__list">
          <li>
            <a href="/" className="link">
              <em className="fa-solid fa-heart"></em>
            </a>
          </li>
          <li>
            <a href="https://reactsigninandlogin.netlify.app/" className="link">
              <em className="fa fa-user"></em>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
