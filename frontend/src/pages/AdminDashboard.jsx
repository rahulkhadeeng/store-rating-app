import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [userForm, setUserForm] = useState({ name: "", email: "",  password: "", address: "", role: "USER",});

  const [storeForm, setStoreForm] = useState({name: "", email: "", address: "", owner_id: "", });

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const res = await api.get(
        "/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get(
        "/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
          params: userFilters,
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

    const fetchStores = async () => {
        try {
        const res = await api.get(
            "/admin/stores",
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: storeFilters,
            }
        );

        setStores(res.data);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
        fetchUsers();
        fetchStores();
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const handleUserChange = (e) => {
    setUserForm({
        ...userForm,
        [e.target.name]: e.target.value,
    });
    };

    const handleStoreChange = (e) => {
    setStoreForm({
        ...storeForm,
        [e.target.name]: e.target.value,
    });
    };

    const createUser = async (e) => {
    e.preventDefault();

    try {
        const res = await api.post(
        "/admin/users",
        userForm,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        alert(res.data.message);
        fetchDashboard();
        fetchUsers();
    } catch (error) {
        alert(
        error.response?.data?.message ||
        "User creation failed"
        );
    }
    };

    const createStore = async (e) => {
    e.preventDefault();

    try {
        const res = await api.post(
        "/admin/stores",
        storeForm,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        alert(res.data.message);
        fetchDashboard();
        fetchStores();
    } catch (error) {
        alert(
        error.response?.data?.message ||
        "Store creation failed"
        );
    }
    };

    const [userFilters, setUserFilters] = useState({
  name: "",
  email: "",
  address: "",
  role: "",
  sortBy: "name",
  order: "ASC",
});

const [storeFilters, setStoreFilters] = useState({
  name: "",
  address: "",
  sortBy: "name",
  order: "ASC",
});

const viewUserDetails = async (userId) => {
  try {
    const res = await api.get(
      `/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(
      `Name: ${res.data.name}\nEmail: ${res.data.email}\nAddress: ${res.data.address}\nRole: ${res.data.role}`
    );
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "User details failed"
    );
  }
};

  return (
    <div>

      <h1>Admin Dashboard</h1>

      <button onClick={logout}>
        Logout
      </button>

      <button onClick={() => window.location.href = "/change-password"}>
        Change Password
      </button>

      <hr />

      <h2>Statistics</h2>

      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Stores: {stats.totalStores}</p>
      <p>Total Ratings: {stats.totalRatings}</p>

      <hr />

        <input
        placeholder="Search name"
        onChange={(e) => setUserFilters({ ...userFilters, name: e.target.value })}
        />

        <input
        placeholder="Search email"
        onChange={(e) => setUserFilters({ ...userFilters, email: e.target.value })}
        />

        <input
        placeholder="Search address"
        onChange={(e) => setUserFilters({ ...userFilters, address: e.target.value })}
        />

        <select onChange={(e) => setUserFilters({ ...userFilters, role: e.target.value })}>
        <option value="">All Roles</option>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="STORE_OWNER">Store Owner</option>
        </select>

        <select onChange={(e) => setUserFilters({ ...userFilters, sortBy: e.target.value })}>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="address">Address</option>
        <option value="role">Role</option>
        </select>

        <select onChange={(e) => setUserFilters({ ...userFilters, order: e.target.value })}>
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
        </select>

        <button onClick={fetchUsers}>Apply User Filters</button>

      <h2>Users</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td><button onClick={() => viewUserDetails(user.id)}> View </button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>Stores</h2>
    <input
        placeholder="Search store name"
        onChange={(e) => setStoreFilters({ ...storeFilters, name: e.target.value })}
        />

        <input
        placeholder="Search address"
        onChange={(e) => setStoreFilters({ ...storeFilters, address: e.target.value })}
        />

        <select onChange={(e) => setStoreFilters({ ...storeFilters, sortBy: e.target.value })}>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="address">Address</option>
        <option value="rating">Rating</option>
        </select>

        <select onChange={(e) => setStoreFilters({ ...storeFilters, order: e.target.value })}>
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
        </select>

        <button onClick={fetchStores}>Apply Store Filters</button>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.rating || "No Ratings"}</td>
            </tr>
          ))}
        </tbody>
      </table>

    <h2>Add User</h2>
    
    <form onSubmit={createUser}>
    <input name="name" placeholder="Name" onChange={handleUserChange} />
    <input name="email" placeholder="Email" onChange={handleUserChange} />
    <input name="password" placeholder="Password" onChange={handleUserChange} />
    <input name="address" placeholder="Address" onChange={handleUserChange} />

    <select name="role" onChange={handleUserChange}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="STORE_OWNER">Store Owner</option>
    </select>

    <button type="submit">Add User</button>
    </form>

    <h2>Add Store</h2>

    <form onSubmit={createStore}>
    <input name="name" placeholder="Store Name" onChange={handleStoreChange} />
    <input name="email" placeholder="Store Email" onChange={handleStoreChange} />
    <input name="address" placeholder="Address" onChange={handleStoreChange} />
    <input name="owner_id" placeholder="Owner ID" onChange={handleStoreChange} />

    <button type="submit">Add Store</button>
    </form>
      
    </div>
  );
}

export default AdminDashboard;
