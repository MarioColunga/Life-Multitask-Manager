const signUpButton = document.getElementById("signUp");
const signInBack = document.getElementById("signInBack");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInBack.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function validRegex(value, type = "text") {
  if (type === "text") {
    const validNames = /[a-zA-Z]+/;

    return {
      error: !validNames.test(value.trim()),
      message: `Error please add a valid value`,
    };
  }

  const validEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return {
    error: !validEmail.test(value.trim()),
    message: `Error please add a valid value`,
  };
}

async function signUpHandler(event) {
  event.preventDefault();

  const signUpFields = document.getElementsByClassName("signUp");

  const firstName = document.getElementById("userName").value;
  const lastName = document.getElementById("userLastName").value;
  const email = document.getElementById("userEmailSignUp").value;
  const password = document.getElementById("userPasswordSignUp").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let error = false;
  let message = "";

  for (let i = 0; i < signUpFields.length; i++) {
    if (!signUpFields[i].value) {
      error = true;
      message = `Please insert your ${signUpFields[i].placeholder}`;
      break;
    }
  }

  if (password !== confirmPassword) {
    message = `Password doesn't match`;
    error = true;
  }

  if (password.length < 8) {
    message = `Please add a 8 character password`;
    error = true;
  }

  if (error) {
    alert(message);
  }

  const { error: errorRegexName, message: messageRegexName } =
    validRegex(firstName);

  if (errorRegexName) {
    error = true;
    alert(messageRegexName);
  }

  const { error: errorRegexLastName, message: messageRegexLastName } =
    validRegex(lastName);

  if (errorRegexLastName) {
    error = true;
    alert(messageRegexLastName);
  }

  const { error: errorRegexEmail, message: messageRegexEmail } = validRegex(
    email,
    "email"
  );

  if (errorRegexEmail) {
    error = true;
    alert(messageRegexEmail);
  }

  if (!error) {
    const response = await (
      await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    alert(response.message);
  }
}

async function signInHandler(event) {
  event.preventDefault();

  const email = document.getElementById("emalUser").value;
  const password = document.getElementById("passwordUser").value;

  const response = await (
    await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
  ).json();

  console.log(response);
  sessionStorage.setItem("user_id", response.user.id);

  if (response.success) {
    document.location.replace("/calendar");
  }
}

document.getElementById("sign-up").addEventListener("click", signUpHandler);
document.getElementById("sign-in").addEventListener("click", signInHandler);
