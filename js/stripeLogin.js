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
var emailEl = document.querySelector("#email");
var passwordEl = document.querySelector("#password");
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

var testUserAccount = {
  email: "test@example.com",
  password: "password123",
};

var showErrorAccountDetails = function showErrorAccountDetails(message) {
  var errorAccountDetails = document.getElementById("error-account-details");
  errorAccountDetails.innerHTML =
    '<small class="error-icon incorrect-account-details">' +
    message +
    "</small>";
};

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
      if (
        emailEl.value === testUserAccount.email &&
        passwordEl.value === testUserAccount.password
      ) {
        showErrorAccountDetails(""); // Clear the error message
      } else {
        showErrorAccountDetails(
          "The entered sign-in details are incorrect. Please enter a valid username and password and try again"
        );
        showError(emailEl);
        showError(passwordEl);
      }
    }
  });
}

var icon = document.querySelector(".visibility-icon");
var inputPass = document.querySelector("#password");

icon.addEventListener("click", function () {
  visibilityIcon();
});

for (i = 0; i < iconBtn.length; i++) {
  iconBtn[i].addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      visibilityIcon();
    }
  });
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
