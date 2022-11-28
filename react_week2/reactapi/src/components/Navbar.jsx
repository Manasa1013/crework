import { Link } from "react-router-dom";
export default function Navbar() {
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
            <a href="/" className="logo link">
              Spotify
            </a>
          </header>
        </div>
        <ul className="categories__list">
          <li>
            <Link href="/" className="link responsive">
              Artists
            </Link>
          </li>
          <li>
            <a href="/" className="link responsive">
              Songs
            </a>
          </li>
          <li>
            <a href="/" className="link responsive">
              Playlists
            </a>
          </li>
        </ul>
        <ul className="categories__list">
          <li>
            <a href="https://reactsigninandlogin.netlify.app/" className="link">
              <em className="fa fa-user"></em>
            </a>
          </li>
          <li>
            <a href="/" className="link responsive">
              <em className="fa-solid fa-heart"></em>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
