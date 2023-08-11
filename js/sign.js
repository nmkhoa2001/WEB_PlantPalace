let apiUser = "http://localhost:3000/user";

//login
const email = document.querySelector(".input-login-email");
const password = document.querySelector(".input-login-password");
const bntLogin = document.querySelector(".login__signInButton");

const userIcon = document.getElementById("login-btn");
const usernameElement = document.getElementById("username");



const username = document.querySelector(".input-signup-username");
const password1 = document.querySelector(".input-signup-password");
const bntSignup = document.querySelector(".signup__signInButton");
const email1 = document.querySelector(".input-signup-email");


const nhap = document.querySelector('.nhap');
const toggle_menu = document.querySelector('.toggle_menu');
const account = document.querySelector('.account');



// get user
const getUser = async () => {
  const response = await fetch(apiUser);
  const data = await response.json();
  return data;
};




bntLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (email.value == "" || password.value == "") {
    alert("Please enter your email and password");
  } else {
    getUser().then((data) => {
      const user = data.find(
        (user) =>
          user.email == email.value && user.password == password.value
      );
      if (user) {
        alert("Sign success");
        loginForm.classList.remove('active');
        updateUserUI(user.username); // Cập nhật giao diện người dùng
      } else {
        alert("Sign failed");
      }
    });
  }
});




bntSignup.addEventListener("click", (e) => {
  e.preventDefault(); // Ngăn mặc định hành vi gửi form
  if (username.value == "" || password1.value == "") {
    alert("Please enter your username and password");
  } else {
    const user = {
      username: username.value,
      password: password1.value,
      email: email1.value,
    };
    fetch(apiUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateUserUI(data.username); // Cập nhật giao diện người dùng
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });

    alert("Sign Up Success");
    // loginForm.classList.remove('active');
  }
});




// Hàm để cập nhật giao diện người dùng sau khi đăng nhập
function updateUserUI(username) {
  userIcon.style.display = "none";
  usernameElement.textContent = username;
}