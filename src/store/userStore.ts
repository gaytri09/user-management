import { create } from 'zustand';
import { createUser, getUsers, updateUser, deleteUser } from '../api/userService';
import type { User } from '../api/userService';

type UserStore={
   users:User[];
   loading:boolean;
   error:string|null;
   fetchUsers:()=>Promise<void>;
   addUser:(user:Omit<User,"id">)=>Promise<void>;
   editUser:(id:number,user:Partial<User>)=>Promise<void>;
   removeUser:(id:number)=>Promise<void>
}

export const useUserStore=create<UserStore>((set,get)=>({
   users:[],
   loading:false,
   error:null,

   fetchUsers:async()=>{
    set({loading:true,error:null});
    try{
        const data=await getUsers();
        set({users:data,loading:false});
    }catch(error){
        set({error:"Failed to fetch users",loading:false});
    }
   },

   addUser:async(user)=>{
    try{
        const newUser=await createUser(user);
        set({users:[...get().users,newUser]});
    }catch(error){
        set({error:"Failed to add user"});
    }
   },

   editUser:async(id,user)=>{
    try{
        const updatedUser=await updateUser(id,user);
        set({
            users:get().users.map(u=>u.id===id?updatedUser:u)
        });
    }catch(error){
        set({error:"Failed to update user"});
    }
   },

   removeUser:async(id)=>{
    try{
        await deleteUser(id);
        set({users:get().users.filter(u=>u.id!==id)});
    }catch(error){
        set({error:"Failed to delete user"});
    }
   },
}));


