import React, { Component } from "react";

const errorStyle = {
  textAlign: "center",
  color: "red",
  fontStyle: "italic",
};

class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      success: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    let fname = this.fname.value;
    let lname = this.lname.value;
    let age = this.age.value;
    let email = this.email.value;
    let password = this.password.value;

    fetch("http://localhost:5000/api/v1/register", {
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
          setTimeout(() => {
            this.props.history.push("/people");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { error, success } = this.state;
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleFormSubmit}>
            {success && <div className="greeting">{success}</div>}
            <h3>Add New Person</h3>

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
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddPerson;
