import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);

  // fetch current user's properties once on mount
  useEffect(() => {
    api
      .get("/auth/my-properties")
      .then(({ data }) => setListings(data.properties || []))
      .catch(() => setListings([]));
  }, []);

  const deleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await api.delete(`/properties/${id}`);
    setListings((prev) => prev.filter((p) => p._id !== id));
  };

  const greeting = user?.firstName
    ? `Hey ${user.firstName}, your listings`
    : "Your Listings";

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header-row">
        <h2 className="dashboard-heading">{greeting}</h2>
      </div>

      {listings.length === 0 ? (
        <p>No properties.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
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
                    <Link to={`/properties/${p._id}/edit`} className="btn">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteListing(p._id)}
                      className="btn danger"
                    >
                      Delete
                    </button>
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
