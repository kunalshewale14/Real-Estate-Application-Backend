import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";
import "../styles/Properties.css";

export default function Properties() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState([]);

  // load properties (runs on mount and whenever query changes)
  useEffect(() => {
    api
      .get(`/properties?q=${encodeURIComponent(query)}`)
      .then(({ data }) => setListings(data.properties || []))
      .catch(() => setListings([]));
  }, [query]);

  const deleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await api.delete(`/properties/${id}`);
    setListings((prev) => prev.filter((p) => p._id !== id));
  };

  const isOwner = (owner) =>
    user && owner && (user.id === owner._id || user._id === owner._id);

  return (
    <div className="properties-page">
      <h2 className="properties-heading">All Properties</h2>

      <div className="search-bar">
        <input
          className="form-control"
          placeholder="Search by location / title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => setQuery(query)} className="btn">
          Search
        </button>
        <Link to="/properties/new" className="btn">
          Add New
        </Link>
      </div>

      {listings.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="properties-table-wrapper">
          <table className="table properties-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {listings.map((p) => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.location}</td>
                  <td>₹ {p.price}</td>
                  <td>{p.availability}</td>
                  <td>
                    {p.owner?.firstName} {p.owner?.lastName}
                  </td>
                  <td>
                    {isOwner(p.owner) && (
                      <Link to={`/properties/${p._id}/edit`} className="btn">
                        Edit
                      </Link>
                    )}
                  </td>
                  <td>
                    {isOwner(p.owner) && (
                      <button
                        onClick={() => deleteListing(p._id)}
                        className="btn danger"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
