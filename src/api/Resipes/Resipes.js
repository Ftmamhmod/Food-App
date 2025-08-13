import { Bounce, toast } from "react-toastify";
import { axiosInstance, endpoints } from "../../utils/axios";


export const getResipes = async (setResipes) => {
    try {
        const response = await axiosInstance.get(endpoints.recipes.list, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setResipes(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
};
export const addResipes = async (formData) => {
    try {
        const response = await axiosInstance.post(endpoints.recipes.create, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
        });
        getResipes()
        toast.success("Recipe added successfully",
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        return response.data;
    } catch (error) {
        console.error("Error adding recipe:", error);
        toast.error(`Failed to add recipe. ${error.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
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
        toast.success("Recipe deleted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });

        return response.data;
    } catch (error) {
        console.error("Error deleting recipe:", error);
        toast.error(`Failed to delete recipe. ${error.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
        throw error;
    }
};
export const updateResipes = async (id, formData) => {
    try {
        const response = await axiosInstance.put(endpoints.recipes.update.replace("{id}", id), formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
        });
        getResipes()
        toast.success("Recipe updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating recipe:", error);
        toast.error(`Failed to update recipe. ${error.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
        throw error;
    }
};