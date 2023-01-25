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
var isEmailValid = function isEmailValid(email) {
  var reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};
var isPasswordValidated = function isPasswordValidated(password) {
  var re = new RegExp(/^(?=.*d).{8,}$/);
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

  error.textContent = message;
  error.ariaLabel = message;
  error.setAttribute("role", "alert");

  if (formField.classList.contains("error")) {
    error.classList.add("error-icon");
  }
};

var showSuccess = function showSuccess(input) {
  var formField = input.parentElement;
  formField.classList.remove("error");
  var error = formField.querySelector("small");
  error.textContent = "";
  error.ariaLabel = "";
  error.classList.remove("error-icon");
};

//first step login page
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

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
var inputPass = document.querySelector("#password");
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
