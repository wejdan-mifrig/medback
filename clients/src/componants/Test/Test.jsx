import { useEffect, useState } from "react";
import api from "../../api.js";

function Test() {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const res = await api.get("/users");
      setUser(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {user && user.map((u, index) => (
        <div key={index}>
          <p>{u.name}</p>
          <p>{u.email}</p>
          <hr />
        </div>
      ))}
    </>
  );
}

export default Test;