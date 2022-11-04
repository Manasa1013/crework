import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./LoginForm.css";
function LoginForm() {
  const [fields, setFields] = useState([]);
  const [field, setField] = useState({
    emailID: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  function handleSubmit(e) {
    console.log(e);
  }

  return (
    <>
      <main className="wrapper__main">
        <section className="flex-container">
          <form onSubmit={handleSubmit()} method="post">
            <h1 id="login--heading" className="heading">
              Log in
            </h1>
            <button type="button" id="cross--button" className="crossbutton">
              <em className="fa-solid fa-xmark"></em>
            </button>
            <button type="button" id="login__google--button" className="button">
              <em className="fa-brands fa-google padding-right"></em>
              Log in with Google
            </button>
            <hr></hr>
            <div id="email--container">
              <label htmlFor="email--input" className="label">
                Email
              </label>
              <input
                id="email--input"
                className="input"
                name="emailID"
                value={field.emailID}
                placeholder="example@mail.com"
                onChange={(e) => {
                  console.log(e.target.value);
                  setField((prev) => {
                    return { ...prev, emailID: e.target.value };
                  });
                }}
              />
            </div>
            <div id="password--container">
              <label htmlFor="password--input" className="label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password--input"
                className="input"
                name="password"
                placeholder="Wamoke@32"
                onChange={(e) => {
                  console.log(e.target.value);
                  setField((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
              ></input>
              <button
                id="is--shown"
                className="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
              >
                <i
                  className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                ></i>
              </button>
            </div>
            <div>
              <input
                type="checkbox"
                name="checkbox"
                id="remember--checkbox"
                className="checkbox"
              />
              <label htmlFor="remember--checkbox" className="label--remember">
                Remember me
              </label>
            </div>
            <div>
              <button
                type="submit"
                id="login--button"
                className="button login"
                onClick={handleSubmit()}
              >
                Log in
              </button>
            </div>
            <div>
              <a href="#" id="forgot--password" className="link--secondary">
                Forgot password?
              </a>
            </div>
            <hr></hr>
          </form>
          <div>
            <p>Don't have an account?</p>
            <Link to="/signup" className="link--secondary">
              Sign up{" "}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export { LoginForm };
