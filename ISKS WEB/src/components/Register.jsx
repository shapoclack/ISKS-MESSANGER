import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    }

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

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios
      .post("http://localhost:8080/user/save", {
        username,
        email,
        password,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.fieldErrors) {
          data.fieldErrors.forEach((fieldError) => {
            if (fieldError.field === "email") {
              setEmailError(fieldError.message);
              toast.error(fieldError.message);
            }

            if (fieldError.field === "password") {
              setPasswordError(fieldError.message);
              toast.error(fieldError.message);
            }
            if (fieldError.field === "username") {
              setUsernameError(fieldError.message);
              toast.error(fieldError.message);
            }
          });
        } else {
          alert("Success!!");
        }
      })
      .catch((err) => console.error(err));
  };

  const onEmailFocus = () => {
    setEmailError("");
  };

  const onUsernameFocus = () => {
    setUsernameError("");
  };

  const onPasswordFocus = () => {
    setPasswordError("");
  };

  return (
    <div>
      <header>
        <div className="container header">
          <h2>ISKS</h2>
        </div>
      </header>

      <main>
        <div className="container form">
          <h2>New User Registration</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>User name</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Name"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                onFocus={onUsernameFocus}
              />
              {usernameError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {usernameError}
                </span>
              )}
            </div>

            <div className="form-group">
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

            <div className="form-group">
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

            <button type="submit">Save</button>
          </form>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}

export default Register;