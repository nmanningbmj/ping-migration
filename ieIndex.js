var formFields = document.querySelectorAll("input");

for (i = 0; i < formFields.length; i++) {
  formFields[i].addEventListener("focus", function () {
    this.previousElementSibling.classList.add("focus");
  });
}

for (i = 0; i < formFields.length; i++) {
  formFields[i].addEventListener("keyup", function () {
    if (this.value.length >= 1) {
      this.previousElementSibling.classList.add("focus");
    } else {
      this.previousElementSibling.classList.remove("focus");
    }
  });
}

// Form validation
var loginForm = document.querySelector("#signIn");
var sendEmail = document.querySelector("#sendEmailLink");
var updatePassword = document.querySelector("#updatePassword");
var emailEl = document.querySelector("#email");
var passwordEl = document.querySelector("#password");
var confirmPasswordEl = document.querySelector("#SecondPwd");
var errorIcon = document.getElementById("#error-icon");

var validateEmail = function validateEmail() {
  var valid = false;
  var email = emailEl.value.trim();
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

var validatePassword = function validatePassword() {
  var valid = false;
  var password = passwordEl.value.trim();
  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else {
    showSuccess(passwordEl, "");
    valid = true;
  }
  return valid;
};

var checkConfirmPassword = function checkConfirmPassword() {
  var valid = false;
  var password = passwordEl.value.trim();
  var confirmedPassword = confirmPasswordEl.value.trim();
  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
    showError(confirmPasswordEl, "Password cannot be blank.");
  } else if (!isPasswordValidated(password)) {
    showError(
      passwordEl,
      "Password must be at least 8 characters and include one number, one uppercase letter and one symbol"
    );
    showError(
      confirmPasswordEl,
      "Password must be at least 8 characters and include one number, one uppercase letter and one symbol"
    );
  } else if (!hasNumber(password)) {
    showError(passwordEl, "Password must contain at least one number");
    showError(confirmPasswordEl, "Password must contain at least one number");
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

var isEmailValid = function isEmailValid(email) {
  var reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};
var isPasswordValidated = function isPasswordValidated(password) {
  var re = new RegExp(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()/])[a-zA-Z0-9!@#$%^&*()/]{8,}$/
  );
  return re.test(password);
};
var hasNumber = function hasNumber(password) {
  var number = /\d/;
  return number.test(password);
};
var isRequired = function isRequired(value) {
  return value === "" ? false : true;
};

var showError = function showError(input, message) {
  var formField = input.parentElement;
  formField.classList.add("error");

  var error = formField.querySelector("small");
  var input = formField.querySelector("input");

  error.textContent = message;

  if (formField.classList.contains("error")) {
    error.classList.add("error-icon");
    input.classList.add("error-input");
  }

  const accessValidation = document.getElementById("accessValidation");

  const fragment = document.createDocumentFragment();
  const li = fragment.appendChild(document.createElement("li"));
  li.innerHTML = message;

  accessValidation.appendChild(fragment);
};

var showSuccess = function showSuccess(input) {
  var formField = input.parentElement;
  formField.classList.remove("error");
  var error = formField.querySelector("small");
  var input = formField.querySelector("input");

  error.textContent = "";
  error.classList.remove("error-icon");
  input.classList.remove("error-input");
};

//first step login page
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var accessValidation = document.getElementById("accessValidation");
    if (accessValidation.childNodes.length > 0) {
      accessValidation.innerHTML = "";
    }

    var isEmailValid = validateEmail(),
      isPasswordValid = validatePassword();
    var isFormValid = isEmailValid && isPasswordValid;
    if (isFormValid) {
      console.log("valid");
    }
  });
}

//second step send email verification page
if (sendEmail) {
  sendEmail.addEventListener("submit", function (e) {
    e.preventDefault();

    var accessValidation = document.getElementById("accessValidation");
    if (accessValidation.childNodes.length > 0) {
      accessValidation.innerHTML = "";
    }

    var isValid = validateEmail();
    var isFormValid = isValid;
    if (isFormValid) {
      console.log("valid");
    }
  });
}

//final stage of reset password journey
if (updatePassword) {
  updatePassword.addEventListener("submit", function (e) {
    e.preventDefault();

    var accessValidation = document.getElementById("accessValidation");
    if (accessValidation.childNodes.length > 0) {
      accessValidation.innerHTML = "";
    }

    var isValid = checkConfirmPassword();
    var isFormValid = isValid;
    if (isFormValid) {
      console.log("valid");
    }
  });
}

var confirm = document.getElementById("confirm");
var secondPass = document.getElementById("SecondPwd");
var icon = document.querySelector(".visibility-icon");
var iconBtn = document.querySelectorAll("#iconBtn");
var iconBtnSecond = document.querySelector("#iconBtnSecond");
var inputPass = document.querySelector("#password");

if (icon) {
  icon.addEventListener("click", function () {
    visibilityIcon();
  });
}

for (i = 0; i < iconBtn.length; i++) {
  iconBtn[i].addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      visibilityIcon();
    }
  });
}

if (confirm) {
  confirm.addEventListener("click", function () {
    secondInputPass();
  });

  iconBtnSecond.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      console.log("enter");
      secondInputPass();
    }
  });
}

var isMobileVersion = document.getElementsByClassName("accessi");

// if 'hasClass' is exist on 'mydivclass'
if (isMobileVersion.length > 0) {
  console.log("test");
}
function visibilityIcon() {
  if (inputPass.type === "password") {
    icon.src = "images/visibility_on.svg";
    icon.alt = "show password";
    inputPass.type = "text";
  } else {
    icon.src = "images/visibility_off.svg";
    icon.alt = "hide password";
    inputPass.type = "password";
  }
}

function secondInputPass() {
  if (secondPass.type === "password") {
    confirm.src = "images/visibility_on.svg";
    confirm.alt = "show password";
    secondPass.type = "text";
  } else {
    confirm.src = "images/visibility_off.svg";
    confirm.alt = "hide password";
    secondPass.type = "password";
  }
}
