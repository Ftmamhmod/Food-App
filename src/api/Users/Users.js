import { toast } from "react-toastify";
import { axiosInstance, endpoints } from "../../utils/axios";
import { toastConfig } from "../../utils/toast-config";


export const getUsers = async (setUsers, pageSize, numberOfPages, setTotalPages) => {
    try {
        const response = await axiosInstance.get(endpoints.users.list, {
            params: {
                pageSize,
                pageNumber: numberOfPages
            }
        });
        setUsers(response.data.data);
        setTotalPages(response.data.totalNumberOfPages);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(endpoints.users.delete.replace("{id}", id));
        toast.success("User deleted successfully", toastConfig);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        toast.error(`Failed to delete user. ${error.response.data.message}`, toastConfig);
        throw error;
    }
};