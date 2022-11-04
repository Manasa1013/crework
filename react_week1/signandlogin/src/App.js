import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Home } from "./components/Home";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { SignupForm } from "./components/SignupForm/SignupForm";
import { Toast } from "./components/Toast/Toast";

function App() {
  const [fields, setFields] = useState([]);
  const [field, setField] = useState({
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
  let message = "";
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
    else {
      //create a toast saying you are successfully able to login.
      //if there is any error field ,is with alert message don't allow submitting
      //view toast creation code from vanilla js keep notes app exercise
      // also add the "field" state into "fields" array
      setFields((prev) => [field, ...prev]);
      setShowForm((prev) => false);
      setField((prev) => ({
        ...prev,
        userName: "",
        emailID: "",
        password: "",
        isChecked: false,
      }));
    }
  }
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
              <Home info={"signed up"} fields={fields} />
            )
          }
        />
        <Route path="*" element={<LoginForm />} />
      </Routes>
      <Toast message={message} />
    </div>
  );
}

export default App;
