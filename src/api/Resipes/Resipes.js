import { axiosInstance, endpoints } from "../../utils/axios";


export const getResipes = async (setResipes) => {
    try {
        const response = await axiosInstance.get(endpoints.recipes.list, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setResipes(response.data.data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};
