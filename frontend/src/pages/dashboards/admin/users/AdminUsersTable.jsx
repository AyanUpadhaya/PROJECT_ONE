import React from 'react'

const AdminUsersTable = ({ users }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phone || "N/A"}</td>
              <td>{user.address || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable