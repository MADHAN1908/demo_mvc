import axiosInstance from './axiosConfig';

const userService = {
    getUsers: async () => {
        const response = await axiosInstance.get('/users');
        return response.data;
    },
    addUser: async (user) => {
        try{
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            body: user,
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.data; 
    } catch (error) {
        throw error; 
    }
    },
    deleteUser: async (id) => {
        await axiosInstance.delete(`/users/${id}`);
    },
    updateUser: async (user) => {
        try{
        const response = await fetch(`http://localhost:5000/users`, {
            method: "PUT",
            body: user,
        });
        if (!response.ok) {
            console.log(1);
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.data; 
    } catch (error) {
        console.log(2);
        throw error; 
    }
    },
};

export default userService;