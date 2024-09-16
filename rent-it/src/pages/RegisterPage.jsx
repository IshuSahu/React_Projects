import React, { useState } from "react";
import "../styles/Register.scss";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileimg: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,

      [name]: name === "profileimg" ? files[0] : value,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // For testing, you can handle form submission here
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            value={formData.lastname}
            onChange={handleChange}
            name="lastname"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
          <input
            id="image"
            type="file"
            name="profileimg"
            accept="image/*"
            onChange={handleChange}
            required
            style={{ display: "none" }}
          />
          {/* Label to trigger file input */}
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile image" />
            <p>Upload Profile photo</p>
          </label>
          {formData.profileimg &&(
            <img src={URL.createObjectURL(formData.profileimg)}
            alt="Profile photo"
            style={{maxWidth: '80px'}}
            />
          )}
          <button type="submit">REGISTER</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
