import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Home } from "./components/Home";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { SignupForm } from "./components/SignupForm/SignupForm";
import { Toast } from "./components/Toast/Toast";

function App() {
  const [fields, setFields] = useState([]);
  const [field, setField] = useState({
    id: "",
    userName: "",
    emailID: "",
    password: "",
    isChecked: false,
  });
  const [loginField, setLoginField] = useState({
    emailID: "",
    password: "",
    isRemembered: false,
  });
  const [loginErrorField, setLoginErrorField] = useState({
    emailError: "",
    passwordError: "",
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [errorField, setErrorField] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    unCheckedError: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [showForm, setShowForm] = useState(true);
  const [toast, setToast] = useState({
    isVisible: "hide",
    message: "",
  });
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
  const [validFieldID, setValidFieldID] = useState("");
  const navigate = useNavigate();
  function validateFields(
    regexPattern,
    fieldName,
    errorName,
    errorText,
    errorField,
    setErrorField
  ) {
    let errorFieldName = Object.keys(errorField).find(
      (item) => item === errorName
    );
    if (regexPattern.test(fieldName)) {
      // console.log("pattern matched", errorFieldName);
      setErrorField((prev) => {
        return { ...prev, [errorFieldName]: "" };
      });
    } else {
      // console.log("pattern not matched", errorFieldName);
      setErrorField((prev) => {
        // console.log(errorName, errorText, "printing at line 34");
        return { ...prev, [errorFieldName]: errorText };
      });
    }
  }
  function loginSubmitHandler() {
    if (
      loginErrorField.emailError.length > 0 ||
      loginErrorField.passwordError.length > 0
    ) {
      setToast((prev) => ({
        ...prev,
        isVisible: "show",
        message: "Please enter valid credentials",
      }));
    } else {
      // now, we have fields data to check, for the loginField details
      //search in fields array to check whether the loginField details match
      fields.find((fieldItem) => {
        if (
          fieldItem.emailID !== loginField.emailID &&
          fieldItem.password !== loginField.password
        ) {
          setToast((prev) => ({
            ...prev,
            isVisible: "show",
            message: "We couldn't find your details,please Signup first",
          }));
        } else if (
          fieldItem.emailID === loginField.emailID &&
          fieldItem.password !== loginField.password
        ) {
          setLoginErrorField((prev) => ({
            ...prev,
            passwordError: "Please enter correct password",
          }));
          setValidFieldID("");
        } else {
          if (
            fieldItem.emailID === loginField.emailID &&
            fieldItem.password === loginField.password
          ) {
            setToast((prev) => ({
              ...prev,
              isVisible: "show",
              message: `Successfully logged in ${fieldItem.userName}`,
            }));
            setValidFieldID(() => fieldItem.id);
            setSignedIn(() => true);

            console.log(validFieldID, "at line 102");
          }
        }
        return validFieldID;
      });
      resetLoginValues();
    }
    return validFieldID;
  }
  function submitHandler() {
    if (field.isChecked === false)
      setErrorField((prev) => ({
        ...prev,
        unCheckedError: "Must agree terms and conditions",
      }));
    else if (
      errorField.nameError.length > 0 ||
      errorField.emailError.length > 0 ||
      errorField.passwordError.length > 0 ||
      errorField.unCheckedError.length > 0
    ) {
      setToast((prev) => ({
        ...prev,
        isVisible: "show",
        message: "Please correct errors at the fields",
      }));
    } else {
      //create a toast saying you are successfully able to login. (done)
      //if there is any error field ,is with alert message don't allow submitting
      //view toast creation code from vanilla js keep notes app exercise(done)
      // also add the "field" state into "fields" array (done)

      //saving to backend, after saving then save it to react fields , use
      // it for login data
      const postDetailsToApi = async () => {
        try {
          const response = await axios.post(`${url}/signup`, field);
          if (response.status === 200) {
            // console.log("success", response.data);

            setToast((prev) => ({
              ...prev,
              isVisible: "show",
              message: "Successfully signed up",
            }));
            setFields((prev) => [response.data.data[0], ...prev]);
            setValidFieldID(() => response.data.data[0].id);

            setSignedIn(() => true);

            resetValues();
            return response.data;
          } else {
            // console.log("failure", response);
          }
        } catch (err) {
          setToast((prev) => ({
            ...prev,
            isVisible: "show",
            message: "Error in signing up",
          }));
          console.error(err, "at catch of postDetailsToApi");
        }
      };
      let responseFromPostData = postDetailsToApi();
      // console.log(responseFromPostData);
    }
  }
  function resetLoginValues() {
    setShowLoginForm(() => false);
    setLoginField((prev) => ({
      ...prev,
      emailID: "",
      password: "",
      isRemembered: false,
    }));
  }
  function resetValues() {
    setShowForm(() => false);
    setField((prev) => ({
      ...prev,
      userName: "",
      emailID: "",
      password: "",
      isChecked: false,
    }));
  }
  function hideToastBar() {
    setToast((prev) => ({ ...prev, isVisible: "hide", message: "" }));
  }

  const fetchApiData = async () => {
    try {
      const response = await axios.get(`${url}/login`);
      if (response.status !== 200)
        console.log("fetching data failed", response.status);
      else {
        // console.log(response.data);
        let credentials = response.data.data;
        setFields(() => [...credentials]);
      }
    } catch (err) {
      console.error(err, "at axios of frontend");
    }
  };

  const url = "https://signupbackend.manasa1998.repl.co";

  useEffect(() => {
    let timer = setTimeout(() => {
      if (toast.isVisible === "show") {
        hideToastBar();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    fetchApiData();
  }, []);
  useEffect(() => {
    if (signedIn) {
      console.log(validFieldID, "at line 236");

      navigate(`/home/${validFieldID}`);
    }
  }, [validFieldID, signedIn, navigate]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <LoginForm
              loginField={loginField}
              setLoginField={setLoginField}
              loginErrorField={loginErrorField}
              setLoginErrorField={setLoginErrorField}
              showLoginPassword={showLoginPassword}
              setShowLoginPassword={setShowLoginPassword}
              showLoginForm={showLoginForm}
              setShowLoginForm={setShowLoginForm}
              fields={fields}
              setFields={setFields}
              validateFieldsHandler={validateFields}
              emailRegexPattern={emailRegexPattern}
              passwordRegexPattern={passwordRegexPattern}
              loginSubmitHandler={loginSubmitHandler}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupForm
              validateFieldsHandler={validateFields}
              submitHandler={submitHandler}
              fields={fields}
              setFields={setFields}
              field={field}
              setField={setField}
              errorField={errorField}
              setErrorField={setErrorField}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showForm={showForm}
              setShowForm={setShowForm}
              usernNameRegexPattern={usernNameRegexPattern}
              emailRegexPattern={emailRegexPattern}
              passwordRegexPattern={passwordRegexPattern}
            />
          }
        />
        <Route path={`/home/:fieldItemID`} element={<Home fields={fields} />} />
        <Route
          path="*"
          element={
            <LoginForm
              loginField={loginField}
              setLoginField={setLoginField}
              loginErrorField={loginErrorField}
              setLoginErrorField={setLoginErrorField}
              showLoginPassword={showLoginPassword}
              setShowLoginPassword={setShowLoginPassword}
              showLoginForm={showLoginForm}
              setShowLoginForm={setShowLoginForm}
              fields={fields}
              setFields={setFields}
              validateFieldsHandler={validateFields}
              emailRegexPattern={emailRegexPattern}
              passwordRegexPattern={passwordRegexPattern}
              loginSubmitHandler={loginSubmitHandler}
            />
          }
        />
      </Routes>
      <Toast toast={toast} hideToastBar={hideToastBar} />
    </div>
  );
}

export default App;
