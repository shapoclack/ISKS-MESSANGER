import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  async function login(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: email,
        password: password,
      });

      const data = response.data;

      if (data.message === "Email not exists") {
        alert("Email does not exist");
      } else if (data.message === "Password Not Match") {
        alert("Password does not match");
      } else if (data.message === "Login Success") {
        navigate("/ChatRoom");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while logging in");
    }
  }

  const onEmailFocus = () => {
    setEmailError("");
  };

  const onPasswordFocus = () => {
    setPasswordError("");
  };

  return (
    <div>
      <header>
        <div class="container header">
          <h2>ISKS</h2>
        </div>
      </header>

      <main>
        <div class="container form">
          <h2>Welcome</h2>
          <form>
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                onFocus={onEmailFocus}
              />
              {emailError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {emailError}
                </span>
              )}
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onFocus={onPasswordFocus}
              />
              {passwordError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {passwordError}
                </span>
              )}
            </div>
            <button type="submit" onClick={login}>
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;