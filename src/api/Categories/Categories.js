import { axiosInstance, endpoints } from "../../utils/axios";


export const getCategories = async (setCategories) => {
    try {
        const response = await axiosInstance.get(endpoints.categories.list, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setCategories(response.data.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
