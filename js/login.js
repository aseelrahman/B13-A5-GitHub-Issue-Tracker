document.getElementById("btn-login").addEventListener("click", () => {
  const userName = document.getElementById("username").value;
  const passWord = document.getElementById("password").value;

  if (userName === "admin" && passWord === "admin123") {
    alert(`Login Success`);
    window.location.replace("./home.html");
  } else {
    alert(`Incorrect Credential`);
    return;
  }
});
