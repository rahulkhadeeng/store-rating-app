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
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.overallRating || "No Ratings"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;