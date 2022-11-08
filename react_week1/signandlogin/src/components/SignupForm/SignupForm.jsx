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
  usernNameRegexPattern,
  emailRegexPattern,
  passwordRegexPattern,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    submitHandler();
  }

  return (
    <>
      <main className="wrapper__main">
        <section className="flex-container">
          <form onSubmit={(e) => handleSubmit(e)} method="post">
            <h1 id="login--heading" className="heading">
              Sign up
            </h1>
            <button
              type="button"
              id="cross--button"
              className="crossbutton crossbutton--position"
            >
              <em className="fa-solid fa-xmark"></em>
            </button>
            <button type="button" id="login__google--button" className="button">
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
                placeholder="James_Cameron"
                onInput={(e) => {
                  // console.log(e.target.value, "username");
                  return setField((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }));
                }}
                onBlur={(e) => {
                  // console.log("the username field lost focus");
                  let errorAlertMessage =
                    "Must have atleast 8-20 characters and includes only .,_";
                  validateFieldsHandler(
                    usernNameRegexPattern,
                    field.userName,
                    "nameError",
                    errorAlertMessage,
                    errorField,
                    setErrorField
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
                placeholder="jamescameron@mail.com"
                onInput={(e) => {
                  // console.log(e.target.value);
                  return setField((prev) => {
                    return { ...prev, emailID: e.target.value };
                  });
                }}
                onBlur={(e) => {
                  // console.log("email lost focus");
                  let errorAlertMessage = "Email id must be valid address";
                  validateFieldsHandler(
                    emailRegexPattern,
                    field.emailID,
                    "emailError",
                    errorAlertMessage,
                    errorField,
                    setErrorField
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
                placeholder="theWay^OfWater2"
                onInput={(e) => {
                  // console.log(e.target.value);
                  setField((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
                onBlur={(e) => {
                  // console.log("password field lost focus");
                  let errorAlertMessage =
                    "Must have 8 to 18 characters with one capital and one special character";

                  validateFieldsHandler(
                    passwordRegexPattern,
                    field.password,
                    "passwordError",
                    errorAlertMessage,
                    errorField,
                    setErrorField
                  );
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
              <p className="para text--red" style={{ marginTop: "5px" }}>
                {errorField.passwordError}
              </p>
            </div>
            <div>
              <input
                type="checkbox"
                name="checkbox"
                id="agree--checkbox"
                value={field.isChecked}
                onClick={(e) => {
                  // console.log(e.target.checked);
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
              <label htmlFor="agree--checkbox" className="label--remember">
                I agree with{" "}
                <a href="/" className="link--secondary">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/" className="link--secondary">
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
                  // console.clear();
                }}
              >
                Sign up
              </button>
            </div>

            <hr></hr>
          </form>
          <div>
            <p>Have an account already?</p>
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
