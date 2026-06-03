import { useEffect, useState } from "react";
import api from "../services/api";

function StoreOwnerDashboard() {
      const [storeData, setStoreData] = useState([]);
  const [ratings, setRatings] = useState([]);

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const res = await api.get(
        "/owner/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStoreData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRatings = async () => {
    try {
      const res = await api.get(
        "/owner/ratings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRatings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchRatings();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Store Owner Dashboard</h1>
      
      <button onClick={logout}>
        Logout
      </button>

      <button onClick={() => window.location.href = "/change-password"}>
        Change Password
      </button>

      <hr />

      <h2>Store Statistics</h2>

      {storeData.map((store) => (
        <div key={store.id}>
          <p>
            <strong>Store:</strong> {store.name}
          </p>

          <p>
            <strong>Average Rating:</strong>{" "}
            {store.averageRating || "No Ratings"}
          </p>
        </div>
      ))}

      <hr />

      <h2>Users Who Rated</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {ratings.map((rating) => (
            <tr key={rating.id}>
              <td>{rating.name}</td>
              <td>{rating.email}</td>
              <td>{rating.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StoreOwnerDashboard;
