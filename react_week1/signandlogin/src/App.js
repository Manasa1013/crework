import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
  function validateFields(regexPattern, fieldName, errorName, errorText) {
    let errorFieldName = Object.keys(errorField).find(
      (item) => item == errorName
    );
    if (regexPattern.test(fieldName)) {
      console.log("pattern matched", errorFieldName);
      setErrorField((prev) => {
        return { ...prev, [errorFieldName]: "" };
      });
    } else {
      console.log("pattern not matched", errorFieldName);
      setErrorField((prev) => {
        console.log(errorName, errorText, "printing at line 34");
        return { ...prev, [errorFieldName]: errorText };
      });
    }
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
            console.log("success", response.data);

            setToast((prev) => ({
              ...prev,
              isVisible: "show",
              message: "Successfully signed up",
            }));
            resetValues();
            return response.data;
          } else {
            console.log("failure", response);
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
      console.log(responseFromPostData);
    }
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
    const fetchApiData = async () => {
      try {
        const response = await axios.get(`${url}/login`);
        if (response.status !== 200)
          console.log("fetching data failed", response.status);
        else {
          console.log(response.data);
          let credentials = response.data.data;
          setFields(() => [...credentials]);
        }
      } catch (err) {
        console.error(err, "at axios of frontend");
      }
    };
    fetchApiData();
  }, [toast.message]);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/signup"
          element={
            showForm ? (
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
              />
            ) : (
              <Home fields={fields} />
            )
          }
        />
        <Route path="*" element={<LoginForm />} />
      </Routes>
      <Toast toast={toast} hideToastBar={hideToastBar} />
    </div>
  );
}

export default App;
