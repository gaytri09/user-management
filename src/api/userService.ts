import axios from "axios";

const API_URL="https://jsonplaceholder.typicode.com/users";
export type User={
    id:number;
    name:string;
    email:string
}

export const getUsers=async():Promise<User[]>=>{
    const response=await axios.get<User[]>(API_URL);
    return response.data;
}

export const createUser=async(User:Omit<User,"id">):Promise<User>=>{
    const response=await axios.post(API_URL,User);
    return response.data;
}

export const updateUser=async(id:number,user:Partial<User>):Promise<User>=>{
   const response=await axios.put(`${API_URL}/${id}`,user);
   return response.data;
}

export const deleteUser=async(id:number):Promise<void>=>{
    await axios.delete(`${API_URL}/${id}`);
}