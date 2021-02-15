import React, { Component } from "react";

const errorStyle = {
  textAlign: "center",
  color: "red",
  fontStyle: "italic",
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      success: "",
      person: {},
    };
  }

  handleLoginSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();

    this.setState({ emailError: "", passwordError: "" });

    fetch("http://localhost:5000/api/v1/person/login", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.emailError) {
          this.setState({ emailError: data.emailError });
        }

        if (data.passwordError) {
          this.setState({ passwordError: data.passwordError });
        }

        if (data.success) {
          this.setState({ result: data.success, person: data.person });
        }
      })
      .catch((err) => console.log(err));
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.type]: e.target.value });
  };

  render() {
    const { emailError, passwordError, result, person } = this.state;
    return (
      <form onSubmit={this.handleLoginSubmit}>
        {result && (
          <div className="greeting">
            {result} {person.fname + " " + person.lname}
          </div>
        )}
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            onChange={this.handleInputChange}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        {emailError && <div style={errorStyle}>{emailError}</div>}

        <div className="form-group">
          <label>Password</label>
          <input
            onChange={this.handleInputChange}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        {passwordError && <div style={errorStyle}>{passwordError}</div>}
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          disabled={result}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}

export default Login;
