const formFields = document.querySelectorAll("input");

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

// Form validation

const loginForm = document.querySelector("#signIn");
const sendEmail = document.querySelector("#sendEmailLink");
const updatePassword = document.querySelector("#updatePassword");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#SecondPwd");
const errorIcon = document.getElementById("#error-icon");

const validateEmail = () => {
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

const validatePassword = () => {
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
    showError(confirmPasswordEl, "Password cannot be blank.");
  } else if (!isPasswordValidated(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that includes one number"
    );
    showError(
      confirmPasswordEl,
      "Password must has at least 8 characters that includes one number"
    );
  } else if (!hasNumber(password)) {
    showError(passwordEl, "Password must contain atleast one number");
    showError(confirmPasswordEl, "Password must contain atleast one number");
  } else if (password !== confirmedPassword) {
    showError(passwordEl, "Passwords do not match");
    showError(confirmPasswordEl, "Passwords do not match");
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

const isPasswordValidated = (password) => {
  const re = new RegExp(/^(?=.*d).{8,}$/);
  return re.test(password);
};

const hasNumber = (password) => {
  const number = /\d/;
  return number.test(password);
};

const isRequired = (value) => (value === "" ? false : true);

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
  const formField = input.parentElement;
  formField.classList.remove("error");

  const error = formField.querySelector("small");
  error.textContent = "";

  error.classList.remove("error-icon");
};

//first step login page
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isEmailValid = validateEmail(),
      isPasswordValid = validatePassword();
    let isFormValid = isEmailValid && isPasswordValid;
    if (isFormValid) {
      console.log("valid");
    }
  });
}

//second step send email verification page
if (sendEmail) {
  sendEmail.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = validateEmail();
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
    let isValid = checkConfirmPassword();
    let isFormValid = isValid;
    if (isFormValid) {
      console.log("valid");
    }
  });
}

const confirm = document.getElementById("confirm");
const secondPass = document.getElementById("SecondPwd");
const icon = document.querySelector(".visibility-icon");
const inputPass = document.querySelector("#password");

icon.addEventListener("click", function () {
  if (inputPass.type === "password") {
    icon.src = "images/visibility_on.svg";
    icon.alt = "show password";
    inputPass.type = "text";
  } else {
    icon.src = "images/visibility_off.svg";
    icon.alt = "hide password";
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
