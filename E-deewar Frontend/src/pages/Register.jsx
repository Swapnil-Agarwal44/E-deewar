import React, { useState } from "react";
import "../styles/styles.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    club: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const clubs = ["IEEE", "ACM", "AWS", "GDG", "STIC"]; // List of clubs

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.club) newErrors.club = "Please select a club.";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Registration Successful! 🎉");
      console.log("User Data:", formData);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🚀 Register for Techno Clubs</h1>
      <p className="text-center">Join a club, participate in events, and grow your tech community!</p>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            {/* Club Selection */}
            <div className="mb-3">
              <label className="form-label">Choose a Club</label>
              <select
                name="club"
                className={`form-select ${errors.club ? "is-invalid" : ""}`}
                value={formData.club}
                onChange={handleChange}
              >
                <option value="">-- Select Club --</option>
                {clubs.map((club, index) => (
                  <option key={index} value={club}>
                    {club}
                  </option>
                ))}
              </select>
              {errors.club && <div className="invalid-feedback">{errors.club}</div>}
            </div>

            {/* Terms and Conditions */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                name="agreeTerms"
                className={`form-check-input ${errors.agreeTerms ? "is-invalid" : ""}`}
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label className="form-check-label">
                I agree to the <a href="#">terms and conditions</a>
              </label>
              {errors.agreeTerms && <div className="invalid-feedback d-block">{errors.agreeTerms}</div>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Register 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
