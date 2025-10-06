import { useState ,useEffect} from "react";
import { useUserStore } from "../store/userStore";
type UserFormProps={
    selectedUser?:{id:number,name:string,email:string} |null;
    onClose:()=>void;
};
export default function UserForm({selectedUser,onClose}:UserFormProps){
    const {addUser,editUser}=useUserStore();
    const [name,setName] =useState("");
    const [email,setEmail]=useState("");

    useEffect(()=>{
      if(selectedUser){
        setName(selectedUser.name);
        setEmail(selectedUser.email);
      }
    },[selectedUser]);

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(selectedUser){
            await editUser(selectedUser.id,{name,email});
        }else{
            await addUser({name,email});
        }
        onClose();
    };

    return(
      <div className="user-form">
        <h2>{selectedUser ? "Edit User":"Add User"}</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            />
            <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />
            <div className="form-actions">
              <button type="submit">{selectedUser ? "Update":"Create"}</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </form>
      </div>
    );
}

