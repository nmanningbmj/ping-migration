const icon = document.querySelector(".visibility-icon");
const img = document.querySelector(".visibility-icon");

const inputPass = document.querySelector("#password");
let labels = document.querySelector("label");
const formFields = document.querySelectorAll("input");
const email = document.querySelector("#email");

const confirm = document.getElementById("confirm");
const secondPass = document.getElementById("SecondPwd");

formFields.forEach((i) => {
  i.addEventListener("focus", function () {
    this.previousElementSibling.classList.add("focus");
  });
});

formFields.forEach((i) => {
  i.addEventListener("keyup", function () {
    if (this.value.length >= 1) {
      this.previousElementSibling.classList.add("focus");
    } else {
      this.previousElementSibling.classList.remove("focus");
    }
  });
});

const loginForm = document.querySelector("#signIn");
const sendEmail = document.querySelector("#sendEmailLink");
const updatePassword = document.querySelector("#updatePassword");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#SecondPwd");

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl, "");
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else {
    showSuccess(passwordEl, "");
    valid = true;
  }
  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();
  const confirmedPassword = confirmPasswordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that includes one number"
    );
    showError(
      confirmPasswordEl,
      "Password must has at least 8 characters that includes one number"
    );
  } else if (password !== confirmedPassword) {
    showError(passwordEl, "passwords do not match");
    showError(confirmPasswordEl, "passwords do not match");
  } else {
    showSuccess(passwordEl, "");
    showSuccess(confirmPasswordEl, "");

    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(/^(?=.*d).{8,}$/);
  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);

const errorIcon = document.getElementById("#error-icon");

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;

  if (formField.classList.contains("error")) {
    error.classList.add("error-icon");
  }
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

//first step login page
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isEmailValid = checkEmail(),
      isPasswordValid = checkPassword();
    let isFormValid = isEmailValid && isPasswordValid;
    if (isFormValid) {
      console.log("valid");
    }
  });
}

//second step login page
if (sendEmail) {
  sendEmail.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = checkEmail();
    let isFormValid = isValid;
    if (isFormValid) {
      console.log("valid");
    }
  });
}

//final stage of reset password journey
if (updatePassword) {
  updatePassword.addEventListener("submit", function (e) {
    e.preventDefault();
    let isEmailValid = checkConfirmPassword();
    let isFormValid = isEmailValid;
    if (isFormValid) {
      console.log("valid");
    }
  });
}

icon.addEventListener("click", function () {
  if (inputPass.type === "password") {
    img.src = "images/visibility_on.svg";
    img.alt = "show password";
    inputPass.type = "text";
  } else {
    img.src = "images/visibility_off.svg";
    img.alt = "hide password";
    inputPass.type = "password";
  }
});

if (confirm) {
  confirm.addEventListener("click", function () {
    if (secondPass.type === "password") {
      confirm.src = "images/visibility_on.svg";
      confirm.alt = "show password";
      secondPass.type = "text";
    } else {
      confirm.src = "images/visibility_off.svg";
      confirm.alt = "hide password";
      secondPass.type = "password";
    }
  });
}
