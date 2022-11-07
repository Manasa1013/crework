import { Link } from "react-router-dom";
import "../../App.css";
import "./LoginForm.css";
import "../SignupForm/SignupForm.css";
function LoginForm({
  loginField,
  setLoginField,
  loginErrorField,
  setLoginErrorField,
  showLoginPassword,
  setShowLoginPassword,
  showLoginForm,
  setShowLoginForm,
  fields,
  setFields,
  validateFieldsHandler,
  emailRegexPattern,
  passwordRegexPattern,
  loginSubmitHandler,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    loginSubmitHandler();
  }

  return (
    <>
      <main className="wrapper__main">
        <section className="flex-container">
          <form onSubmit={(e) => handleSubmit(e)}>
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
                value={loginField.emailID}
                placeholder="jamescameron@mail.com"
                onInput={(e) => {
                  console.log(e.target.value);
                  return setLoginField((prev) => {
                    return { ...prev, emailID: e.target.value };
                  });
                }}
                onBlur={(e) => {
                  console.log("email in loginForm lost focus");
                  let errorAlertMessage = "Email id must be valid address";
                  validateFieldsHandler(
                    emailRegexPattern,
                    loginField.emailID,
                    "emailError",
                    errorAlertMessage,
                    loginErrorField,
                    setLoginErrorField
                  );
                }}
              />
              <p className="para text--red">{loginErrorField.emailError}</p>
            </div>
            <div id="password--container">
              <label htmlFor="password--input" className="label">
                Password
              </label>
              <input
                type={showLoginPassword ? "text" : "password"}
                id="password--input"
                className="input"
                name="password"
                value={loginField.password}
                placeholder="theWay^OfWater2"
                onInput={(e) => {
                  // console.log(e.target.value);
                  setLoginField((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
                onBlur={(e) => {
                  console.log("password field lost focus");
                  let errorAlertMessage =
                    "Must have 8 to 18 characters with one capital and one special character";

                  validateFieldsHandler(
                    passwordRegexPattern,
                    loginField.password,
                    "passwordError",
                    errorAlertMessage,
                    loginErrorField,
                    setLoginErrorField
                  );
                }}
              ></input>
              <button
                id="is--shown"
                className="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLoginPassword((prev) => !prev);
                }}
              >
                <i
                  className={
                    showLoginPassword ? "fa fa-eye-slash" : "fa fa-eye"
                  }
                ></i>
              </button>
              <p className="para text--red" style={{ marginTop: "5px" }}>
                {loginErrorField.passwordError}
              </p>
            </div>
            <div>
              <input
                type="checkbox"
                name="checkbox"
                id="remember--checkbox"
                value={loginField.isRemembered}
                onClick={(e) => {
                  console.log(e.target.checked);

                  setLoginField((prev) => {
                    return { ...prev, isRemembered: e.target.checked };
                  });
                }}
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
                // onClick={(e) => handleSubmit(e)}
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
