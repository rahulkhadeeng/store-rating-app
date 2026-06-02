import { useEffect, useState } from "react";
import api from "../services/api";

function UserDashboard() {

  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const submitRating = async (storeId) => {
  try {
    const token = localStorage.getItem("token");

    const rating = document.getElementById(
      `rating-${storeId}`
    ).value;

    await api.post(
      "/ratings",
      {
        store_id: storeId,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Rating Submitted");

    fetchStores();
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

  return (
    <div>
      <h1>User Dashboard</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Overall Rating</th>
            <th>Submit Rating</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.overallRating || "No Ratings"}</td>
              <td><input type="number" min="1" max="5" id={`rating-${store.id}`}/> <button onClick={() => submitRating(store.id)}> Submit </button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserDashboard;