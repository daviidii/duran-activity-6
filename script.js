// Variables
let userEmail = "";
let userPwd = "";

if (document.getElementById("formReg")) {
  const emailRegistration = document.getElementById("emailInputReg");
  const pwdRegistration = document.getElementById("pwdInputReg");
  const pwdConfirm = document.getElementById("pwdConfirmReg");
  const formReg = document.getElementById("formReg");
  const msgSuccessReg = "Registration successful.\n Redirecting for login";
  const msgInvalidEmail = "Please enter a valid email address";
  const msgInvalidPassword = "Please enter a valid password";
  const msgPwdMatchErr = "Passwords do not match. Try again.";

  const validateEmail = (regEmailInput) =>
    regEmailInput.value.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  const validatePassword = (regPwdInput) =>
    regPwdInput.value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/);

  // Validating form
  function userCredStorage(usrEmail, UsrPwd) {
    userEmail = usrEmail.value;
    userPwd = UsrPwd.value;

    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userPwd", userPwd);
  }

  function validateForm(emailUserInput, pwdUserInput, pwdUserConfirm) {
    if (!validateEmail(emailUserInput)) {
      alert(msgInvalidEmail);
    } else if (!validatePassword(pwdUserInput)) {
      alert(msgInvalidPassword);
    } else if (pwdUserInput.value !== pwdUserConfirm.value) {
      alert(msgPwdMatchErr);
    } else {
      alert(msgSuccessReg);
      userCredStorage(emailUserInput, pwdUserInput);
      window.location.href = "login.html";
    }
  }

  // trigger when submitting the form
  formReg.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm(emailRegistration, pwdRegistration, pwdConfirm);
  });

  // Function to check each input fields.

  emailRegistration.addEventListener("focusout", (e) => {
    if (!validateEmail(emailRegistration)) {
      emailRegistration.style.borderColor = "red";
    } else {
      emailRegistration.style.borderColor = "";
    }
  });

  pwdRegistration.addEventListener("focusout", (e) => {
    if (!validatePassword(pwdRegistration)) {
      pwdRegistration.style.borderColor = "red";
    } else {
      pwdRegistration.style.borderColor = "";
    }
  });
}

if (document.getElementById("formLogin")) {
  const emailLogin = document.getElementById("emailInputLogin");
  const pwdLogin = document.getElementById("pwdInputLogin");
  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPwd");
  const errorMsg = "The password or email might be incorrect. Please try again";
  const msgSuccessLogin = `Welcome ${storedEmail}`;

  const loginEmailValidation = (userEmailLoginInp) =>
    userEmailLoginInp.value === storedEmail;
  const loginPwdValidation = (userPwdLoginInp) =>
    userPwdLoginInp.value === storedPassword;

  const validateLogin = (emLogin, pwLogin) => {
    if (!loginEmailValidation(emLogin) || !loginPwdValidation(pwLogin)) {
      alert(errorMsg);
    } else {
      alert(msgSuccessLogin);
    }
  };
  const loginForm = document.getElementById("formLogin");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateLogin(emailLogin, pwdLogin);
  });
}
