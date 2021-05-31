import React, { useState } from "react";

const Login = (props) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username.value,
          password: password.value,
        }),
      }
    );
    let data = await response.json();
    console.log(data)
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  if (JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo")).isAdmin) return (null)


  return (
    <div className="row">
      <div className="six columns">
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
              <label htmlFor="username">Username</label>
              <input
                className="input"
                type="text"
                placeholder=""
                id="username"
              />
          </div>
          <div className="row">
              <label htmlFor="password">Password</label>
              <input
                className="input"
                type="password"
                placeholder=""
                id="password"
              />
          </div>
          <input className="button" type="submit" id="login" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
