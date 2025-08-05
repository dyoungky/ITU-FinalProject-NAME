import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContext";

// Initialice interfaces for login and error data
interface LoginData {
  username: string;
  password: string;
}

interface LoginErrors {
  username?: string;
  password?: string;
}

// Login component
export function Login() {
  // Setup states to store login and error data
  const [state, setState] = React.useState<LoginData>({ username: "", password: "" });
  const [errors, setErrors] = React.useState<LoginErrors>({});

  // Validate each form field individually
  const validateUsername = (value: string): LoginErrors => {
    if (value == "") {
      return { username: "Please enter your username" };
    }
    return { username: undefined };
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ username: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateUsername(event.target.value) }));
  };

  const validatePassword = (value: string): LoginErrors => {
    if (value == "") {
      return { password: "Please enter your password" };
    }
    return { password: undefined };
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ password: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validatePassword(event.target.value) }));
  };

  // Validate all fields at once (before submitting)
  const validate = (): LoginErrors => {
    return { ...validateUsername(state.username), ...validatePassword(state.password) };
  };

  // Destructure and get the login function from the custom useAuth hook
  const { login } = useAuth();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/registration");
  };

  // Custom submit function to handle login if all details are correct
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valErrors = validate();
    if (valErrors.username || valErrors.password) {
      alert("There are errors!");
    } else {
      try {
        // Make a GET request to check if the user exists
        const response = await fetch(`/users/${state.username}`);
        if (response.ok) {
          // User exists, check if password is correct
          const userData = await response.json();
          if (userData.password === state.password) {
            // Password is correct, redirect to homepage and store user data in context
            login(userData);
            navigate("/");
          } else {
            alert("Incorrect password");
          }
        } else {
          // Handle other errors
          const errorMessage = await response.text();
          alert(errorMessage || "An unexpected error occurred");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  // Render the login component with fields for username and password and data validation text
  return (
    <div className="container_login">
      <div className="card">
        <h6>Welcome back!</h6>
        <h3>Log into your account</h3>
        <form onSubmit={onSubmit}>
          {errors.username ? <span className="error-txt">{errors.username}</span> : null}
          <div className="form-group">
            <input className="form-control outline" type="input" id="username" name={"username"} value={state.username} onChange={handleUsername} placeholder="Username*" required />
          </div>

          {errors.password ? <span className="error-txt">{errors.password}</span> : null}
          <div className="form-group">
            <input className="form-control" type="password" id="password" name={"password"} value={state.password} onChange={handlePassword} placeholder="Password*" required />
          </div>

          <div className="login_btn_container">
            <input className="login_btn" type="submit" value="Login" />
            <input type="button" className="cancel_btn" value="Cancel" onClick={() => window.history.back()} />
          </div>
        </form>

        <p className="notamemeber">
          Not a member?{" "}
          <a onClick={handleClick} style={{ cursor: "pointer" }}>
            <span>
              <u>Sign up</u>
            </span>
          </a>{" "}
          here
        </p>
      </div>
    </div>
  );
}

export default Login;
