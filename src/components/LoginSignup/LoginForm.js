import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogStyle from "./LoginForm.module.css";
import axios from "axios";

function LoginForm() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://billboardad.herokuapp.com/api/auth";
      const { data: res } = await axios.post(url, data);
      sessionStorage.setItem("token", res.data);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('userEmail', data.email);
      }
      window.location = "/";
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <main>
      <div className={LogStyle.box}>
        <div className={LogStyle.form}>
          <form className="login" onSubmit={handleSubmit}>
            <h1 className={LogStyle.title}>Login</h1>
            {error && <div className={LogStyle.error}>{error}</div>}
            <div className={LogStyle.input}>
              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={LogStyle.input}>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              className={LogStyle.btn}
              type="submit"
              name="login"
              value="Login"
            >
              Login
            </button>
            <div className={LogStyle.switch}>
              Don't have an account? <Link to="/signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
