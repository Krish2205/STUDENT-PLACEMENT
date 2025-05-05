import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Registration.css';

export default function Registration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    graduation: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        graduation: form.graduation,
      });

      if (response.data.success) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2 className="registration-title">Register</h2>
        <input type="text" placeholder="Name" required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input type="email" placeholder="Email" required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input type="tel" placeholder="Phone Number" required
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input type="password" placeholder="Password" required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input type="password" placeholder="Confirm Password" required
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />
        <select required
          onChange={(e) => setForm({ ...form, graduation: e.target.value })}
          defaultValue=""
        >
          <option value="" disabled>Select Graduation</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
          <option value="Highschool">Highschool</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
