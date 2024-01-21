import React, { ChangeEvent } from "react";
import "./Login.css";

interface LoginState {
  username: string;
  password: string;
  isAuthenticated: boolean;
  usernameError: string;
  passwordError: string;
  showPassword: boolean;
}

class Login extends React.Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAuthenticated: false,
      usernameError: "",
      passwordError: "",
      showPassword: false,
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Use unknown to perform the dynamic assignment
    this.setState({ [name]: value } as unknown as Pick<
      LoginState,
      keyof LoginState
    >);

    // Validate inputs
    if (name === "username") {
      this.validateUsername(value);
    } else if (name === "password") {
      this.validatePassword(value);
    }
  };

  validateUsername = (value: string) => {
    const usernameError = /^[0-9]+$/.test(value)
      ? "Username cannot contain only numbers."
      : /^[!@#$%^&*(),.?":{}|<>]+$/.test(value)
      ? "Username cannot contain only special characters."
      : "";

    this.setState({ usernameError });
  };

  validatePassword = (value: string) => {
    const passwordError =
      !/\d/.test(value) || !/[!@#$%^&*(),.?":{}|<>]/.test(value)
        ? "Password must contain at least one number and one special character."
        : "";

    this.setState({ passwordError });
  };

  handleLogin = () => {
    const { username, password, usernameError, passwordError } = this.state;

    // Check for errors before attempting login
    if (usernameError || passwordError) {
      alert("Please fix the field errors before attempting login.");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    const mockUserData = {
      username: "admin",
      password: "admin@123",
    };

    if (
      username === mockUserData.username &&
      password === mockUserData.password
    ) {
      this.setState({ isAuthenticated: true });
    } else {
      alert("Invalid credentials! User Not Allowed");
    }
  };
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };
  render() {
    const { isAuthenticated, usernameError, passwordError, showPassword } =
      this.state;

    if (isAuthenticated) {
      // Redirect to the home page after successful login
      return (window.location.href = "/posts");
    }

    return (
      <div className="container">
        <div className="login-card">
          <h2 className="card-heading">Log In</h2>
          <form>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              placeholder="Username"
              className={usernameError ? "error-input" : ""}
            />
            {/* {usernameError && ( */}
            <div className="error-message">{usernameError}</div>
            {/* )} */}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="Password"
              className={passwordError ? "error-input" : ""}
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
            <div className="show-password-button-container">
              <button
                type="button"
                className="password-toggle-button"
                onClick={this.togglePasswordVisibility}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
                {showPassword ? " Hide Password" : " Show Password"}
              </button>
            </div>
            <button
              type="button"
              className="logout-button"
              onClick={this.handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
