import React, { useState, useEffect } from "react";

const APIURL = "https://reqres.in/api/users";

function App() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(APIURL);
      if (response.ok) {
        const data = await response.json();
        setUserList(data.data);
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <h1>User List</h1>
      <div>
        <button className="btn" onClick={getUsers}>
          Get User List
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <img src={user.avatar} alt={`Avatar for ${user.first_name}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default App;
