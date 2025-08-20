import { Bounce, toast } from "react-toastify";
import { axiosInstance, endpoints } from "../../utils/axios";
import { toastConfig } from "../../utils/toast-config";


export const getResipes = async (setResipes, pageSize, numberOfPages, setTotalPages) => {
    try {
        const response = await axiosInstance.get(endpoints.recipes.list, {
            params: {
                pageSize,
                pageNumber: numberOfPages
            }
        });
        setResipes(response.data.data);
        setTotalPages(response.data.totalNumberOfPages);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};
export const addResipes = async (data) => {
    try {
        const response = await axiosInstance.post(endpoints.recipes.create, data,

        );
        getResipes()
        toast.success("Recipe added successfully", toastConfig
        );
        return response.data;
    } catch (error) {
        console.error("Error adding recipe:", error);
        toast.error(`Failed to add recipe. ${error.response.data.message}`, toastConfig);
        throw error;
    }
};
export const deleteResipes = async (id) => {
    try {
        const response = await axiosInstance.delete(endpoints.recipes.delete.replace("{id}", id), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        getResipes()
        toast.success("Recipe deleted successfully", toastConfig);

        return response.data;
    } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error(`Failed to delete recipe. ${error.response.data.message}`, toastConfig);
        throw error;
    }
};
export const updateResipes = async (id, formData) => {
    try {
        const response = await axiosInstance.put(endpoints.recipes.update.replace("{id}", id), formData,);
        getResipes()
        toast.success("Recipe updated successfully", toastConfig);
        return response.data;
    } catch (error) {
        console.error("Error updating recipe:", error);
        toast.error(`Failed to update recipe. ${error.response.data.message}`, toastConfig);
        throw error;
    }
};