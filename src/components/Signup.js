import React, { Component } from "react";

const errorStyle = {
  textAlign: "center",
  color: "red",
  fontStyle: "italic",
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      success: "",
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const fname = this.fname.value;
    const lname = this.lname.value;
    const age = this.age.value;
    const email = this.email.value;
    const password = this.password.value;

    fetch("https://react-fullstack-backend.herokuapp.com/api/v1/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fname, lname, age, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error, success: "" });
        }

        if (data.success) {
          this.setState({ success: data.success, error: "" });
          this.setTime = setTimeout(() => {
            this.setState({ error: "", success: "" });
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  componentWillUnmount() {
    clearTimeout(this.setTime);
  }

  render() {
    const { error, success } = this.state;
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleFormSubmit}>
            {success && <div className="greeting">{success}</div>}
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>First name</label>
              <input
                ref={(input) => (this.fname = input)}
                type="text"
                className="form-control"
                placeholder="First name"
                name="fname"
              />
            </div>
            {error.includes("fname") && <div style={errorStyle}>{error}</div>}
            <div className="form-group">
              <label>Last name</label>
              <input
                ref={(input) => (this.lname = input)}
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lname"
              />
            </div>
            {error.includes("lname") && <div style={errorStyle}>{error}</div>}

            <div className="form-group">
              <label>Age</label>
              <input
                ref={(input) => (this.age = input)}
                type="number"
                className="form-control"
                placeholder="Age"
                name="age"
              />
            </div>
            {error.includes("age") && <div style={errorStyle}>{error}</div>}

            <div className="form-group">
              <label>Email address</label>
              <input
                ref={(input) => (this.email = input)}
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
              />
            </div>
            {error.includes("email") && <div style={errorStyle}>{error}</div>}

            <div className="form-group">
              <label>Password</label>
              <input
                ref={(input) => (this.password = input)}
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
              />
            </div>
            {error.includes("password") && (
              <div style={errorStyle}>{error}</div>
            )}

            <button
              disabled={success}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="#">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
