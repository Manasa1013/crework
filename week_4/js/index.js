const emailContainer = document.querySelector("#email--container");
const passwordContainer = document.querySelector("#password--container");

const emailInput = document.querySelector("#email--input");
let emailInputValue = emailInput.value;

const passwordInput = document.querySelector("#password--input");
let passwordInputValue = passwordInput.value;

try {
  const nameContainer = document.querySelector("#name--container");
  const nameInput = document.querySelector("#name--input");
  let nameInputValue = nameInput.value;
  let nameAlert = document.createElement("div");
  nameContainer.appendChild(nameAlert);

  nameInput.addEventListener("input", (e) => {
    nameInputValue = e.target.value;
    console.log(`nameInputValue,${nameInputValue}`);
  });
  nameInput.addEventListener("change", () => {
    if (nameInputValue.length === 1 && nameInputValue[0] === " ") {
      console.log(`nameInputValue consists of one letter`);
    }
  });
} catch (e) {
  console.error("It's login form and name input field doesn't exist", e);
}

const eyeIcon = document.querySelector("#eye--icon");
const eyeSlashIcon = document.querySelector("#eye-slash--icon");

let emailAlert = document.createElement("div");
let passwordAlert = document.createElement("div");

let showPassword = false;

emailContainer.appendChild(emailAlert);
passwordContainer.appendChild(passwordAlert);

emailAlert.style.color = "var(--error-red)";

emailInput.addEventListener("input", (e) => {
  emailInputValue = e.target.value;
  console.log(`value : ${emailInputValue}`);
});
emailInput.addEventListener("change", () => {
  if (!emailInputValue.includes("@")) {
    emailAlert.innerHTML = `<span><i class="fa-solid fa-circle-xmark"></i>Must be an email</span>`;
  } else if (emailInputValue.length === 0) {
    emailAlert.innerHTML = `<span>Email can't be blank`;
  }
});

passwordInput.addEventListener("input", (e) => {
  passwordInputValue = e.target.value;
  console.log(`password : ${passwordInputValue}`);
});
passwordInput.addEventListener("change", () => {
  alert(passwordInputValue);
});

//toggling eye and eye-slash icons

eyeIcon.addEventListener("click", () => {});
