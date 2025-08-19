import { axiosInstance, endpoints } from "../../utils/axios";


export const getUsers = async (setUsers) => {
    try {
        const response = await axiosInstance.get(endpoints.users.list);
        setUsers(response.data.data);
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
