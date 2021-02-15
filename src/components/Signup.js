import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: null,
      lname: null,
      email: null,
      password: null,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log(this.state);
    return (
      <form>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            onChange={this.handleInputChange}
            type="text"
            className="form-control"
            placeholder="First name"
            name="fname"
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            onChange={this.handleInputChange}
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lname"
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            onChange={this.handleInputChange}
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            onChange={this.handleInputChange}
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>
      </form>
    );
  }
}

export default Signup;
