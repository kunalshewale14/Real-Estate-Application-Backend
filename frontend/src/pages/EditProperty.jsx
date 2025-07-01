import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../styles/EditProperty.css";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  // fetch the listing once on mount
  useEffect(() => {
    api
      .get(`/properties/${id}`)
      .then(({ data }) => setForm(data.property))
      .catch(() => navigate("/user/home"));
  }, [id, navigate]);

  if (!form) {
    return <p style={{ padding: 20 }}>Loading…</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/properties/${id}`, form);
    navigate("/user/home");
  };

  return (
    <div className="edit-wrapper">
      <h1 className="edit-title">Edit Property</h1>

      <form className="edit-form" onSubmit={handleSubmit}>
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
          Update
        </button>
      </form>
    </div>
  );
}
