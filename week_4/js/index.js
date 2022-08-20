const emailContainer = document.querySelector("#email--container");
const passwordContainer = document.querySelector("#password--container");

const emailInput = document.querySelector("#email--input");
let emailInputValue = emailInput.value;

const passwordInput = document.querySelector("#password--input");
let passwordInputValue = passwordInput.value;

const isShownButton = document.querySelector("#is--shown");
let isShownButtonValue = isShownButton.value;

const agreeCheckBox = document.querySelector("#agree--checkbox");
let agreeCheckBoxValue = agreeCheckBox.checked;

let showPassword = false;
let checked = false;
let nameRegx = /^([a-zA-Z0-9\s-]+)$/;
let emailRegx = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,5})$/;
let passwordRegx = /^(?=.*[0-9])(?=.*[A-Z]).{4,12}$/;

try {
  const nameContainer = document.querySelector("#name--container");
  const nameInput = document.querySelector("#name--input");
  let nameInputValue = nameInput.value;
  let nameAlert = document.querySelector("#name--alert");

  nameInput.addEventListener(
    "input",
    (e) => {
      nameInputValue = e.target.value;
      console.log(`nameInputValue,${nameInputValue}`);
    },
    false
  );
  nameInput.addEventListener(
    "change",
    (eve) => {
      eve.preventDefault();

      if (!nameRegx.test(nameInputValue)) {
        showErrorAlert(nameAlert, nameInput);
        nameAlert.innerHTML = `<span ><i class="fa-solid fa-circle-xmark"></i>  Must be an appropriate name</span>`;
        return false;
      } else if (nameInputValue.length === 0) {
        showErrorAlert(nameAlert, nameInput);
        nameAlert.innerHTML = `<span ><i class="fa-solid fa-circle-xmark"></i> Name can't be blank</span>`;
        return false;
      } else {
        return true;
      }
    },
    false
  );
} catch (e) {
  console.error("It's login form and name input field doesn't exist", e);
}

let emailAlert = document.querySelector("#email--alert");
let passwordAlert = document.querySelector("#password--alert");

emailInput.addEventListener("input", (e) => {
  emailInputValue = e.target.value;
  console.log(`value : ${emailInputValue}`);
});
emailInput.addEventListener("change", (eve) => {
  eve.preventDefault();
  if (!emailRegx.test(emailInputValue)) {
    emailAlert.innerHTML = `<span><i class="fa-solid fa-circle-xmark"></i> Must be an email</span>`;
    showErrorAlert(emailAlert, emailInput);
    return false;
  } else if (emailInputValue.length === 0) {
    showErrorAlert(emailAlert, emailInput);
    emailAlert.innerHTML = `<span><i class="fa-solid fa-triangle-exclamation"></i> Email can't be blank</span>`;
    return false;
  } else {
    return true;
  }
});

passwordInput.addEventListener("input", (e) => {
  passwordInputValue = e.target.value;
  console.log(`password : ${passwordInputValue}`);
});
passwordInput.addEventListener("change", (eve) => {
  eve.preventDefault();
  console.log(`password on change${passwordInputValue}`);
  if (passwordInputValue.length === 0) {
    showErrorAlert(passwordAlert, passwordInput);
    passwordAlert.innerHTML = `<span><i class="fa-solid fa-triangle-exclamation"></i> Password can't be blank</span>`;
  } else if (!passwordRegx.test(passwordInputValue)) {
    showErrorAlert(passwordAlert, passwordInput);
    passwordAlert.innerHTML = `<span><i class="fa-solid fa-triangle-exclamation"></i> Password is invalid</span>`;
  }
});

isShownButton.addEventListener("click", () => {
  if (showPassword === false) {
    isShownButton.value = "Hide";
    passwordInput.type = "text";
  } else if (showPassword === true) {
    isShownButton.value = "Show";
    passwordInput.type = "password";
  }
  showPassword = !showPassword;
});

agreeCheckBox.addEventListener("change", () => {
  console.log(agreeCheckBox.checked, "agreeCheckBox checked value");
  checked = !checked;
});
function showErrorAlert(alertField, entryField) {
  alertField.classList.add("alert");
  entryField.style.borderColor = "var(--error-red)";
}

const submitHandler = (req, res) => {
  console.log(req, res);
};
