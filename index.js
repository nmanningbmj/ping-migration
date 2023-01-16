const icon = document.querySelector(".visibility-icon");
const img = document.querySelector("img");

const inputPass = document.querySelector("#pwd");
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
