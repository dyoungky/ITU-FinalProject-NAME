import React from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

// Initialize the interfaces for registration data and errors
interface RegistrationData {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
  firstName: string;
  lastName: string;
}

interface RegistrationErrors {
  username?: string;
  email?: string;
  password?: string;
  passwordCheck?: string;
  firstName?: string;
  lastName?: string;
}

// Component that handles registration
export function Registration() {
  // Innitialize a variable of type RegistrationData that stores registration data
  const initState: RegistrationData = {
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
    firstName: "",
    lastName: "",
  };

  // Set states that stores the entered data and errors
  const [userState, setUserState] = React.useState<RegistrationData>(initState);
  const [errors, setErrors] = React.useState<RegistrationErrors>({});

  // Validation of username
  const validateUsername = (value: string): RegistrationErrors => {
    if (value.length > 15 || value.length < 5) {
      return { username: "Username must be between 5 and 15 characters" };
    }
    return { username: undefined };
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState((prev) => ({ ...prev, ...{ username: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateUsername(event.target.value) }));
  };

  // Validation of email
  const validateEmail = (value: string): RegistrationErrors => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { email: "That doesn't seem like a real email address" };
    }
    return { email: undefined };
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState((prev) => ({ ...prev, ...{ email: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateEmail(event.target.value) }));
  };

  // Validation of password
  const validatePassword = (value: string): RegistrationErrors => {
    if (value.length < 8) {
      return { password: "Password must be 8 characters or more" };
    }
    if (!/(?=.*\d)(?=.*[a-zA-Z])/.test(value)) {
      return { password: "Password must contain at least one letter and one number" };
    }
    return { password: undefined };
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState((prev) => ({ ...prev, ...{ password: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validatePassword(event.target.value) }));
  };

  // Check if the passwords are the same
  const validatePasswordCheck = (value: string): RegistrationErrors => {
    if (value !== userState.password) {
      return { passwordCheck: "Passwords do not match" };
    }
    return { passwordCheck: undefined };
  };

  const handlePasswordCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState((prev) => ({ ...prev, ...{ passwordCheck: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validatePasswordCheck(event.target.value) }));
  };

  // Validation of first name
  const validateFirstName = (value: string): RegistrationErrors => {
    if (value === "") {
      return { firstName: "Please enter a first name" };
    }
    return { firstName: undefined };
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState((prev) => ({ ...prev, ...{ firstName: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateFirstName(event.target.value) }));
  };

  // Validation of last name
  const validateLastName = (value: string): RegistrationErrors => {
    if (value === "") {
      return { lastName: "Please enter a first name" };
    }
    return { lastName: undefined };
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserState((prev) => ({ ...prev, ...{ lastName: event.target.value } }));
    setErrors((prev) => ({ ...prev, ...validateLastName(event.target.value) }));
  };

  // Validate all fields at once
  const validate = (): RegistrationErrors => {
    return {
      ...validateUsername(userState.username),
      ...validateFirstName(userState.firstName),
      ...validateLastName(userState.lastName),
      ...validateEmail(userState.email),
      ...validatePassword(userState.password),
      ...validatePasswordCheck(userState.passwordCheck),
    };
  };

  // Check for errors and halt submission upon errors
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valErrors = validate();
    if (Object.values(valErrors).some((error) => error)) {
      alert("There are errors. Please double check your entered data.");
    } else {
      try {
        const response = await fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userState),
        });

        if (response.ok) {
          alert("Account created");

          // Create a new basket for the user
          const basketResponse = await fetch(`/baskets/${userState.username}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              products: [],
            }),
          });

          if (basketResponse.ok) {
            navigate("/login");
          } else {
            const errorMessage = await basketResponse.text(); // Get the error message from the API through the response body
            alert(errorMessage);
          }
        } else {
          const errorMessage = await response.text(); 
          alert(errorMessage);
        }
      } catch (error) {
        console.error("Error creating user:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  // Handle navigation for link to the registration form
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  // Render the registration form
  return (
    <div className="container_registration">
      <div className="card">
        <h6>Need an account?</h6>
        <h3>Sign up</h3>
        <form onSubmit={onSubmit}>
          {errors.username ? <span className="error-txt">{errors.username}</span> : null}
          <div className="form-group">
            <input type="text" className="form-control" id="username" name={"username"} value={userState.username} onChange={handleUsername} placeholder="Username*" />
          </div>
          
          {errors.firstName ? <span className="error-txt">{errors.firstName}</span> : null}
          <div className="form-group">
            <input type="text" className="form-control" id="firstName" name={"firstName"} value={userState.firstName} onChange={handleFirstName} placeholder="First name*" />
          </div>
          
          {errors.lastName ? <span className="error-txt">{errors.lastName}</span> : null}
          <div className="form-group">
            <input type="text" className="form-control" id="lastName" name={"lastName"} value={userState.lastName} onChange={handleLastName} placeholder="Last name*" />
          </div>
          
          {errors.email ? <span className="error-txt">{errors.email}</span> : null}
          <div className="form-group">
            <input type="email" className="form-control" id="email" name={"email"} value={userState.email} onChange={handleEmail} placeholder="E-mail*" />
          </div>
          
          {errors.password ? <span className="error-txt">{errors.password}</span> : null}
          <div className="form-group">
            <input type="password" className="form-control" id="password" name={"password"} value={userState.password} onChange={handlePassword} placeholder=" Password*" />
          </div>
          
          {errors.passwordCheck ? <span className="error-txt">{errors.passwordCheck}</span> : null}
          <div className="form-group">
            <input type="password" className="form-control" id="passwordCheck" name={"passwordCheck"} value={userState.passwordCheck} onChange={handlePasswordCheck} placeholder=" Repeat password*" />
          </div>

          <div className="login_btn_container">
            <input className="login_btn" type="submit" value="Sign up" />
            <input type="button" className="cancel_btn" value="Cancel" onClick={() => window.history.back()} />
          </div>
          <p className="haveauser">
            Already have a user?{" "}
            <a onClick={handleClick} style={{ cursor: "pointer" }}>
              <span>
                <u>Log in</u>
              </span>
            </a>{" "}
            here
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
