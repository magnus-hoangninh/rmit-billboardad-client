import "./basicProfile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "./avatar.png";

export default function BasicProfile() {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    gender: "",
    username: "",
  });
  const [updateError, setUpdateError] = useState({});
  const [displayError, setDisplayError] = useState({});
  const [file, setFile] = useState(null);

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const userToken = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const url = `https://billboardad.herokuapp.com/api/loginUser`;
        const { data: res } = await axios.post(url, { token: token });
        setUserData(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    userToken();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setUserData({ ...userData, [input.name]: input.value });
    setUpdateError(validate(userData));
  };

  useEffect(() => {
    setUpdateError(validate(userData));
  }, [userData]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nameRegex = new RegExp("^[a-zA-Z_ ]*$");
    const usernameRegex = new RegExp("^[a-zA-Z0-9_ ]*$");

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
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!usernameRegex.test(values.username)) {
      errors.username = "This is not a valid username!";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required!";
    } else if (values.phone.length < 10 || values.phone.length > 11) {
      errors.phone = "This is not a valid phone number!";
    }
    if (!values.gender) {
      errors.gender = "Gender is required!";
    }
    return errors;
  };

  const resetData = () => {
    userToken();
    setDisplayError({});
  };

  const updateData = async (e) => {
    e.preventDefault();
    setUpdateError(validate(userData));
    setDisplayError(updateError);
    const upData = {
      _id: userData._id,
      email: userData.email,
      phone: userData.phone,
      username: userData.username,
      name: userData.name,
      gender: userData.gender,
    };

    if (Object.keys(updateError).length === 0) {
      try {
        const url = "https://billboardad.herokuapp.com/api/updateUserData";
        await axios.post(url, upData);
        userToken();
      } catch (err) {
        console.log(err);
      }
    }
  };


  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profileImg", file);
    formData.append("_id", userData._id)
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .post("https://billboardad.herokuapp.com/api/uploadProfileImg", formData, config)
      .then((res) => {
        userToken();
        alert("Image Upload Successfully!");
      }).catch((err) => { console.log(err) });
  };

  return (
    <main>
      <div className="container main-body">
        <div className="row">
          <div className="col-md-9">
            <h1 className="h1 row-2 mb-4">My Account</h1>
            <div className="row">
              <div className="col-4 col-md-3 ohhh">
                <div className="img-border">
                  {userData.profileImg ? (
                    <img
                      className="img-thumbnail"
                      src={`data: ${userData.profileImg.contentType};base64, ${userData.profileImg.image}`}
                    />
                  ) : (
                    <img className="img-thumbnail" src={avatar} />
                  )}
                </div>
                <div className="btn-img">
                  <form onSubmit={onFormSubmit}>
                    <input
                      id="file-input"
                      className="my-1"
                      type="file"
                      name="profileImg"
                      accept="image/*"
                      onChange={onInputChange}
                      required
                    />
                    <label for="file-input">Choose a file...</label>
                    <input type="submit" value="Update Image" id="upd-file" />
                    <label for="upd-file">Update here...</label>
                  </form>
                </div>
              </div>
              <div className="col-8">
                <div className="input-name row text">
                  <div className="col-lg-4 col text-dark">
                    Username
                    <br />
                    <div className="displayError">{displayError.username}</div>
                  </div>
                  <input
                    className="col-lg-8 col"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-name row text">
                  <div className="col-lg-4 col text-dark">
                    Name
                    <div className="displayError">{displayError.name}</div>
                  </div>
                  <input
                    className="col-lg-8 col"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <br />
            <br />

            <div className="">
              <div className="row">
                <div className="col-4 text-dark input text">
                  Gender
                  <br />
                  <div className="displayError">{displayError.gender}</div>
                </div>
                <div className="col input">
                  <input
                    type="radio"
                    name="gender"
                    id="Male"
                    value="male"
                    checked={userData.gender === "male"}
                    onChange={handleChange}
                  />
                  <label htmlFor="Male">Male</label>
                  <input
                    type="radio"
                    className="radio"
                    name="gender"
                    id="Female"
                    value="female"
                    checked={userData.gender === "female"}
                    onChange={handleChange}
                  />
                  <label htmlFor="Female">Female</label>
                  <input
                    type="radio"
                    className="radio"
                    name="gender"
                    id="Other"
                    value="other"
                    checked={userData.gender === "other"}
                    onChange={handleChange}
                  />
                  <label htmlFor="Other">Other</label>
                </div>
              </div>

              <div className="row">
                <div className="col-4 text-dark input text">
                  Phone number
                  <br />
                  <div className="displayError">{displayError.phone}</div>
                </div>
                <div className="col input">
                  <input
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-4 text-dark input text">
                  Email <br />
                  <div className="displayError">{displayError.email}</div>
                </div>
                <div className="col input">
                  <input
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="update-btn">
              <button className="btnReset " onClick={resetData}>
                Reset
              </button>
              <button className="btnUpdate " onClick={updateData}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
