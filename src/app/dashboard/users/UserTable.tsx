"use client";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  setEditingUser: (user: User) => void;
}

export default function UserTable({ users, setEditingUser }: UserTableProps) {
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber || "-"}</td>
            <td>{user.status}</td>
            <td>
              <button className="ui yellow button" onClick={() => setEditingUser(user)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
