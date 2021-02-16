import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import People from "./components/People";
import Contact from "./components/Contact";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  handleUserAccess = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  };

  render() {
    const { isLoggedIn } = this.state;
    console.log({ isLoggedIn });
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
            <div className="container">
              <div className="navbar-brand">React Fullstack by AG</div>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  {!isLoggedIn && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/register"}>
                          Sign up
                        </Link>
                      </li>
                    </>
                  )}
                  {isLoggedIn && (
                    <>
                      <li>
                        <Link className="nav-link" to={"/"}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link className="nav-link" to={"/about"}>
                          About
                        </Link>
                      </li>
                      <li>
                        <Link className="nav-link" to={"/people"}>
                          People
                        </Link>
                      </li>
                      <li>
                        <Link className="nav-link" to={"/contact"}>
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={this.handleUserAccess}
                          className="nav-link"
                          to={"/login"}
                        >
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>

          <Switch>
            {!isLoggedIn && (
              <>
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>
                <Route
                  path="/login"
                  render={(props) => (
                    <Login
                      {...props}
                      handleUserAccess={this.handleUserAccess}
                    />
                  )}
                />
                <Route path="/register" component={Signup} />
              </>
            )}
            {isLoggedIn && (
              <>
                <Route path="/login">
                  <Redirect to="/" />
                </Route>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/people" component={People} />
                <Route path="/contact" component={Contact} />
              </>
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
