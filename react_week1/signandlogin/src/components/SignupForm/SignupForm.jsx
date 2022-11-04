import { Link } from "react-router-dom";
import "../../App.css";
import "./SignupForm.css";
function SignupForm({
  validateFieldsHandler,
  submitHandler,
  fields,
  setFields,
  field,
  setField,
  errorField,
  setErrorField,
  showPassword,
  setShowPassword,
  showForm,
  setShowForm,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    submitHandler();
  }
  let indexOfInput = 0;
  const usernNameRegexPattern = new RegExp(
    "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
  );
  const emailRegexPattern = new RegExp(
    "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$",
    "i"
  );
  const passwordRegexPattern = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$",
    "i"
  );

  return (
    <>
      <main className="wrapper__main">
        <section className="flex-container">
          {showForm && (
            <form onSubmit={(e) => handleSubmit(e)} method="post">
              <h1 id="login--heading" className="heading">
                Sign up
              </h1>
              <button type="button" id="cross--button" className="crossbutton">
                <em className="fa-solid fa-xmark"></em>
              </button>
              <button
                type="button"
                id="login__google--button"
                className="button"
              >
                <em className="fa-brands fa-google padding-right"></em>
                Sign in with Google
              </button>
              <hr></hr>
              <div id="name--container">
                <label htmlFor="name--input" className="label">
                  Username
                </label>
                <input
                  type="text"
                  id="name--input"
                  value={field.userName}
                  className="input"
                  tabIndex={++indexOfInput}
                  placeholder="James_Cameron"
                  onInput={(e) => {
                    // console.log(e.target.value, "username");
                    return setField((prev) => ({
                      ...prev,
                      userName: e.target.value,
                    }));
                  }}
                  onBlur={(e) => {
                    console.log("the username field lost focus");
                    let errorAlertMessage =
                      "Must have atleast 8-20 characters and includes only .,_";
                    validateFieldsHandler(
                      usernNameRegexPattern,
                      field.userName,
                      "nameError",
                      errorAlertMessage
                    );
                  }}
                />
                <p className="para text--red">{errorField.nameError}</p>
              </div>
              <div id="email--container">
                <label htmlFor="email--input" className="label">
                  Email
                </label>
                <input
                  id="email--input"
                  className="input"
                  name="emailID"
                  value={field.emailID}
                  tabIndex={++indexOfInput}
                  placeholder="jamescameron@mail.com"
                  onInput={(e) => {
                    console.log(e.target.value);
                    return setField((prev) => {
                      return { ...prev, emailID: e.target.value };
                    });
                  }}
                  onBlur={(e) => {
                    console.log("email lost focus");
                    let errorAlertMessage = "Email id must be valid address";
                    validateFieldsHandler(
                      emailRegexPattern,
                      field.emailID,
                      "emailError",
                      errorAlertMessage
                    );
                  }}
                />
                <p className="para text--red">{errorField.emailError}</p>
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
                  value={field.password}
                  tabIndex={++indexOfInput}
                  placeholder="theWay^OfWater2"
                  onInput={(e) => {
                    // console.log(e.target.value);
                    setField((prev) => {
                      return { ...prev, password: e.target.value };
                    });
                  }}
                  onBlur={(e) => {
                    console.log("password field lost focus");
                    let errorAlertMessage =
                      "Must have 8 to 18 characters with one capital and one special character";

                    validateFieldsHandler(
                      passwordRegexPattern,
                      field.password,
                      "passwordError",
                      errorAlertMessage
                    );
                  }}
                ></input>
                <button
                  id="is--shown"
                  className="secondary"
                  tabIndex={++indexOfInput}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                >
                  <i
                    className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                  ></i>
                </button>
                <p className="para text--red" style={{ marginTop: "5px" }}>
                  {errorField.passwordError}
                </p>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="checkbox"
                  id="remember--checkbox"
                  value={field.isChecked}
                  onClick={(e) => {
                    console.log(e.target.checked);
                    if (e.target.checked) {
                      setErrorField((prev) => ({
                        ...prev,
                        unCheckedError: "",
                      }));
                    }
                    setField((prev) => {
                      return { ...prev, isChecked: e.target.checked };
                    });
                  }}
                  className="checkbox"
                />
                <label htmlFor="remember--checkbox" className="label--remember">
                  I agree with{" "}
                  <a href="#" className="link--secondary">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="link--secondary">
                    Conditions
                  </a>
                </label>
              </div>
              <p className="para text--red">{errorField.unCheckedError}</p>
              <div>
                <button
                  type="submit"
                  id="login--button"
                  className="button login"
                  onClick={() => {
                    console.clear();
                  }}
                >
                  Sign up
                </button>
              </div>
              <div>
                <a href="#" id="forgot--password" className="link--secondary">
                  Forgot password?
                </a>
              </div>
              <hr></hr>
            </form>
          )}
          <div>
            <p>Don't have an account?</p>
            <Link to="/login" className="link--secondary">
              Log in{" "}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export { SignupForm };
