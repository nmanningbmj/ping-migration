const passwordInput = document.querySelector(".visibility-icon");
const input = document.querySelector("#pwd");
const img = document.querySelector("img");
let labels = document.querySelector("label");

const email = document.querySelector("#email");
const pwd = document.querySelector("#pwd");

img.addEventListener("click", () => {
  if (input.type === "password") {
    img.src = "images/visibility_on.svg";
    img.alt = "show password";
    input.type = "text";
  } else {
    img.src = "images/visibility_off.svg";
    img.alt = "hide password";
    input.type = "password";
  }
});

//floating labels on input
[email, pwd].forEach(function (e) {
  e.addEventListener("focus", function () {
    this.previousElementSibling.classList.add("focus");
  });
});

[email, pwd].forEach(function (e) {
  e.addEventListener("keyup", function () {
    if (this.value.length >= 1) {
      this.previousElementSibling.classList.add("focus");
    } else {
      this.previousElementSibling.classList.remove("focus");
    }
  });
});
