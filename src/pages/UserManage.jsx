import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function UserManage() {


    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
  
    const [editingUserId, setEditingUserId] = useState(null);
  
    useEffect(() => {
      axios
        .get("http://localhost:8080/api/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const userData = {
        name: name,
        email: email,
        age: age,
      };
  
      if (editingUserId) {
        axios
          .put(`http://localhost:8080/api/users/${editingUserId}`, userData)
          .then((response) => {
            const updateUsers = users.map((user) =>
              user._id === editingUserId ? response.data : user
            );
            setUsers(updateUsers);
  
            setName("");
            setEmail(""); 
            setAge("");
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      } else {
        axios
          .post("http://localhost:8080/api/users", userData)
          .then((response) => {
            setUsers([...users, response.data]);
  
            // clear from inputs
            setName("");
            setEmail("");
            setAge("");
          })
  
          .catch((error) => {
            console.error("Error adding user:", error);
          });
      }
    };
  
  
    const handleEdit = (user) => {
       setName (user.name);
       setEmail(user.email);
       setAge(user.age);
       setEditingUserId(user._id);
    }
  
  
  
    const handleDelete = (userId) => { 
      axios
      .delete(`http://localhost:8080/api/users/${userId}`)
      .then(() => {
        const ExsistingUsers = users.filter((user) => user._id !== userId)
        setUsers(ExsistingUsers);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
    }
  


  return (
    <>
    <h1 className="bg-red-200"> user form </h1>
    <form onSubmit={handleSubmit} className="my-4">
      <div className="my-4">
        <label> name :</label>
        <input
          type="text"
          id="name"
          value={name}
          className="border border-gray-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="my-4">
        <label> email :</label>
        <input
          type="text"
          id="email"
          value={email}
          className="border border-gray-500"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="my-4">
        <label> age :</label>
        <input
          type="number"
          id="age"
          value={age}
          className="border border-gray-500"
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {editingUserId ? "Update User" : "Add User"}
      </button>
    </form>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              age
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody >
          {users.map((user) => (
            <tr
              key={user._id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.name}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.age}</td>
              <td className="px-6 py-4">
                <button  onClick={() => handleEdit(user)} className="bg-green-400 hover:bg-green-600 px-3 py-1 text-black">
                  Edit
                </button>
              </td>
              <td className="px-6 py-4">
                <button  onClick={() => handleDelete(user._id)} className="bg-red-400 hover:bg-red-600 px-3 py-1 text-black">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  )
}

export default UserManage

