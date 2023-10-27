import React, { useState, useEffect } from "react";

const APIURL = "https://reqres.in/api/users";

function App() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch(APIURL);
      if (response.ok) {
        const data = await response.json();
        setUserList(data.data);
      } else {
        setError("No data found");
      }
    } catch (error) {
      setError("An error occurred while fetching data");
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
      ) : error ? (
        <p>{error}</p>
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
