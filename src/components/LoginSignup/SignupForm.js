import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LogStyle from "./LoginForm.module.css";

function SignupForm() {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    retypepass: "",
    phone: "",
  });
  const [error, setError] = useState({});
  const [displayError, setDisplayError] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setError(validate(data));
  };

  const navigate = useNavigate();

  useEffect(() => {
    setError(validate(data));
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(data));
    setDisplayError(error);

    if (Object.keys(error).length === 0) {
      serverSubmit();
    }
  };

  const serverSubmit = async () => {
    try {
      const url = "https://billboardad.herokuapp.com/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setServerError(error.response.data.message);
        console.log(error);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const nameRegex = new RegExp("^[a-zA-Z_ ]*$");
    const phoneRegex = new RegExp("^[0-9]*$");
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.name) {
      errors.name = "Name is required!";
    } else if (!nameRegex.test(values.name)) {
      errors.name = "This is not a valid name!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters, contains an uppercase letter, a number and a symbol!";
    }
    if (!values.retypepass) {
      errors.retypepass = "Retype Password is required!";
    } else if (values.password !== values.retypepass) {
      errors.retypepass = "Password does not match!";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required!";
    } else if (values.phone.length < 10 || values.phone.length > 11 || !phoneRegex.test(values.phone)) {
      errors.phone = "This is not a valid phone number!";
    }
    return errors;
  };

  return (
    <main>
      <div className={LogStyle.box}>
        <div className={LogStyle.form}>
          <form className="signup">
            <h1 className={LogStyle.title}>Registration</h1>
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
              {!displayError.email ? (
                <div className={LogStyle.error}>{serverError}</div>
              ) : (
                <div className={LogStyle.error}>{displayError.email}</div>
              )}
            </div>

            <div className={LogStyle.input}>
              <label htmlFor="password">Name</label>
              <div>
                <input
                  type="string"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
              <div className={LogStyle.error}>{displayError.name}</div>
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
              <div className={LogStyle.error}>{displayError.password}</div>
            </div>
            <div className={LogStyle.input}>
              <label htmlFor="password">Retype Password</label>
              <div>
                <input
                  type="password"
                  name="retypepass"
                  id="retypepass"
                  value={data.retypepass}
                  onChange={handleChange}
                />
              </div>
              <div className={LogStyle.error}>{displayError.retypepass}</div>
            </div>
            <div className={LogStyle.input}>
              <label htmlFor="password">Phone Number</label>
              <div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>
              <div className={LogStyle.error}>{displayError.phone}</div>
            </div>
            <button
              className={LogStyle.btn}
              type="submit"
              name="login"
              value="Login"
              onClick={handleSubmit}
              on
            >
              Sign Up
            </button>
            <div className={LogStyle.switch}>
              Have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignupForm;
