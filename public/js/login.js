const signUpButton = document.getElementById("signUp");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

function handleError() {}

function signUpHandler(event) {
  event.preventDefault();
  const userName = document.getElementById("userName").value.trim();
  const userLastName = document.getElementById("userLastName").value.trim();
  const userEmail = document.getElementById("userEmail").value.trim();
  const userPassword = document.getElementById("userPassword").value.trim();

  // if (name && email && password) {
  const response = await fetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify({ userName, userLastName, userEmail, userPassword }),
    headers: { "Content-Type": "application/json" },
  });
}

document.getElementById("sign-up").addEventListener("click", signUpHandler);
