import { Bounce, toast } from "react-toastify";
import { axiosInstance, endpoints } from "../../utils/axios";


export const getCategories = async (setCategories) => {
    try {
        const response = await axiosInstance.get(endpoints.categories.list,);
        setCategories(response.data.data);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axiosInstance.delete(endpoints.categories.delete.replace("{id}", id),);
        toast.success("Category deleted successfully", {
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
        console.error("Error deleting category:", error);
        toast.error(`Failed to delete category. ${error.response.data.message}`, {
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
export const addCategory = async (categoryData) => {
    try {
        const response = await axiosInstance.post(endpoints.categories.create, categoryData,);
        toast.success("Category added successfully", {
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
        console.error("Error adding category:", error);
        toast.error(`Failed to add category. ${error.response.data.message}`, {
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
export const updateCategory = async (selectedItem, data) => {
    try {
        const response = await axiosInstance.put(endpoints.categories.update.replace("{id}", selectedItem), data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        toast.success("Category updated successfully", {
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
        console.error("Error updating category:", error);
        toast.error(`Failed to update category. ${error.response.data.message}`, {
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
