import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import "../styles/global.css";
import { useState } from "react";
import UserForm from "./UserForm";
export default function UserList() {
    const {users,fetchUsers,removeUser}=useUserStore();
    const [showForm,setShowForm]=useState(false);
    const [selectedUser,setSelectedUser]=useState<{id:number,name:string,email:string} |null>(null);

    useEffect(()=>{
      fetchUsers();
    },[fetchUsers]);

    const handleEdit=(user:any)=>{
        setSelectedUser(user);
        setShowForm(true);
    };

    const handleAdd=()=>{
      setSelectedUser(null);
      setShowForm(true);
    };

    return(
    <div className="user-list">
        <h1>User Management </h1>
        <button onClick={handleAdd}>+ Add User</button>
        
        {showForm && (
          <UserForm selectedUser={selectedUser} onClose={()=>setShowForm(false)}/>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u)=>(
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={()=>handleEdit(u)}>Edit</button>
                  <button onClick={()=>removeUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    );
}