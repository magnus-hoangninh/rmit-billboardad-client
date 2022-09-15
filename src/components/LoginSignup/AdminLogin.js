import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogStyle from "./LoginForm.module.css";

function AdminLogin() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.email == "cosc2769@gmail.com" && data.password == "furtherwebprogramming") {
      sessionStorage.setItem("admin", "furtherwebprogramming");
      navigate("/admin")
    } else {
        setError("Invalid email or password")
    }
  };

  return (
    <div className={LogStyle.box}>
      <div className={LogStyle.form}>
        <form className="login" onSubmit={handleSubmit}>
          <h1 className={LogStyle.title}>Admin Login</h1>
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
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
