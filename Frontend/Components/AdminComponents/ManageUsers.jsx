// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all users on component mount
//   useEffect(() => {
//     axios.get('http://localhost:8080/admin/getAllUsers')
//       .then((response) => {
//         setUsers(response.data.data);  // Extract user data from response
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching users!", error);
//         setLoading(false);  // Stop loading even in case of error 
//     });
//   }, []);

//   // Delete user handler
//   const handleDeleteUser = (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       axios.delete(`http://localhost:8080/admin/deleteUser/${userId}`)
//         .then((response) => {
//           alert(response.data.message);  // Show success message
//           setUsers(users.filter(user => user.userId !== userId));  // Remove deleted user from the list
//         })
//         .catch((error) => {
//           alert("There was an error deleting the user.");
//         });
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Users</h2>
//       {loading ? (
//         <p>Loading users...</p>
//       ) : (
//         <div>
//           {users.length === 0 ? (
//             <p>No users found.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>User ID</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Email</th>
//                   <th>Contact</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.userId}>
//                     <td>{user.userId}</td>
//                     <td>{user.firstName}</td>
//                     <td>{user.lastName}</td>
//                     <td>{user.email}</td>
//                     <td>{user.contact}</td>
//                     <td>
//                       <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminCss/ManageUsers.css';  // Import the CSS file

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/admin/getAllUsers')
      .then((response) => {
        setUsers(response.data.data);  // Extract user data from response
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching users!", error);
        setLoading(false);  // Stop loading even in case of error 
      });
  }, []);

  // Delete user handler
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:8080/admin/deleteUser/${userId}`)
        .then((response) => {
          alert(response.data.message);  // Show success message
          setUsers(users.filter(user => user.userId !== userId));  // Remove deleted user from the list
        })
        .catch((error) => {
          alert("There was an error deleting the user.");
        });
    }
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      {loading ? (
        <p className="loading-message">Loading users...</p>
      ) : (
        <div>
          {users.length === 0 ? (
            <p className="no-users">No users found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

