import { useEffect, useState } from "react";
import api from "../Services/api";
import "../styles/admindashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdashboardData = async () => {
    try {
      const usersResponse = await api.get("/users");
      const petsResponse = await api.get("/pets");

      setUsers(usersResponse.data);
      setPets(petsResponse.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdashboardData();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== id)
      );

      alert("User deleted successfully!");
    } catch (error) {
      console.error("Delete User Error:", error);
      alert("Unable to delete user.");
    }
  };

  const deletePet = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this pet?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/pets/${id}`);

      setPets((previousPets) =>
        previousPets.filter((pet) => pet.id !== id)
      );

      alert("Pet removed successfully!");
    } catch (error) {
      console.error("Delete Pet Error:", error);
      alert("Unable to remove pet.");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <i className="fa-solid fa-spinner"></i>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <div>
          <p className="admin-tag">ADMIN PANEL</p>

          <h1>PetCareHub Dashboard</h1>

          <span>
            Manage users, pets and platform information.
          </span>
        </div>

        <i className="fa-solid fa-user-shield"></i>
      </div>

      <div className="admin-stats">

        <div className="admin-stat-card">
          <i className="fa-solid fa-users"></i>

          <div>
            <p>Total Users</p>
            <h2>{users.length}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <i className="fa-solid fa-paw"></i>

          <div>
            <p>Total Pets</p>
            <h2>{pets.length}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <i className="fa-solid fa-user-shield"></i>

          <div>
            <p>Total Admins</p>

            <h2>
              {
                users.filter(
                  (user) => user.role === "admin"
                ).length
              }
            </h2>
          </div>
        </div>

      </div>

      <section className="admin-section">

        <div className="admin-section-header">
          <h2>Manage Users</h2>
          <p>View and manage registered users.</p>
        </div>

        <div className="admin-table-container">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr key={user.id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>
                    <span className={`role ${user.role}`}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {user.role !== "admin" ? (
                      <button
                        className="delete-user-btn"
                        onClick={() => deleteUser(user.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                        Delete
                      </button>
                    ) : (
                      <span className="admin-protected">
                        Protected
                      </span>
                    )}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

      <section className="admin-section">

        <div className="admin-section-header">
          <h2>Manage Pets</h2>
          <p>View all pets registered on PetCareHub.</p>
        </div>

        <div className="admin-pets-grid">

          {pets.length > 0 ? (
            pets.map((pet) => (
              <div
                className="admin-pet-card"
                key={pet.id}
              >

                <img
                  src={pet.image}
                  alt={pet.name}
                />

                <div className="admin-pet-info">

                  <h3>{pet.name}</h3>

                  <p>
                    <strong>Type:</strong> {pet.type}
                  </p>

                  <p>
                    <strong>Breed:</strong> {pet.breed}
                  </p>

                  <button
                    onClick={() => deletePet(pet.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                    Remove Pet
                  </button>

                </div>

              </div>
            ))
          ) : (
            <p className="no-pets">
              No pets found.
            </p>
          )}

        </div>

      </section>

    </div>
  );
}

export default AdminDashboard;