const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');
// const userName = document.getElementById('userName').value.trim();
// const userLastName = document.getElementById('userLastName').value.trim();
// const userEmail = document.getElementById('userEmail').value.trim();
// const userPassword = document.getElementById('userPassword').value.trim();

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

function validRegex(value, input) {
  if ((input.type = 'text')) {
    const validNames =
      /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/;
    return {
      error: validNames.test(value.trim()),
      message: `Error please add a valid ${input.placeholder}`,
    };
  } else {
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return {
      error: validEmail.test(value.trim()),
      message: `Error please add a valid ${input.placeholder}`,
    };
  }
}

async function signUpHandler(event) {
  event.preventDefault();
  const signUpFields = document.getElementsByClassName('signUp');

  const userName = document.getElementById('userName').value;
  const userLastName = document.getElementById('userLastName').value;
  const userEmailSignUp = document.getElementById('userEmailSignUp').value;
  const userPasswordSignUp =
    document.getElementById('userPasswordSignUp').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  let error = false;
  let message = '';

  for (let i = 0; i < signUpFields.length; i++) {
    if (!signUpFields[i].value) {
      error = true;
      message = `Please insert your ${signUpFields[i].placeholder}`;
      break;
    }
  }

  if (userPasswordSignUp.value !== confirmPassword.value) {
    message = `Password doesn't match`;
    error = true;
  }

  if (error) {
    alert(message);
  }

  if (!error) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        userName,
        userLastName,
        userEmailSignUp,
        userPasswordSignUp,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('r: ', response);
  }
}

async function signInHandler(event) {
  event.preventDefault();

  const userEmail = document.getElementById('emalUser').value;
  const userPassword = document.getElementById('passwordUser').value;

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      userEmail,
      userPassword,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/calendar');
  }
}

document.getElementById('sign-up').addEventListener('click', signUpHandler);
document.getElementById('sign-in').addEventListener('click', signInHandler);
