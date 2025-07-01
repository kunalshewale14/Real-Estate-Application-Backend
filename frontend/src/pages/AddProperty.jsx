import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/AddProperty.css";

export default function AddProperty() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    availability: "Available"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/properties", form);
    navigate("/properties");
  };

  return (
    <div className="addprop-wrapper">
      <h1 className="addprop-title">Add Property</h1>

      <form className="addprop-form" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <select
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
        >
          <option>Available</option>
          <option>Booked</option>
          <option>Sold</option>
        </select>

        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
